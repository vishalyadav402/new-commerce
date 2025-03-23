import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Master = ({children}) => {
  return (
    <div>
        <Header/>
        <div className='mb-20 md:mt-20 min-h-[50vh]'>
          {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Master