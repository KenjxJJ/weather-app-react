import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import FullSingleDayCast from "./pages/FullSingleDayCast";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import WeatherContextProvider from "./context/WeatherContext";

const App = () => {
  return (
    <>
      <WeatherContextProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/day/:id" component={FullSingleDayCast} />
          </Switch>
        </Router>
        <Footer />
      </WeatherContextProvider>
    </>
  );
};

export default App;
