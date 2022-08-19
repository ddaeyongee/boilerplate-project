import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {getCartItems, removeCartItem, onSuccessBuy} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import {Empty, Result} from "antd";
import Paypal from '../../utils/Paypal';

function CartPage(props) {

    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let cartItems = []

        // redux User state 안 cart 안에 상품이 들어 있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => {
                        console.log(response)
                        calculateTotal(response.payload)
                    })
            }
        }
    }, [props.user.userData]);


    let calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })
        setTotal(total)
        setShowTotal(true)
    }

    //카트에 들어있는 상품정보 지우기
    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {

                console.log("CartPage::removeFromCart:::response: " , response)
                if (response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })
    }

    const transactionSuccess = (data) => {

        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                }
            })
    }

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1> My Cart </h1>
            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>

            {ShowTotal ?
                <div style={{marginTop: '3rem'}}>
                    <h2> Total Amount: ${Total}</h2>
                </div>
                : ShowSuccess ?
                    <Result
                        status="success"
                        title="상품 결제가 성공적으로 완료 되었습니다."
                    />
                    :
                    <>
                        <br/>
                        <Empty description={false}/>
                    </>
            }

            {ShowTotal &&
                <Paypal
                    total={Total}
                    onSuccess={transactionSuccess}
                />
            }

        </div>
    )
}

export default CartPage
