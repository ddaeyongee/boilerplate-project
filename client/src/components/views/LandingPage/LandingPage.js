import React, {useEffect, useState} from 'react'
import {FaCode} from "react-icons/fa";
import axios from 'axios'
import {Col, Card, Row, Carousel} from 'antd';
import Icon from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import {continents, price} from "./Sections/Datas";

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8); //landing page 상품 조회 최대 8개 까지
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    });

    useEffect(() => {
        // let body 여기서 limit/skip 을 이용해서 8개만 가져온다.
        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 조회 실패 ")
                }
            })

    }
    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        // console.log('product', product)

        return <Col lg={6} md={8} xs={24} key={index}>

            <Card
                key={index}
                // cover={<img style={{ width:'100%', maxHeight: '150px'}} src={`http://localhost:5000/${product.images[0]}`} alt="Card images"/>}
                cover={<ImageSlider images={product.images}/>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })


    const showFilterResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data ) {
            if(data[key]._id  === parseInt(value, 10)){
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters

        console.log('filters : ', filters)

        if(category ==="price"){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilterResults(newFilters)
        setFilters(newFilters) // continent, price 둘다 set
    }

    return (
        <div stype={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2> Let's Volunteer Anywhere ! <Icon type="rocket"/></h2>
            </div>


            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}></RadioBox>
                </Col>
            </Row>


            {/* Search */}

            {/* Card */}


            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br/>

            {PostSize >= Limit &&
                <div style={{display: 'flex', justifyContent: 'content'}}>
                    <button onClick={loadMoreHandler}> 더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
