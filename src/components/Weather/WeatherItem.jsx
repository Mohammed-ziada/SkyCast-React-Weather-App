/**  interface WeatherItemProps {
   time: string;
   temp: number;
   icon: string;
 }*/

import { weatherCodes } from "../../../Constant";

const WeatherItem = ({ hourlyDegree, style }) => {
  const icons =
    Object.keys(weatherCodes).find((icon) =>
      weatherCodes[icon].includes(hourlyDegree.condition.code)
    ) || "clear";
  const { time, temp_c } = hourlyDegree;
  const formattedTime = time.split(" ")[1].substring(0, 5); // Extracting time part from the string
  // console.log("Hourly Degree:", temp_c);
  return (
    <li className="weather-item" style={style}>
      <p className="time">{formattedTime}</p>
      <img src={`icons/${icons}.svg`} alt="cloud" className="weather-icon" />
      <p className="hourly-temperature">{temp_c}&deg;</p>
    </li>
  );
};

export default WeatherItem;
