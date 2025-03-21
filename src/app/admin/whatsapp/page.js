import AdminLayout from '@/app/AdminLayout'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
        <div className='flex justify-center content-center h-full w-full'>
            <div className='m-auto'>
                <p className='text-center font-bold py-3 text-lg'>Whatsapp QR Code</p>
        <Image src={'/qr_code.png'} height={300} width={300} alt={"/qr_code.png"}></Image>
            </div>
        </div>
    </AdminLayout>
  )
}

export default page