import React, {useEffect, useState} from 'react'
import {Button, Descriptions} from 'antd';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../../_actions/user_actions';
import axios from 'axios'

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {

        //필요한 정보를 cart 필드에 넣어 준다.
        dispatch(addToCart(props.detail._id))
    }

    return (
        <div>
            <Descriptions title=" 봉사장 INFO ">
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>
            <br/>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
