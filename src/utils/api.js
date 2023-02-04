import axios from "axios";
import React from "react";
export const api = "https://0e28-154-159-237-126.in.ngrok.io/api";
const getFeeds = async () => {
  try {
    const res = await axios.get(`${api}/feeds`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getRequests = () => {
  try {
    const res = axios.get(`${api}/requests`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getMyDonations = () => {
  try {
    const res = axios.get(`${api}/donations`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};


// const getMyDonations = () => {
//   try {
//     const res = axios.get(`${api}/donations`);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// }
module.exports = { getRequests, getFeeds, getMyDonations };
