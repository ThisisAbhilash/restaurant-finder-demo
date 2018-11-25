import React from 'react';
import './Header.css';
import { APPLICATION_TITLE } from "../../utilities/Constants";

const Header = () => {
    return (
        <div className='Application-title'>
            {APPLICATION_TITLE}
        </div>
    )
};

export default Header;