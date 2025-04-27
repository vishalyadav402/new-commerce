"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleClear = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <>
    {recentSearches.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <p className="font-bold">Recent searches</p>
            <button 
              onClick={handleClear} 
              variant="text" 
              className="text-green-500 font-bold"
            >
              clear
            </button>
          </div>
      
          <div className="flex gap-1 flex-wrap mt-2">
            {recentSearches.map((search, index) => (
              <div 
                key={index}
                className="border border-gray-300 rounded-full py-1 px-3 text-sm bg-white"
              >
                {search}
              </div>
            ))}
          </div>
        </>
      )}
</>
  );
};

export default RecentSearches;
