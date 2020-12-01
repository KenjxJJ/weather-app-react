import React, { useContext, useState } from "react";
import SingleDay from "../components/SingleDay";

import { WeatherContext } from "../context/WeatherContext";

const HomePage = () => {
  const { data, dispatch, isLoaded, getWeekDay } = useContext(WeatherContext);
  const [dayIndex, setDayIndex] = useState(0);

  if (data[0] !== undefined ) {
    var { daily } = data[0];
  }

  const selectDay = (ind) => {
    // choose a day by its dt property
    dispatch({ type: "SELECT_DAY", payload: ind });
    setDayIndex(ind);
  };
  const displayShortDate = (d)=>{
    let dayShown = getWeekDay(d.dt);
      return dayShown.charAt(0)
  }

   return (
    <>
      {!isLoaded ? (
        <main className="pl-3 m-5 display-4">Still loading...</main>
      ) : (
        <>
          <main>
            <div className="d-flex flex-column">
              <section className="jumbotron">
                <p className="lead">Weekly Chart</p>
                <SingleDay dayIndex = {dayIndex}/>
              </section>
              <section className="d-flex text-center flex-nowrap justify-content-between">
                {daily.map((d, index) => (
                  <>
                    <div
                      key={`${index}+ 1`}
                      className="day-selected d-flex flex-column m-0 day-weather-data"
                      onClick={() => selectDay(index)}
                    >
                      <img
                        key={`image${index}`}
                        src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                        className=""
                        alt="weather icon"
                      />
                      <span
                        key={`day${index}`}
                        className="text-center font-weight-bold"
                      >
                        {displayShortDate(d)}
                      </span>
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
