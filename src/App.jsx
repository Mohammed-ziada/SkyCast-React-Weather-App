import { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import Weather from "./components/Weather/Weather";
import { weatherCodes } from "../Constant";
import NoResult from "./components/NoResult/NoResult";
const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (currentWeather.location) {
      setSelectedCity(currentWeather.location);
    }
  }, [currentWeather.location]);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter((item) => {
      const forecastTime = new Date(item.time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecast(next24HoursData);
  };

  const getWeatherData = async (Api_Url) => {
    setHasNoResults(false);
    try {
      const res = await fetch(Api_Url);
      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        throw new Error();
      }
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      // const icon = o data.current.condition.icon;
      const icon =
        Object.keys(weatherCodes).find((icon) =>
          weatherCodes[icon].includes(data.current.condition.code)
        ) || "clear";
      const location = data.location.name;
      const country = data.location.country;
      const humidity = data.current.humidity;
      const wind = data.current.wind_kph;
      setCurrentWeather({
        temperature,
        description,
        icon,
        location,
        country,
        humidity,
        wind,
      });
      const compineDays = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      filterHourlyForecast(compineDays);
    } catch (error) {
      setHasNoResults(true);
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    const defaultCity = "Cairo";
    const API_KEY = import.meta.env.VITE_API_KEY;
    const Api_Url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=3&aqi=no&alerts=no`;
    getWeatherData(Api_Url);
  }, []);
  return (
    <div className="container">
      {/* Search Section */}
      <Search getWeatherData={getWeatherData} selectedCity={selectedCity} />
      {hasNoResults ? (
        <NoResult />
      ) : (
        <Weather
          currentWeather={currentWeather}
          hourlyForecast={hourlyForecast}
        />
      )}

      {/* Weather Section */}
    </div>
  );
};

export default App;
