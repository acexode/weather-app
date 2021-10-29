import React, {useEffect} from "react";
import "./displayweather.css";

function WeatherCards(props) {
  const { cardWeather, location } = props;
  console.log(location);

  useEffect(() => {
    console.log(location)
  }, [location])
  // const iconurl =
  //   "http://openweathermap.org/img/wn/" +
  //   `${data.cod != 404 ? data.weather[0].icon : null}` +
  //   ".png";
  return (
    <div className="displayweather">
    <div className=" row">

      {cardWeather.length && cardWeather.map(card =>(
       <div class="col-6 pl-0">
                <h6>Service 2</h6>
                <h3>{location?.name} {location?.country}</h3>
                <div class="card dash-widget ">
                    <div class="card-body px-2">
                      
                      <h1 className="pl-2">{card.temp}
                      <sup>o</sup>
                    </h1>
            <div class="row text-left">
            <div className="col-9">Humidity</div>
            <div className="col-3">{card.hum}</div>
            <div className="col-9">Wind</div>
            <div className="col-3">{card.wind}</div>
            <div className="col-9">Precipitation</div>
            <div className="col-3">{card.prec}</div>
            
                        </div>
                    </div>
                </div>
            </div>

      ))
      
      }
      </div>

    </div>
  );
}

export default WeatherCards;
