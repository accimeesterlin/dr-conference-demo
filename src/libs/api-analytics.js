import axios from "axios";

const { log } = console;
const endpoint = "https://DR Conference.clients.agneslegal.com";
const RETRY_TIMER = 1000;
let RETRY_COUNT = 0;

// Add, Get, Delete token from or to localStorage
export const setTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");

  return token;
};

export const fecthToken = async () => {
  const body = {
    apikey: "a5c46429-9645-f2ff-56ec-dca3bb137ee7",
    secret: "5ee1ac478844",
  };

  let response = {
    isError: false,
  };
  try {
    response = await axios({
      url: `${endpoint}/api/v5/authentication`,
      data: new URLSearchParams(body),
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { data } = response;
    setTokenToLocalStorage(data.token);
  } catch (error) {
    response.isError = true;
    removeTokenFromLocalStorage();
  }

  return response;
};

export const fetchByTrends = (path, cb) => {
  const token = getTokenFromLocalStorage();

  if (!token && token !== null) return log("no token found!");

  return axios({
    url: `${endpoint}/api/v5/${path}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      RETRY_COUNT = 0;
      cb(null, response.data);
    })
    .catch((error) => {
      log("Error Response: ", error);
      const statusCode = error.response ? error.response.status : 404;

      // Check if token expired
      if (statusCode === 401 && RETRY_COUNT <= 5) {
        fecthToken(); // get new token
        RETRY_COUNT += 1;

        // Retry this call again after 1 second
        setTimeout(() => fetchByTrends(path, cb), RETRY_TIMER);
        return cb(error, null);
      }
      cb(error, null);
    });
};

export const fetchTrendsByDate = async (value) => {
  const token = getTokenFromLocalStorage();
  const path = "trends/hashtag";

  if (!token && token !== null) return log("no token found!");

  try {
    let url = `${endpoint}/api/v5/${path}?`;

    if (value) {
      url += `query=${value}`;
    }
    const response = await axios({
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response;
    return {
      isError: false,
      data: data.trends,
    };
  } catch (error) {
    log("Error Fetching Response By date: ", error);
    retryToken(error, fetchTrendsByDate);
    return {
      isError: true,
      data: [],
    };
  }
};

const retryToken = ({ response }, func) => {
  const statusCode = response ? response.status : 404;

  // Check if token expired
  if (statusCode === 401 && RETRY_COUNT <= 5) {
    fecthToken(); // get new token
    RETRY_COUNT += 1;

    // Retry this call again after 1 second
    setTimeout(() => func(), RETRY_TIMER);
  }
};

export const getTopicsByTrends = (path, cb) => {
  fetchByTrends(path, (error, data) => {
    if (!error) {
      const trends = (data && data.trends) || [];
      const topics = trends.length ? trends[0].topics : [];

      return cb(error, topics);
    }

    cb(error, null);
  });
};
