"use client"
import * as React from 'react';
import { Autocomplete, TextField, Tooltip, CircularProgress, Box } from '@mui/material';
import homestyles from "@/app/styles/home.module.css";
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { categoryservices_location } from '../hooks/useApi';
import { useRef } from 'react';


export default function CustomizedInputBase({ bordersearchbox, searchpage, setDemo,headerprops }) {
  const [loading, setLoading] = useState(false);
  const [KeyWordData, setKeyWordData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchkeyvalue, setSearchkeyvalue] = useState("");
  const router = useRouter();

  const autocompleteRef = useRef();
  

  useEffect(() => {
    const getDataEndPoint = async () => {
      const city = localStorage.getItem("city");
      try {
        const response = await categoryservices_location(city);
        console.log(response)
        dataFind(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getDataEndPoint();

    const handleScroll = () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.blur();
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dataFind = (data) => {
    try {
      const business_active = data.business_active.map(service => ({
        label: `${service.business_name}`,
      }));
      const combinedArray = data.service_data.map(service => ({
        label: `${service.service_name}`,
      }));
      const combinedArray2 = data.category_data.map(service => ({
        label: `${service.category_name}`,
      }));
      const mergedArray = [...combinedArray, ...combinedArray2,...business_active];
      const uniqueSet = new Set(mergedArray.map(JSON.stringify));
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      setKeyWordData(uniqueArray);
    } catch (error) {
      console.error("error :" + error);
    }
  };

  const handleSearch = (value) => {
    // let city = localStorage.getItem("city") || 'Hyderabad';
    // city = city.replaceAll(" ", "-");
    const formattedSearchKey = value.replaceAll(" ", "-");

    let city = "";
    let subcity = "";
    let localStoragecity = typeof localStorage !== 'undefined' && localStorage.getItem("city");
    if (localStoragecity) {
     const str = localStorage.getItem("city");
     const hyphenIndex = str.lastIndexOf('-');
     const slashIndex = str.endsWith('/') ? str.lastIndexOf('/') : str.length;
     city = str.substring(hyphenIndex + 1, slashIndex).replaceAll(' ', '-');

     // Split the string by hyphens
    const segments = str.split('-');
    // Remove the last segment
    segments.pop();
    // Join the remaining segments with hyphens
    const resultString = segments.join('-');
    subcity = resultString.replaceAll(' ', '-');


     if (localStoragecity.includes("-")) {
        if (searchpage) {
          onSearch(value);
        } else {
          router.push(`/${formattedSearchKey}/${city}/${subcity}/`);
        }
     } else {
      if (searchpage) {
        onSearch(value);
      } else {
        router.push(`/${formattedSearchKey}/${city}/`);
      }
     }
    }
    setLoading(false);
  };

  const handleChange = (event, newValue) => {
    const value = newValue?.label ?? newValue ?? event.target.value;
    setSearchkeyvalue(value);

    const isValidValue = KeyWordData.some(option => option.label === value);
    if (isValidValue) {
      handleSearch(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const isValidValue = KeyWordData.some(option => option.label === e.target.value);
      if (isValidValue) {
        handleSearch(e.target.value);
      }
    }
  };

  return (
    <div className={homestyles.searbox_section} style={{maxWidth:headerprops==true&&{xs:'200px!important',sm:'226px!important',md:'400px!important'}}}>
     {/* {headerprops==true && "true"} */}
      <Autocomplete
        id="category-data"
        disablePortal
        freeSolo
        options={KeyWordData}
        getOptionLabel={(option) => option.label}
        value={selectedValue}
        onChange={(event, newValue) => {
          setSelectedValue(newValue);
          handleChange(event, newValue);
        }}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "40px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "0",
            padding: "0",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #fff",
            outline: "none",
          },
        }}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              style: {
                outline: 'none', // Remove blue outline
                height: '46px',
                backgroundColor: '#fff',
                border: '1px solid #fff',
              },
              inputRef: autocompleteRef,
            }}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '40px',
              border: '1px solid rgba(150, 23, 2, 1)',
              padding: '0 20px', // Padding for the text input
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            placeholder="Search category"
            onChange={(e) => handleChange(e, null)}
            onKeyDown={handleKeyDown}
          />
        )}
      />
      <button type="button" name="search button"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 'auto',
          padding: '10px 10px 10px 5px', // No padding for the button
          borderRadius: '0 40px 40px 0', // Rounded corners on the right side
          border: 'none',
          backgroundColor: 'rgba(150, 23, 2, 1)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => {
          const isValidValue = KeyWordData.some(option => option.label === searchkeyvalue);
          if (isValidValue) {
            handleSearch(searchkeyvalue);
          }
        }}
      >
        {loading ? (
          <Box style={{ padding: '10px', paddingTop: '15px' }}>
            <CircularProgress size={20} style={{ color: "white" }} />
          </Box>
        ) : (
          <>
            {bordersearchbox}
            <Tooltip
              title="Search the businesses"
              style={{ display: "flex" }}
            >
              <SearchIcon style={{ fontSize: "20px", alignSelf: "center" }} />
              <span style={{ alignSelf: "center",display:{xs:'none'} }}>&nbsp;Search</span>
            </Tooltip>
          </>
        )}
      </button>
      {headerprops=='false'&& 'true'}
    </div>
  );
}
