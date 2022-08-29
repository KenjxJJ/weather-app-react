import React, { createContext, useReducer, useEffect, useState } from "react";

const API_KEY = "f6be6c76f1e6cd2e2d8b976ca21506d8";
let weatherData = [];

const dayReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_DAY":
      const dayIndex = action.payload;
      const dayTime = state[0].daily[dayIndex].dt;
      const fullDate = new Date(dayTime * 1000);
      const fullDay = daysOfTheWeek[fullDate.getDay()];
      state[0].daily = state[0].daily.map((data, index) => {
        if (index === dayIndex) {
          return { ...data, day: fullDay };
        }
        return data;
      });
      // console.log("New state", state);
      return state;

    case "SEARCH_LOCATION":
      const location = action.payload;
      const coord = {
        LAT: "",
        LNG: "",
      };
      // fetchDataByLocation(location);
      const API_KEY_OPEN_QUEST = "l6zWeFrIZ5OmRFbrNVXrs8tD7ZvqwM24";
      const LOCATION_URL = `https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY_OPEN_QUEST}&inFormat=kvp&outFormat=json&location=${location}
      &thumbMaps=false`;

      const data = fetch(LOCATION_URL)
        .then((res) => {
          if (res.ok) {
            // console.log("json read");  read json
            return res.json();
          }
          // else throw new Error("Unable to obtain location");
        })
        .then((data) => {
          // if (data !== undefined) {
          // const { results } = data;
          const { locations } = data.results[0];
          const { lat, lng } = locations[0].latLng;
          coord.LAT = parseFloat(lat);
          coord.LNG = parseFloat(lng);
          const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.LAT.toString()}&lon=${coord.LNG.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`;

          state = fetch(API_URL)
            .then((res) => res.json())
            .then((fetchedData) => {
              state = [];
              weatherData = [];
              // state.push(fetchedData);
              weatherData[0] = fetchedData;
              return [...weatherData];
            });

          return state;
        });
      // console.log("NEw data", data);

      // data.then((value) => {
      //   state = [];
      //   state[0] = value;
      //   console.log("New State ", state[0]);
      //   return state[0].resolve(value);
      // });
      console.log("DATA", data);
      console.log("DATA res", Promise.resolve(data));
      return Promise.resolve(data);
      // break;
    default:
      return state;
  }
};

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekDay = (date) => {
  // Convert to milliseconds from Unix timestamps
  const timeConversionToMills = date * 1000;
  const dateConstructed = new Date(timeConversionToMills);
  return daysOfTheWeek[dateConstructed.getDay()];
};

export const WeatherContext = createContext();

const WeatherContextProvider = (props) => {
  const [weatherDataObtained, dispatch] = useReducer(dayReducer, weatherData);
  const [isLoaded, setIsLoaded] = useState(false);

  const API_KEY_OPEN_QUEST = "l6zWeFrIZ5OmRFbrNVXrs8tD7ZvqwM24";
  const [location, setLocation] = useState("Kampala");
  const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY_OPEN_QUEST}&inFormat=kvp&outFormat=json&location=${location}&thumbMaps=false`;

  const [latitude, setLatitude] = useState(0.3476);
  const [longitude, setLongitude] = useState(32.5825);
  const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude.toString()}&lon=${longitude.toString()}&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`;

  useEffect(() => {
    async function fetchData() {
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const { results } = data;
            const { locations } = results[0];
            const { lat, lng } = locations[0].latLng;

            setLatitude(parseFloat(lat));
            setLongitude(parseFloat(lng));
          });
        const data = await fetch(API_URL).then((res) => {
          return res.json();
        });
        weatherData[0] = data;
        setIsLoaded(true);
      } catch (error) {
        if (error.name === "AbortError") console.log("Request aborted!");
        else console.error(error);
      }
    }
    fetchData();
  }, [url, API_URL]);

  return (
    <WeatherContext.Provider
      value={{
        data: weatherDataObtained,
        getWeekDay: getWeekDay,
        dispatch: dispatch,
        isLoaded: isLoaded,
        setIsLoaded: setIsLoaded,
        locationAPI: API_KEY_OPEN_QUEST,
        location: location,
        setLocation: setLocation,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
