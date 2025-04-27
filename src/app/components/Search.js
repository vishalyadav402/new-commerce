"use client"
import * as React from 'react';
import { Autocomplete, TextField, Tooltip, CircularProgress, Box } from '@mui/material';
import homestyles from "@/app/styles/home.module.css";
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { categoryservices_location } from '../hooks/useApi';
import { useRef, useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';

function CustomizedInputBase({ bordersearchbox, searchpage, setDemo, headerprops }) {
  const [loading, setLoading] = useState(false);
  const [KeyWordData, setKeyWordData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchkeyvalue, setSearchkeyvalue] = useState("");
  const router = useRouter();
  const autocompleteRef = useRef();

  useEffect(() => {
    const fetchKeywordData = async () => {
      const city = localStorage.getItem("city");
      if (!city) return;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // ⏳ 1.5 sec delay
        const response = await categoryservices_location(city);
        dataFind(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKeywordData();

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
      const business_active = data.business_active.map(service => ({ label: service.business_name }));
      const combinedArray = data.service_data.map(service => ({ label: service.service_name }));
      const combinedArray2 = data.category_data.map(service => ({ label: service.category_name }));

      const mergedArray = [...combinedArray, ...combinedArray2, ...business_active];
      const uniqueSet = new Set(mergedArray.map(JSON.stringify));
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      setKeyWordData(uniqueArray);
    } catch (error) {
      console.error("Data parse error:", error);
    }
  };

  const saveRecentSearch = (searchTerm) => {
    try {
      let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      recentSearches = recentSearches.filter(item => item !== searchTerm); // remove duplicates
      recentSearches.unshift(searchTerm); // add to start
      recentSearches = recentSearches.slice(0, 10); // keep only latest 10
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  };

  const handleSearch = (value) => {
    const formattedSearchKey = value.replaceAll(" ", "-");
    let city = "", subcity = "";

    const localStorageCity = localStorage.getItem("city");
    if (localStorageCity) {
      const str = localStorageCity;
      const hyphenIndex = str.lastIndexOf('-');
      const slashIndex = str.endsWith('/') ? str.lastIndexOf('/') : str.length;
      city = str.substring(hyphenIndex + 1, slashIndex).replaceAll(' ', '-');

      const segments = str.split('-');
      segments.pop();
      subcity = segments.join('-').replaceAll(' ', '-');

      if (str.includes("-")) {
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

    saveRecentSearch(value); // ✅ Save search in localStorage
    setLoading(false);
  };

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      const isValidValue = KeyWordData.some(option => option.label === value);
      if (isValidValue) {
        handleSearch(value);
      }
    }, 500),
    [KeyWordData]
  );

  const handleChange = (event, newValue) => {
    const value = newValue?.label ?? newValue ?? event.target.value;
    setSearchkeyvalue(value);
    debouncedChangeHandler(value);
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
    <div className={homestyles.searbox_section} style={{ maxWidth: headerprops ? { xs: '200px!important', sm: '226px!important', md: '400px!important' } : undefined }}>
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
            "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
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
                outline: 'none',
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
              padding: '0 20px',
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
            placeholder="Search category"
            onChange={(e) => handleChange(e, null)}
            onKeyDown={handleKeyDown}
          />
        )}
      />
      <button
        type="button"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          padding: '10px 10px 10px 5px',
          borderRadius: '0 40px 40px 0',
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
            <Tooltip title="Search the businesses" style={{ display: "flex" }}>
              <SearchIcon style={{ fontSize: "20px", alignSelf: "center" }} />
              <span style={{ alignSelf: "center", display: { xs: 'none' } }}>&nbsp;Search</span>
            </Tooltip>
          </>
        )}
      </button>
    </div>
  );
}

export default React.memo(CustomizedInputBase);
