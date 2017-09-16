import fetch from "isomorphic-fetch";

const getFetchConfig = (method, body) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body
});

const handleJSONResponse = response => {
  if (!response.ok) {
    throw Error("Request failed");
  }
  return response.json();
};

const fetchHelper = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
};

export const getServiceHealth = () =>
  fetch("/service/health", getFetchConfig("GET"));

export const sendMail = email =>
  fetchHelper(
    fetch("/mail", getFetchConfig("POST", email)).then(handleJSONResponse)
  );
