import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const Master2 = ({children,searchField,setsearchField}) => {
  return (
    <div>
        <Header setsearchField={setsearchField} pageTitle={"search"} searchField={searchField}/>
        <div className="md:my-20">
            {searchField}
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Master2