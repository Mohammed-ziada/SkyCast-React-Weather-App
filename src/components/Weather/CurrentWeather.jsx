const CurrentWeather = ({ currentWeather }) => {
  // console.log("Current Weather:", currentWeather);
  return (
    <div className="current-weather">
      <h2 className="city-name">
        {currentWeather.location}, {currentWeather.country}
      </h2>
      <div className="weather-icon">
        {/* <span className="material-symbols-rounded">wb_sunny</span> */}
        <img
          src={`icons/${currentWeather.icon}.svg`}
          alt="cloud"
          className="weather-icon"
        />
        <h2 className="temperature">
          {currentWeather.temperature} <span>&deg;C</span>
        </h2>
        <p className="description">{currentWeather.description}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
