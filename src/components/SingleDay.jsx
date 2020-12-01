import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const SingleDay = ({dayIndex}) => {
  const { data, getWeekDay } = useContext(WeatherContext);
  const { daily } = data[0];

  const index = dayIndex;
  const { uvi, weather,pressure, temp, wind_speed, humidity } = daily[index];
  let {day} = daily[index];
  
  // On first render, the prop day is undefined, as it is an added property
  // utilize dt(day time property)
  if(day === undefined ) {
     const currentTime = daily[0].dt
    day = getWeekDay(currentTime);
  }
  return (
    <>
      <section
        className="d-flex jumbotron justify-content-around
      align-items-center"
      >
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          className="m-0"
          style={{ width: "25%" }}
          alt="weather icon"
        />
        <p className="display-4 p-2 mr-3">{day}</p>
        <p className="lead p-2 pl-5 font-weight-bold">
          {temp.max}
          <sup>o</sup>C
        </p>
        <p className="lead  text-muted p-2">
          {temp.min}
          <sup>o</sup>C
        </p>
      </section>
      <div className="d-flex flex-column">
        <section className="additional-info d-flex flex-row flex-wrap justify-content-between">
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Wind</span> {wind_speed} m/s
          </small>
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">UVI</span> {uvi}
          </small>
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Humidity</span>
            {humidity}%
          </small>
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Pressure</span> {pressure} hPa
          </small>
        </section>
      </div>
      <Link to={`/day/${index}`}>
        <Button className="mt-4">See Details</Button>
      </Link>
    </>
  );
};

export default SingleDay;
