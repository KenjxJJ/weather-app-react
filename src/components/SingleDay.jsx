import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { Button } from "reactstrap";
import {Link} from "react-router-dom";

const SingleDay = () => {
  const { data } = useContext(WeatherContext);
  const { main, wind, day, weather } = data[0];
  const img = `http://openweathermap.org/img/wn/10d@2x.png`;

  return (
    <>
      <section
        className="d-flex jumbotron justify-content-around
      align-items-center"
      >
        <img
          src={img}
          className="m-0"
          style={{ width: "25%" }}
          alt="weather icon"
        />
        <p className="display-4 p-2 mr-3">{day}</p>
        <p className="lead p-2 pl-5 font-weight-bold">
          {main.temp_max}
          <sup>o</sup>C
        </p>
        <p className="lead  text-muted p-2">
          {main.temp_min}
          <sup>o</sup>C
        </p>
      </section>
      <div className="d-flex flex-column">
        <section className="additional-info d-flex flex-row flex-wrap justify-content-between">
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Wind</span> {wind.speed} m/s
          </small>
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Visibility</span> {main.pressure}
          </small>
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Humidity</span>
            {main.humidity}%
          </small>
          <small className="lead w-50 d-flex justify-content-between pr-3">
            <span className="font-weight-bold">Pressure</span> {main.pressure}{" "}
            Pa
          </small>
        </section>
      </div>
      <Link to={`/day/${weather[0].id}`}>
        <Button className="mt-4">See Details</Button>
      </Link>
    </>
  );
};

export default SingleDay;
