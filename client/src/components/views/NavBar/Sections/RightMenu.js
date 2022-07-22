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
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">SignIn</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">SignUp</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <a href="/product/upload">Upload</a>
                </Menu.Item>

                <Menu.Item key="cart" style={{paddingBottom: 3, paddingTop: 10}}>
                    <Badge count={5}>
                        <a href="/user/cart" class-name="head-example" style={{marginRight: -15, color: '#667777'}}>
                            {/*<Icon type="shopping-cart" />*/}
                            <Icon icon="ant-design:shopping-cart-outlined" style={{fontSize: 30, marginBottom: 3}}/>
                        </a>
                    </Badge>
                </Menu.Item>

                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);

