const getFetchConfig = (method, body) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body
});

const handleMailResponse = async response => {
  const responseJSON = await response.json();
  if (!response.ok) {
    throw Error(responseJSON.error.response);
  }
  return responseJSON;
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

export const sendServiceRequest = () =>
  fetchHelper(fetch("/service", getFetchConfig("GET")));

export const sendMail = email =>
  fetchHelper(
    fetch("/mail", getFetchConfig("POST", email)).then(handleMailResponse)
  );
