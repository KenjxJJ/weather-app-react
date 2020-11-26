import React, { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContext";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

import classnames from "classnames";

const FullSingleDayCast = (route) => {
  const { data } = useContext(WeatherContext);
//   const { main, wind, city, time } = data;

  const [selectedDayData, setSelectedDayData] = useState({
    weather: {
      id: null,
    },
    city: {},
    main: {},
    wind: {},
  });

  // Obtain value of the id
  const weatherIndex = route.match.params.id;

  useEffect(() => {
    const selectedDayData = data.find(
      (wData) => wData.weather[0].id === parseInt(weatherIndex)
    );
    setSelectedDayData(selectedDayData);
  }, [data, weatherIndex]);

  //   Convert time(in milliseconds) to hh:mm
  const msToTime = (duration) => {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  };

  // For tabs
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const weatherIcon = `http://openweathermap.org/img/wn/10d@2x.png`;
  return (
    <>
      <section
        className="d-flex flex-column jumbotron justify-content-around
      align-items-center"
      >
        <img
          className="m-0 weather-icon"
          src={weatherIcon}
          alt="weather icon"
        />
        <p className="display-4">
          {selectedDayData.main.temp_max} <sup>o</sup>C
        </p>
        <p className="lead">{selectedDayData.city.name}</p>

        {/* //Tabs */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Today
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Tomorrow
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <section className="p-3 text-center">
                  <p>{msToTime(selectedDayData.time)}</p>
                  <p>
                    <img className="" src={weatherIcon} alt="weather icon" />
                  </p>
                  <p>{selectedDayData.main.temp_max}</p>
                </section>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <section className="p-3 text-center weather-info-card">
                  <p>{msToTime(selectedDayData.time)}</p>
                  <p>
                    <img className="" src={weatherIcon} alt="weather icon" />
                  </p>
                  <p>{selectedDayData.main.temp_max}</p>
                </section>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </section>
      <section className="additional-info d-flex flex-row flex-wrap justify-content-between">
        <small className="lead w-50 d-flex justify-content-between pr-3">
          <span className="font-weight-bold">Wind</span> {selectedDayData.wind.speed} m/s
        </small>
        <small className="lead w-50 d-flex justify-content-between pr-3">
          <span className="font-weight-bold">Visibility</span> {selectedDayData.main.pressure}
        </small>
        <small className="lead w-50 d-flex justify-content-between pr-3">
          <span className="font-weight-bold">Humidity</span>
          {selectedDayData.main.humidity}%
        </small>
        <small className="lead w-50 d-flex justify-content-between pr-3">
          <span className="font-weight-bold">Pressure</span> {selectedDayData.main.pressure} Pa
        </small>
      </section>
    </>
  );
};

export default FullSingleDayCast;
