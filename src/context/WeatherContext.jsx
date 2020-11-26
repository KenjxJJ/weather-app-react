import React, { createContext, useReducer } from "react";

const weatherData = [{
  day: "Thursday",
  city: {
    id: 1283240,
    name: "Kathmandu",
    findname: "KATHMANDU",
    country: "NP",
    coord: { lon: 85.316666, lat: 27.716667 },
    zoom: 7,
  },
  time: 1489487389,
  main: {
    temp: 291.15,
    pressure: 1017,
    humidity: 45,
    temp_min: 291.15,
    temp_max: 291.15,
  },
  wind: { speed: 9.3, deg: 240, var_beg: 200, var_end: 270 },
  clouds: { all: 75 },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "proximity moderate rain",
      icon: "10d",
    },
  ],
}];

const dayReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_DAY":
      console.log({...state});
      const dayIndex = action.payload;
      const fullDay = daysOfTheWeek[dayIndex];
      return[ { ...state,
              day: fullDay
            }];

      default:
      return state;
  }
};

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const WeatherContext = createContext();

const WeatherContextProvider = (props) => {

  const [weatherDataObtained, dispatch] = useReducer(dayReducer, weatherData);

  return (
    <WeatherContext.Provider value={{ data: weatherDataObtained, days: daysOfTheWeek, dispatch: dispatch }}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
