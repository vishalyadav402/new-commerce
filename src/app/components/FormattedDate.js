import React from "react";

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th"; // Covers 11th-13th
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

const FormattedDate = ({ date }) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString("en-GB", { month: "short" }); // "Mar"
  const year = parsedDate.getFullYear();
  const time = parsedDate.toLocaleString("en-GB", { 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: true 
  }).toLowerCase(); // "08:39 am"

  return <span>{`${day}${getOrdinalSuffix(day)} ${month} ${year}, ${time}`}</span>;
};

export default FormattedDate;
