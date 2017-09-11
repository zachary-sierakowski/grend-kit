import fetch from "isomorphic-fetch";

const getFetchConfig = (method, body) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body
});

export const getServiceHealth = () =>
  fetch("/service/health", getFetchConfig("GET"));
