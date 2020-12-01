import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from "react";

const weatherData = [];

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

    case "DISPLAY_SELECTED_DATA":
      console.log("New state Before", state);
      return [{ ...state[0].daily[0], day: "Monday" }];
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
  const API_KEY = "f6be6c76f1e6cd2e2d8b976ca21506d8";
  // const CITY_NAME = "London";
  const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=metric&exclude=hourly,minutely,alerts&appid=${API_KEY}`;
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherDataObtained, dispatch] = useReducer(dayReducer, weatherData);

  const fetchData = useCallback(async (controller) => {
    try {
      const data = await fetch(API_URL, { signal: controller.signal }).then(
        (res) => {
          return res.json();
        }
        );
        weatherData.push(data);
        setIsLoaded(true);
      // console.log(weatherData);
    } catch (error) {
      if (error.name === "AbortError") console.log("Request aborted!");
      else console.error(error);
    } finally {
      if (!controller.signal.aborted) setIsLoaded(true);
    }
  }, [API_URL]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => controller.abort();
  }, [fetchData]);

  return (
    <WeatherContext.Provider
      value={{
        data: weatherDataObtained,
        getWeekDay: getWeekDay,
        dispatch: dispatch,
        isLoaded: isLoaded,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
