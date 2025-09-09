import React, { useState, useEffect, useCallback } from "react";
import Weathercard from "./Weathercard_2";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("ghaziabad");
  const [tempInfo, setTempInfo] = useState({});

  // ✅ Wrap in useCallback so function identity doesn't change every render
  const getWeatherInfo = useCallback(async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=6f338b8528ecadee8e88b711a5a8f909&units=metric`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }, [searchValue]); // ✅ dependency

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]); // ✅ no warning now

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      <Weathercard {...tempInfo} />

      {/* Footer */}
      <footer className="footer">
        <p>
          <span className="rgb-text"> Developed by Abhishek Pathak</span>
        </p>
        <a
          href="https://www.linkedin.com/in/abhishek-pathak-10a00b273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-btn"
        >
          Connect on LinkedIn
        </a>
      </footer>
    </>
  );
};

export default Temp;
