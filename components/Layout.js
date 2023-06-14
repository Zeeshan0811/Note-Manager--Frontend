import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="mt-5">
                <main role="main" className="container">{children}</main>
                <Footer />
            </div>
        </>
    )
}

export default Layout