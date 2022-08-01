import React, {useState} from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

export function Button() {
    //
    // const [click, setClick] = useState(false);
    // const closeMobileMenu = () => setClick(false);
    // const handleClick = () => setClick(!click);

    return (
        <Link
            to='/login'
            // className='nav-links-mobile'
            // onClick={closeMobileMenu}
            // onClick={handleClick}
        >
            <button className='btn'>로그인</button>
        </Link>
    );
}