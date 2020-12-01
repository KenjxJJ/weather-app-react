import React, { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContext";

const FullSingleDayCast = (route) => {
  // Obtain value of the id
  const weatherDayIndex = route.match.params.id;
  const { data, getWeekDay } = useContext(WeatherContext);
  const [isDoneLoading, setisDoneLoading] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState({
    dt: null,
    temp: {},
    wind_speed: "",
    weather: [],
    uvi: "",
    pressure: "",
    humidity: "",
  });

  useEffect(() => {
    const { daily } = data[0];
    console.log("DAily", daily);
    const selectedDayData = daily[parseInt(weatherDayIndex)];
    setSelectedDayData(selectedDayData);
    setisDoneLoading(true);
    console.log("SelectDT", selectedDayData);
  }, [data, weatherDayIndex]);

  //   Convert time(in milliseconds) to hh:mm
  const msToTime = (duration) => {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  };

  return (
    <>
      {isDoneLoading ? (
        <>
          <section
            className="d-flex flex-column jumbotron justify-content-around
      align-items-center"
          >
            <div className="d-flex w-100 flex-row nowrap justify-content-between  align-items-center">
              <p className="display-4">{getWeekDay(selectedDayData.dt)}</p>
              <p className="font-weight-bold lead">
                {msToTime(selectedDayData.dt)}
              </p>
            </div>
            <img
              className="m-0 weather-icon"
              src={`http://openweathermap.org/img/wn/${selectedDayData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p className="display-4">
              {selectedDayData.temp.max} <sup>o</sup>C
            </p>
            {/* <p className="lead">{city.name}</p> */}
            <p className="lead">
              {data[0].lat},{data[0].lon}
            </p>
            <small className="font-italic">( latitude, longitude ) </small>

            <section className="w-75 d-flex flex-column">
              <small className="lead w-100 d-flex justify-content-between pr-3">
                Description :
                <span className="pl-2">
                  {selectedDayData.weather[0].description}
                </span>{" "}
              </small>
              <div className="d-flex  flex-row nowrap justify-content-between">
                <small className="lead w-50 d-flex justify-content-between pr-3">
                  Max. Temp :
                  <span className="pl-2">
                    {selectedDayData.temp.max}<sup>o</sup>C{" "}
                  </span>{" "}
                </small>
                <small className="lead w-50 d-flex justify-content-between pr-3">
                  Min. Temp :
                  <span className="pl-2">
                    {selectedDayData.temp.min}<sup>o</sup>C{" "}
                  </span>{" "}
                </small>
              </div>
              <div className="d-flex w-100 flex-row nowrap justify-content-between">
                <small className="lead w-50 d-flex justify-content-between pr-3">
                  Sunrise:
                  <span className="pl-2">
                    {msToTime(selectedDayData.sunrise)}{" "}
                  </span>{" "}
                </small>
                <small className="lead w-50 d-flex justify-content-between pr-3">
                  Sunset:
                  <span className="pl-2">
                    {msToTime(selectedDayData.sunset)}{" "}
                  </span>{" "}
                </small>
              </div>
              <small className="lead w-100 d-flex justify-content-between pr-3">
                Rain :
                <span className="pl-2">
                  {selectedDayData.rain} mm
                </span>{" "}
              </small>
            </section>
          </section>
          <section className="additional-info d-flex flex-row flex-wrap justify-content-between p-3">
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">Wind (Speed)</span>{" "}
              {selectedDayData.wind_speed} m/s
            </small>
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">UVI</span>{" "}
              {selectedDayData.uvi}
            </small>
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">Humidity</span>
              {selectedDayData.humidity}%
            </small>
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">Pressure</span>{" "}
              {selectedDayData.pressure} hPa
            </small>
          </section>

          <section className="additional-info mt-5 d-flex flex-row flex-wrap justify-content-between p-3 mb-5">
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">Dew Point</span>{" "}
              {selectedDayData.dew_point} K
            </small>
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">Clouds</span>{" "}
              {selectedDayData.clouds} %
            </small>{" "}
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">Pop</span>
              {selectedDayData.pop}
            </small>
            <small className="lead w-50 d-flex justify-content-between pr-3">
              <span className="font-weight-bold">
                Wind (Direction) <sup>o</sup>
              </span>{" "}
              {selectedDayData.wind_deg}
            </small>
          </section>
        </>
      ) : (
        <main className="pl-4 display-4">Still loading...</main>
      )}
    </>
  );
};

export default FullSingleDayCast;
