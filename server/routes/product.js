const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({storage: storage}).single("file")

router.post('/image', (req, res) => {

    // 가져온 이미지를 저장해 주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({success: false, err})
        }
        console.log('filename : ' + res.req.file.filename)
        console.log('filepath : ' + res.req.file.path)
        return res.json({
            success: true, filePath: res.req.file.path, fileName: res.req.file.fileName
        })
    })
})

router.post('/', (req, res) => {

    // 받아온 정보를 database에 전달한다.
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
})

router.post('/products', (req, res) => {
    const product = new Product(req.body)

    // skip, limit을 받는다.
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            console.log('key', key)

            if (key === "price") {
                findArgs[key] = {
                    // Greater than equal
                    $gte: req.body.filters[key][0],
                    // less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log('findArgs: ', findArgs)

    if (term) {
        Product.find(findArgs)
            .find({$text: {$search: term}})//mongodb에서 제공
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({success: false, err})
                return res.status(200).json({
                    success: true,
                    product,
                    productInfo,
                    postSize: productInfo.length
                })
            })
    } else {
        // Product collection 에 들어 있는 모든 상품 정보를 가져온다.
        // mongodb에 skip, limit을 알려준다.
        Product.find(findArgs)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({success: false, err})
                return res.status(200).json({
                    success: true,
                    product,
                    productInfo,
                    postSize: productInfo.length
                })
            })
    }
})

router.get('/products_by_id', (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        //id = 213123123,435345345,345345345 이거를
        //productIds = ['213123123',435345345','345345345'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        productIds = ids.map(item => {
            return item
        })
    }

    // productId를 이용해서 DB의 productId와 같은 상품의 정보를 가져온다.
    Product.find({_id: {$in: productIds}})
        .populate('writer')
        .exec((err, product) => {
            if(err) return res.status(400).send(err)
            res.status(200).send(product)
        })
})

module.exports = router;
