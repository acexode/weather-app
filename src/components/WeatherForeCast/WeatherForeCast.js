import React, {useEffect} from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: 'Temperature from Service One',
      data: [],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: 'Temperature from Service Two',
      data: [],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const WeatherForeCast = ({services, dateLabels}) => {
    console.log(services)
    data.datasets[0].data = services[0]?.map(s => parseInt(s.temp)).slice(0,7)
    data.datasets[1].data = services[1]?.map(s => parseInt(s.temp)).slice(0,7)
    data.labels = dateLabels.slice(0,7)
    // useEffect(() => {
    //     // console.log(service1, service2)
    //    console.log(data)
    // }, [services])
    return (
        <div class="row">
            <div class="col-12 pl-0">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">
                            Week Weather Forecast
                        </h3>
                        {services.length > 0 ?
                        <Bar data={data} options={options} />
                        : null
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherForeCast
