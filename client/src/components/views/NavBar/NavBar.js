import React, {useState} from 'react';
import {Button} from './Button';
import {Link, withRouter} from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import {useSelector} from "react-redux";
import axios from "axios";
import {USER_SERVER} from '../../Config';
import {Menu, Badge, Avatar} from 'antd';
import {Icon} from '@iconify/react';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function NavBar(props) {

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

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
            // <Menu mode={props.mode}>
            //     <Menu.Item key="mail">
            //         <a href="/login"> 로그인 </a>
            //     </Menu.Item>
            //     <Menu.Item key="app">
            //         <a href="/register"> 회원가입 </a>
            //     </Menu.Item>
            // </Menu>

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

                    <ul className={click ? 'nav-menu active' : 'nav-menu'} mode={props.mode}>
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

                                <a href="/user/cart" class-name="head-example"
                                   style={{marginRight: 10, color: '#667777'}}>
                                    {/*<Icon type="shopping-cart" />*/}
                                    <Icon/>
                                </a>
                            </Link>
                        </li>

                        <li>
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

                    <ul className={click ? 'nav-menu active' : 'nav-menu'} mode={props.mode}>
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
                                <a href="/user/cart" class-name="head-example"
                                   style={{marginRight: 10, color: '#667777'}}>
                                    {/*<Icon type="shopping-cart" />*/}
                                    <Icon/>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to='/logout'
                                className='nav-links-mobile'
                                onClick={logoutHandler}
                            >
                                로그아웃
                            </Link>
                        </li>

                    </ul>
                    <Button/>
                </nav>
            </>
        );
    }
}

export default withRouter(NavBar);