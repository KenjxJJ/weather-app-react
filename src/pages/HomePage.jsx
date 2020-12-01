import React, { useContext, useState } from "react";
import SingleDay from "../components/SingleDay";

import { WeatherContext } from "../context/WeatherContext";

const HomePage = () => {
  const { data, dispatch, isLoaded, getWeekDay } = useContext(WeatherContext);
  const [dayIndex, setDayIndex] = useState(0);

  if (data[0] !== undefined) {
    var { daily } = data[0];
  }

  const selectDay = (ind) => {
    // choose a day by its dt property
    dispatch({ type: "SELECT_DAY", payload: ind });
    setDayIndex(ind);
  };
  const displayShortDate = (d) => {
    let dayShown = getWeekDay(d.dt);
    return dayShown.slice(0, 3);
  };

  return (
    <>
      {!isLoaded ? (
        <div
          className="m-5 p-5 
          spinner-border text-info"
          role="status"
        >
          <span class="sr-only">Still loading...</span>
        </div>
      ) : (
        <>
          <main>
            <div className="d-flex flex-column">
              <section className="jumbotron">
                <p className="lead">Weekly Chart</p>
                <SingleDay dayIndex={dayIndex} />
              </section>
              <section className="d-flex text-center flex-nowrap my-5 px-1 overflow-x-scroll justify-content-between align-items-center">
                {daily.map((d, index) => (
                  <>
                    <div
                      key={`${d.weather[0].id}+${index}`}
                      className="day-selected d-flex flex-column"
                      onClick={() => selectDay(index)}
                    >
                      <span
                        key={`day${index + 1}`}
                        className="lead font-weight-bold"
                      >
                        {displayShortDate(d)}
                      </span>
                      <img
                        key={`image${index + 2}`}
                        src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                        className="w-100"
                        alt="weather icon"
                      />
                      <small
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <span className="pr-2 font-weight-bold">
                          {d.temp.max}
                          <sup>o</sup>
                        </span>
                        <span>
                          {d.temp.min}
                          <sup>o</sup>
                        </span>
                      </small>
                    </div>
                  </>
                ))}
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default HomePage;
