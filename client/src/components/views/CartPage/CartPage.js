import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions';
function CartPage(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        let cartItems = []

        // redux User state 안 cart 안에 상품이 들어 있는지 확인
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [props.user.userData]);



    return (
        <div>


        </div>
    )
}

export default CartPage
