import React from "react";
import axios from "axios";

const baseURL = "https://api.aroundme.co.in";
// const baseURL = "http://192.168.0.102:8000";

let Credentials = "";
if (typeof window !== "undefined") {
  Credentials = JSON.parse(localStorage.getItem("credentials")) || "";
}
// login Api ------
export function login(data) {
  return fetchData("login/userlogin/", "post", data);
}

// ----  location list Api ----------- //
export function location_list() {
  return fetchData(`webapp/locationlist/`, "get");
}


// ----  category list Api ----------- //
export function category_list() {
  return fetchData("webapp/category/", "get");
}

// ----  category list Api ----------- //
export function category_list_inorder() {
  return fetchData("webapp/category/?ordering=-category_name", "get");
}
