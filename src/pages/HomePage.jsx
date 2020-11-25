import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SingleDay from "../components/SingleDay";

import { WeatherContext } from "../context/WeatherContext";

const HomePage = () => {
  const { days } = useContext(WeatherContext);
  
  const img = `http://openweathermap.org/img/wn/10d@2x.png`;

  return (
    <>
      <main className="">
        <div className="d-flex flex-column">
          <section className="jumbotron">
            <p className="lead">Weekly Chart</p>
            <SingleDay />
          </section>
          <section className="d-flex text-center flex-nowrap justify-content-between">
            {days.map((day, index) => (
              <>
                <Link>
                  <div
                    className="day-selected d-flex flex-column m-0 day-weather-data"
                    onClick={() => alert(`Selected Day ${index}`)}
                  >
                    <img src={img} className="" alt="weather icon" />
                    <span
                      className="text-center font-weight-bold"
                      key={`${index}+ 1`}
                    >
                      {day.charAt(0)}
                    </span>
                  </div>
                </Link>
              </>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
