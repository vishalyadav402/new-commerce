import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
  <footer className="lg:px-[8rem] px-4 text-gray-800 bg-[#f7ecdd]">
  <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-lg md:text-left">

        {/* Brand and Social Links */}
        {/* <div className="flex flex-col items-start md:items-start space-y-4">
          <a href="/" className="flex items-center text-2xl font-bold">
              <Image src="/icon.png" height={100} width={100} className="text-gray-700" alt="logo"></Image>
          </a>
          <ul className="flex space-x-4">
            <li><a href="#" className='p-3 bg-slate-200 rounded-full'><FacebookIcon className="text-gray-700 hover:text-blue-600 transition duration-300" /></a></li>
            <li><a href="#" className='p-3 bg-slate-200 rounded-full'><InstagramIcon className="text-gray-700 hover:text-pink-500 transition duration-300" /></a></li>
            <li><a href="#" className='p-3 bg-slate-200 rounded-full'><LinkedInIcon className="text-gray-700 hover:text-blue-700 transition duration-300" /></a></li>
            <li><a href="#" className='p-3 bg-slate-200 rounded-full'><XIcon className="text-gray-700 hover:text-black transition duration-300" /></a></li>
          </ul>
        </div> */}

        
        

        {/* all categories */}
        <div className="flex flex-col items-start md:items-start space-y-4">
          <p className='text-xl font-semibold'>All categories</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/categories" className="text-lg font-medium">All Categories</a></li>
          </ul>
        </div>

        {/* popular categories */}
        <div className="flex flex-col items-start md:items-start space-y-4">
          <p className='text-xl font-semibold'>Popular categories</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/categories" className="text-lg font-medium">Grocery</a></li>
            <li><a href="/categories" className="text-lg font-medium">Daily Essentials</a></li>
            <li><a href="/categories" className="text-lg font-medium">Cleaning Needs</a></li>
            <li><a href="/categories" className="text-lg font-medium">Laundary</a></li>
          </ul>
        </div>

        {/* Customer Account */}
        <div className="flex flex-col items-start md:items-start space-y-4">
          <p className='text-xl font-semibold'>Customer Account</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/categories" className="text-lg font-medium">My Profile</a></li>
            <li><a href="/categories" className="text-lg font-medium">My Order</a></li>
            <li><a href="/categories" className="text-lg font-medium">My Addresses</a></li>
          </ul>
        </div>

        {/* help and support */}
        <div className="flex flex-col items-start md:items-start space-y-4">
          <p className='text-xl font-semibold'>Help & Support</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/policies/faq" className="text-lg font-medium">FAQs</a></li>
              <li><a href="/policies/privacypolicy" className="text-lg font-medium">Privacy Policy</a></li>
              <li><a href="/policies/return" className="text-lg font-medium">Pricing, Delivery, Return and Refund Policy</a></li>
              <li><a href="/policies/terms" className="text-lg font-medium">Terms and Conditions</a></li>
              <li><a href="/policies/disclaimer" className="text-lg font-medium">Disclaimer</a></li>
              <li><a href="/policies/about" className="text-lg font-medium">About Us</a></li>
            </ul>
        </div>
        {/* contact us */}
        <div className="flex flex-col items-start md:items-start space-y-4">
        <p className='text-xl font-semibold'>Contact Us</p>
          <ul className="space-y-2 text-sm">
            <li><a href="https://wa.link/qsk9fu" className="text-md font-medium">WhatsApp us: 9506280968</a></li>
            <li><a href="tel:+919506280968" className="text-md font-medium">Call us: 9506280968</a></li>
            <li><span className='text-md font-medium'>8:00 AM to 8:00 PM, 365 days</span></li>
            <li className='mt-4 text-md font-medium'><span>Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website.</span></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center flex self-center text-sm text-gray-600 p-4 my-3 gap-4 border-t border-gray-400">
         <a href="/" className="flex items-center text-2xl font-bold">
              <Image src="/icon.png" height={50} width={50} className="text-gray-700" alt="logo"></Image>
          </a>
          <span className='self-center'>© {currentYear} All rights reserved. Kirana Needs Ltd.</span>
      </p>
    </div>
  </footer>
  );
}

export default Footer;
