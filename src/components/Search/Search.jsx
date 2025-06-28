import { useEffect, useRef } from "react";

const Search = ({ getWeatherData, selectedCity }) => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const inputRef = useRef();
  useEffect(() => {
    if (selectedCity && inputRef.current) {
      inputRef.current.value = selectedCity;
    }
  }, [selectedCity]);
  const handleCitySearch = (e) => {
    // console.log(ApiKey);
    e.preventDefault();
    const input = e.target.querySelector(".search-input");
    // console.log(input.value);
    const Api_Url = ` http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${input.value}&days=2`;
    // console.log();
    // fetch(Api_Url).then((res) => {
    //   console.log(res);
    //   if (!res.ok) {
    //     alert("Please enter a valid city name");
    //     return;
    //   } else {
    //     res.json().then((data) => {
    //       console.log(data);
    //     });
    //   }
    // });
    getWeatherData(Api_Url);
  };
  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const Api_Url = `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${latitude},${longitude}&days=2`;
        getWeatherData(Api_Url);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please try again.");
      }
    );
  };
  return (
    <div className="search-section">
      <form action="#" className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">search</span>
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          required
          placeholder="Enter City Name"
        />
      </form>
      <button className="location-button" onClick={handleLocation}>
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default Search;
