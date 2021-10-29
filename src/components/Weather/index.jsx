import {useMemo, useEffect } from "react";
import debouce from "lodash.debounce";
import { useAppContext } from "../../context/AppContext";

import "./weather.css";
import Input from "../Input";
import WeatherCards from "../WeatherCards/index.";
import WeatherForeCast from "../WeatherForeCast/WeatherForeCast";


const Weather = () => {
  const {setquery, cardWeather,location, services, dateLabels } = useAppContext()
  const handleChange = (e) => {
    setquery(e.target.value)
  
};
  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  
  return (
    <div className="weather container">
      <p className="title">Weather App</p>
      <Input debouncedResults={debouncedResults}  />

      {cardWeather.length > 0 ? (
        <div>
          <WeatherCards location={location} cardWeather={cardWeather}  />
          <WeatherForeCast dateLabels={dateLabels} services={services} />
        </div>
      ) : <p className="text-center mt-5">Enter your city</p>}
    </div>
  );
}

export default Weather;
