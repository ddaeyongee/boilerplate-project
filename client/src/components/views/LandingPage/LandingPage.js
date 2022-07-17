import React, {useEffect, useState} from 'react'
import {FaCode} from "react-icons/fa";
import axios from 'axios'
import {Col, Card, Row, Carousel} from 'antd';
import Icon from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8); //landing page 상품 조회 최대 8개 까지
    const [PostSize, setPostSize] = useState(0);

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


    return (
        <div stype={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2> Let's Volunteer Anywhere ! <Icon type="rocket"/></h2>
            </div>


            {/* Filter */}

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
