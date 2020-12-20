import React, { useContext, useState } from "react";
import SingleDay from "../components/SingleDay";

import { WeatherContext } from "../context/WeatherContext";

const HomePage = () => {
  const {
    data,
    dispatch,
    isLoaded,
    setIsLoaded,
    getWeekDay,
    setLocation,
    location,
  } = useContext(WeatherContext);
  const [dayIndex, setDayIndex] = useState(0);

  console.log(data);

  const selectDay = (ind) => {
    // choose a day by its dt property
    dispatch({ type: "SELECT_DAY", payload: ind });
    setDayIndex(ind);
  };

  function displayShortDate(d) {
    let dayShown = getWeekDay(d.dt);
    return dayShown.slice(0, 3);
  }

  const searchLocation = (e) => {
    e.preventDefault();
    console.log(location);
    setIsLoaded(false);
    dispatch({ type: "SEARCH_LOCATION", payload: location });
    setIsLoaded(true);
  };

  if(isLoaded === true ){
  if( data !== null && data !== undefined) {
    if (data.length !== undefined && data.length > 0) {
      // console.log("Now not null");
      // console.log(data.length === undefined);
      // console.log(
      //   data !== null && (data.length !== 0 || data.length === undefined)
      // );
      const { daily } = data[0];

      return (
        <>
          <main className="mt-3">
            <div className="d-flex flex-column">
              <section className="single-day pl-4 pr-4">
                <header className="d-flex align-items-center justify-content-between">
                  <p className="lead">Weekly Chart</p>
                  <form
                    className="w-75 d-flex justify-content-end"
                    onSubmit={searchLocation}
                  >
                    <input
                      className="form-control w-50 pt-2 pb-3 m-0 rounded-0"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter a location"
                    />
                    <button
                      className="btn btn-info rounded-0 pt-0 pl-4 pr-4 pb-0"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </header>
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
      );
    }
    return (
      <>
      <h1>No Data...</h1>
      </>
    )
  } 
}else {
    return (
      <>
        {
          <div
            className="m-5 p-5 
       spinner-border text-info h-100"
            role="status"
          >
            <span className="sr-only">Still loading...</span>
          </div>
        }
      </>
    );
  }
};
export default HomePage;
