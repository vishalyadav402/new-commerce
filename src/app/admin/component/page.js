import AdminLayout from '@/app/AdminLayout'
import React from 'react'
import Whatsapp from '../component/Whatsapp'


const page = () => {
  return (
    <AdminLayout>
        <div className='flex justify-center content-center h-full w-full'>
            <div className='m-auto'>
                <p className='text-center font-bold py-3 text-lg'>Scan with whatsapp web to login</p>
                <Whatsapp/>
            </div>
        </div>
    </AdminLayout>
  )
}

export default page