const API_KEY = process.env.REACT_APP_API_KEY;
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getCoordinates = async (city) => {
  return fetch(`${ENDPOINT}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
};

export const getLocation = async ({ lat, lon }) => {
  return fetch(
    `${ENDPOINT}/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
};

export const getWeatherData = async ({ lat, lon }) => {
  return fetch(
    `${ENDPOINT}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts, minutely, hourly&units=metric&appid=${API_KEY}`
  );
};
