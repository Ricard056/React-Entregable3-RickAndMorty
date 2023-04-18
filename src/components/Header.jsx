import React from 'react'
import './styles/header.css'

const Header = () => {

    return (
        <header className="app__header">
            <img className="app__headerImage" src="/mainHeader.jpg" alt="Logo" />
            <img className="app__headerLogo" src="/mainHeaderLogo.png" alt="HeaderImage" />
        </header>
    );
};


export default Header
