import React from 'react'
import Header from './Header.js'
import Footer from "./Footer.js"

const Layout = ({children}) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className = "content flex-grow-1 ">
       {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
