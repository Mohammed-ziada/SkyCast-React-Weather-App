import React from "react";
import WeatherItem from "./WeatherItem";
import CurrentWeather from "./CurrentWeather";

const Weather = ({ currentWeather, hourlyForecast }) => {
  //  console.log("Current Weather:", currentWeather);
  // console.log("Hourly Forecast:", hourlyForecast);
  return (
    <div className="weather-section">
      <CurrentWeather currentWeather={currentWeather} />
      <div className="hourly-forecast">
        <ul className="weather-list">
          {hourlyForecast.map((hourly, index) => {
            // console.log("Hourly Data:", hourly);
            return (
              <WeatherItem
                key={hourly.time_epoch}
                hourlyDegree={hourly}
                style={{ "--delay": `${index * 0.1}s` }}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Weather;
