// import React, {useState} from 'react';
// import LeftMenu from './Sections/LeftMenu';
// import RightMenu from './Sections/RightMenu';
// import {Drawer, Button} from 'antd';
// import Icon from '@ant-design/icons';
// import './Sections/Navbar.css';
//
// function NavBar() {
//     const [visible, setVisible] = useState(false)
//
//     const showDrawer = () => {
//         setVisible(true)
//     };
//
//     const onClose = () => {
//         setVisible(false)
//     };
//
//     return (
//         <nav className="menu" style={{position: "fixed", zIndex: 10, height: '10%', width: '100%'}}>
//             <div className="menu__logo">
//                 <a href="/" >
//                     <img style={{width: '100%', height: '100%'}}
//                          src={`http://localhost:5000/uploads/logo/logo_salrang2.png`}/>
//                 </a>
//             </div>
//             <div className="menu__container">
//                 <div className="menu_left">
//                     <LeftMenu mode="horizontal"/>
//                 </div>
//                 <div className="menu_rigth">
//                     <RightMenu mode="horizontal"/>
//                 </div>
//                 <Button
//                     className="menu__mobile-button"
//                     type="primary"
//                     onClick={showDrawer}
//                 >
//                     <Icon type="align-right"/>
//                 </Button>
//                 <Drawer
//                     title="Basic Drawer"
//                     placement="right"
//                     className="menu_drawer"
//                     closable={false}
//                     onClose={onClose}
//                     visible={visible}
//                 >
//                     <LeftMenu mode="inline"/>
//                     <RightMenu mode="inline"/>
//                 </Drawer>
//             </div>
//         </nav>
//     )
// }

import React, {useState} from 'react';
import {Button} from './Button';
import {Link, withRouter} from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import {useSelector} from "react-redux";
import axios from "axios";
import {USER_SERVER} from "../../Config";
import {Menu} from "antd";

function NavBar(props) {

    // const [visible, setVisible] = useState(false)
    //
    // const showDrawer = () => {
    //     setVisible(true)
    // };
    //
    // const onClose = () => {
    //     setVisible(false)
    // };
    //

    // const user = useSelector(state => state.user)

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

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
            <>
                <nav className='navbar'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img style={{width: '100%', height: '100%'}}
                             src={`http://localhost:5000/uploads/logo/logo_salrang2.png`}
                             className='fab fa-firstdraft'/>

                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        >
                            <Link
                                to='/volunteer'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                봉사하기 <i className='fas fa-caret-down'/>
                            </Link>
                            {dropdown && <Dropdown/>}
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/adopt'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                입양하기
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/donation'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                후원하기
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/user/cart'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                장바구니
                                {/*<Badge count={user.userData&&user.userData.cart.length}>*/}
                                {/*    <a href="/user/cart" class-name="head-example" style={{marginRight: -15, color: '#667777'}}>*/}
                                {/*        /!*<Icon type="shopping-cart" />*!/*/}
                                {/*        <Icon icon="ant-design:shopping-cart-outlined" style={{fontSize: 30, marginBottom: 3}}/>*/}
                                {/*    </a>*/}
                                {/*</Badge>*/}
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/login'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                로그인
                            </Link>
                        </li>

                    </ul>
                    <Button/>
                </nav>
            </>
        );
    }
}

export default NavBar