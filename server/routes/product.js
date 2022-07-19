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

    // skip, limit을 받는다.
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

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
                productInfo,
                postSize: productInfo.length
            })
        })
})

module.exports = router;
