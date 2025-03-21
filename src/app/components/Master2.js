import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const Master2 = ({children,searchField,setsearchField}) => {
  return (
    <div>
        <Header setsearchField={setsearchField} pageTitle={"search"} searchField={searchField}/>
            {searchField}
            {children}
        <Footer/>
    </div>
  )
}

export default Master2