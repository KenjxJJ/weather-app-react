import React, { useContext } from "react";
import SingleDay from "../components/SingleDay";

import { WeatherContext } from "../context/WeatherContext";

const HomePage = () => {
  const { days, dispatch } = useContext(WeatherContext);

  const img = `http://openweathermap.org/img/wn/10d@2x.png`;

  const selectDay = (ind) => {
    // choose a day
    dispatch({ type: "SELECT_DAY", payload: ind });
  };

  return (
    <>
      <main>
        <div className="d-flex flex-column">
          <section className="jumbotron">
            <p className="lead">Weekly Chart</p>
            <SingleDay />
          </section>
          <section className="d-flex text-center flex-nowrap justify-content-between">
            {days.map((day, index) => (
              <>
                <div
                  key={`${index}+ 1`}
                  className="day-selected d-flex flex-column m-0 day-weather-data"
                  onClick={() => selectDay(index)}
                >
                  <img
                    key={`image${index}`}
                    src={img}
                    className=""
                    alt="weather icon"
                  />
                  <span
                    key={`day${index}`}
                    className="text-center font-weight-bold"
                  >
                    {day.charAt(0)}
                  </span>
                </div>
              </>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
