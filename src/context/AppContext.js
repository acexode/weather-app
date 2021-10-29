import React, { createContext, useEffect, useState } from "react";
import config from '../config.json'



const baseURL1 = "http://api.openweathermap.org";
const baseURL2 = "https://api.met.no";
const APIKEY = config.APIKEY
const AppContext = createContext();

const AppProvider = (props) => {


  const [query, setquery] = useState(null);
  const [weather, setWeather] = useState([]);
  const [cardWeather, setcardWeather] = useState([])
  const [services, setservices] = useState([])
  const [location, setlocation] = useState({})
 const [dateLabels, setdateLabels] = useState([])
 useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
        let loc = {
            lat:  position.coords.latitude,
            lon:  position.coords.longitude
        }
        getWeatherData(loc)
    })
 }, [])
  useEffect(() => {
    if(APIKEY.length === 0){
        alert('ADD YOUR OPEN WEATHER API KEY')
    }else{
        if(query){
            fetchLocations(query)
           if(query){
               setInterval(() => {
                fetchLocations(query)
                // console.log(query)
               }, 5000);
           }
        }

    }
  }, [query]);

  

  const fetchLocations = async (query) => {
      try {
          const location = await fetch(
              `${baseURL1}/geo/1.0/direct?q=${query}&appid=${APIKEY}`
            ).then((res) => res.json())
            if(location.length > 0){
                console.log(location)
                getWeatherData(location[0])
            }
      } catch (error) {
          console.log(error)
      }
      
  };
  const  getWeatherData = async(loc) => {
        const {lat, lon} = loc
        Promise.all([
          fetch(`${baseURL2}/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`),
          fetch(`${baseURL1}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&type=hour&Metric=celsius&cnt=7&appid=${APIKEY}`)
        ]).then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
          const [data1, data2] = data;
          let unique = []
          const service1 = []
          data1.properties.timeseries.forEach(t =>{
            let det = t.data.instant.details
            if(!unique.includes(new Date(t.time).toLocaleDateString())){
              unique.push(new Date(t.time).toLocaleDateString())
              service1.push({
                temp: det?.air_temperature,
                hum: det?.relative_humidity,
                wind: det?.wind_speed,
                prec: det?.precipitation,
              })
            }
          })
          setlocation(data2.city)
          setdateLabels(unique)
          const service2 = data2.list.map(t =>{
            return {
              temp: (t?.temp.max - 273.15).toFixed(1),
              hum: t?.humidity,
              prec: t?.precipitation,
              wind: t?.gust
            }
          })
          setcardWeather([service1[0], service2[0]])
          setservices([service1, service2])
        }).catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });
  }


  return (
    <AppContext.Provider
      value={{
        setquery,
        query,
        cardWeather,
        location,
        services,
        dateLabels
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be within an AppProvider");
  }
  return context;
}

export { AppProvider, useAppContext };
