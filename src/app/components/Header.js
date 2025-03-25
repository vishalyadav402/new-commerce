"use client";

import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Cart from './Cart';
import LocationX from './LocationX';
import Login from './Login';
import { useRouter } from 'next/navigation';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from 'next/image';

const LoginToken = typeof window !== "undefined" && localStorage.getItem("loginToken") !== null;

const placeholderTexts = [
  'Search "curd"',
  'Search "milk"',
  'Search "bread"',
  'Search "vegetables"',
  'Search "fruits"'
];

const Header = ({ setsearchField, pageTitle, searchField }) => {
 
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [inputValue, setInputValue] = useState(searchField || '');
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLocationXOpen, setIsLocationXOpen] = useState(true);

const route = useRouter();
const inputRef = useRef(null);

  useEffect(() => {
    deliveryLocation();
  }, []);

  const deliveryLocation = () => {
    try {
      if (typeof window !== "undefined") {
        const location = localStorage.getItem("delivery-location");
        if (location && location !== "") {
          setSelectedLocation(location);
          setIsLocationXOpen(false);
        }}
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  };

// for placeholder interval
  useEffect(() => {
    if (inputValue) return;
    const intervalId = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholderTexts.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [inputValue]);


  useEffect(() => {
    if (route.pathname === "/search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [route.pathname]);

  return (
    <header className="flex flex-wrap bg-gradient-to-b from-purple-100 to-white md:fixed md:top-0 md:left-0 md:right-0 md:z-10 w-full items-center justify-between px-4 md:px-6 border-b border-purple-200">
      {/* logo */}
      <a href='/' className="self-center md:mb-0 hidden lg:block lg:order-1">
        <Image src="/VegaCart.png" height={100} width={150} alt='vegacart logo'></Image>
      </a>
      {/* border */}
      <div className="border-l border-purple-200 h-[80px] hidden lg:block lg:order-2" />
      {/* location */}
      <div className="mb-2 md:mb-0 order-1 lg:order-3">
        <LocationX isOpen={isLocationXOpen} setIsOpen={setIsLocationXOpen} />
      </div>
      {/* search */}
      <div className="order-3 lg:order-4 flex items-center cursor-pointer bg-white border border-purple-200 rounded-lg px-3 py-2 w-full lg:w-1/2 mb-2 lg:mb-0">
        <SearchIcon className="text-black mr-2" />
        <div className="relative w-full">
          <input
            type="text"
            id="searchtxt"
            ref={inputRef}
            value={searchField}
            onClick={()=>route.push('/search')}
            onChange={(e) => setsearchField(e.target.value)}
            placeholder={placeholderTexts[currentPlaceholder]}
            className="bg-transparent cursor-text hover:bg-none focus:outline-none w-full h-8 text-sm md:text-base"
          />
        </div>
      </div>
      {/* login */}
      <div className="order-2 lg:order-5">
        {LoginToken ? <p onClick={()=>route.push('/account/profile')} className='cursor-pointer'>
          <span>Account <ArrowDropDownIcon/></span>
        </p> : <Login />}
      </div>
      {/* cart */}
      {<div className='hidden lg:block lg:order-6'>
        <Cart />
      </div>}

    </header>
  );
};

export default Header;
