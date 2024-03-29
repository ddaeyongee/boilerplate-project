/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Icon} from '@iconify/react';
import {Menu, Badge} from 'antd';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import {withRouter} from 'react-router-dom';
import {useSelector} from "react-redux";

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('로그아웃 실패')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login"> 로그인 </a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register"> 회원가입 </a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>

                <Menu.Item key="history">
                    <a href="/history"> 결제내역 </a>
                </Menu.Item>

                <Menu.Item key="upload">
                    <a href="/product/upload"> 봉사등록 </a>
                </Menu.Item>

                <Menu.Item key="cart" style={{paddingBottom: 3, paddingTop: 10}}>
                    <Badge count={user.userData&&user.userData.cart.length}>
                        <a href="/user/cart" class-name="head-example" style={{marginRight: -15, color: '#667777'}}>
                            {/*<Icon type="shopping-cart" />*/}
                            <Icon icon="ant-design:shopping-cart-outlined" style={{fontSize: 30, marginBottom: 3}}/>
                        </a>
                    </Badge>
                </Menu.Item>

                <Menu.Item key="logout">
                    <a onClick={logoutHandler}> 로그아웃 </a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);

