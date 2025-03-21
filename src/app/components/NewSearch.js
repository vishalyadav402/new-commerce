"use client";
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const dummyData = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const NewSearch = () => {
  const [location, setLocation] = useState("");
  const [boxVisible, setBoxVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("Recent_searches") || "[]")
  );

  const textFieldRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textFieldRef.current && !textFieldRef.current.contains(event.target)) {
        setBoxVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      setBoxVisible(filteredResults.length > 0);
    } else {
      setBoxVisible(recentSearches.length > 0);
    }
  };

  const filteredResults = dummyData.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResultClick = (name) => {
    setSearchQuery(name);
    setBoxVisible(false);
    const updatedSearches = [...new Set([name, ...recentSearches])];
    setRecentSearches(updatedSearches);
    localStorage.setItem("Recent_searches", JSON.stringify(updatedSearches));
  };

  return (
    <div id="divLocation" ref={textFieldRef}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              width: "500px",
              border: "1 px solid red",
              borderRadius: "10px",
            }}
          >
            <TextField
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setBoxVisible(recentSearches.length > 0 || searchQuery.length > 0)}
              placeholder="Search anything"
              InputProps={{
                style: {
                  backgroundColor: "#f5f5f5",
                  fontSize: "16px",
                  color: "#000",
                  height: "47px",
                  border: "none",
                },
                inputRef: autocompleteRef,
                endAdornment: (
                  <InputAdornment position="end">
                    <button
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: 'auto',
                        padding: '10px 10px 10px 5px', // No padding for the button
                        borderRadius: '0 5px 5px 0',
                        border: 'none',
                        backgroundColor: 'rgba(150, 23, 2, 1)',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <SearchIcon style={{ fontSize: "20px", alignSelf: "center" }} />
                      Search
                    </button>
                  </InputAdornment>
                ),
              }}
            />

            <Stack
              sx={{
                position: "absolute",
                top: "80%",
                backgroundColor: "white",
                zIndex: 99,
                width: { sm: "300px", xs: "250px", md: "400px" },
                marginTop: "15px",
                borderRadius: "8px",
              }}
            >

              {boxVisible && (
                <ul
                  style={{
                    listStyle: "none",
                    padding: "10px",
                    minHeight: "auto",
                    maxHeight: "320px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  {searchQuery.length === 0 && recentSearches.length > 0 && (
                    <>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ padding: "20px 0 10px 0" }}
                        spacing={6}
                      >
                        <Typography fontSize={"12px"} color={"GrayText"}>
                          RECENT SEARCHES
                        </Typography>
                        <button
                          style={{
                            fontSize: "13px",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#0076d7",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setRecentSearches([]);
                            localStorage.setItem("Recent_searches", JSON.stringify([]));
                          }}
                        >
                          Clear All
                        </button>
                      </Stack>
                      <ul style={{ listStyle: "none" }}>
                        {[...new Set(recentSearches)].map((item, index) => (
                          <li
                            style={{ padding: "10px 0", cursor: "pointer" }}
                            key={index}
                            onClick={() => handleResultClick(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {searchQuery.length > 1 &&
                    filteredResults.map((name, index) => (
                      <li
                        style={{ padding: "10px", cursor: "pointer" }}
                        onClick={() => handleResultClick(name)}
                        key={index}
                      >
                        {name}
                      </li>
                    ))}
                </ul>
              )}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSearch;
