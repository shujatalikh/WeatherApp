import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setWeatherData, setLoading, setError, setLoaded } from '../features/weatherSlice';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { city, currentWeather, forecast, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    const getWeather = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=217835ceae8349e5a02185618241711&q=${city}&days=7&aqi=no&alerts=no`);
        const data = await response.json();
       
        dispatch(setWeatherData(data));
      } catch (err) {
        dispatch(setError('Failed to fetch weather data.'));
      } finally {
        dispatch(setLoaded());
      }
      
    };

    getWeather();
  }, [city, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputCity = e.target.city.value.trim();
    if (inputCity) {
      dispatch(setCity(inputCity));
    } else {
      alert('Please enter a city name.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
    <div className="wrapper bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="img_section bg-blue-500 text-white flex flex-col items-center justify-center py-6">
        <div className="default_info text-center">
          <h2 className="default_day text-3xl font-bold" id="currentDay">
            {currentWeather ? new Date(currentWeather.last_updated).toLocaleDateString() : 'Loading...'}
            {/* {console.log("--->current weather",currentWeather)} */}
          </h2>
          
          <div className="icons flex items-center justify-center mt-4 space-x-4">
            <img
              id="currentWeatherIcon"
              src={currentWeather ? `https:${currentWeather.condition.icon}` : 'https://openweathermap.org/img/wn/10d@4x.png'}
              alt="Weather Icon"
              className="w-16 h-16"
            />
            <div>
              <h2 className="weather_temp text-4xl font-semibold" id="currentTemp">
                {currentWeather ? `${currentWeather.temp_c}°C` : 'Loading...'}
              </h2>
              <h3 className="cloudtxt text-xl" id="currentCondition">
                {currentWeather ? currentWeather.condition.text : 'Loading...'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content_section bg-gray-100 p-6">
        {/* Search Area */}
        <div className="search_area mb-6">
          <form id="weatherForm" className="flex space-x-4" onSubmit={handleSubmit}>
            <input
              id="cityInput"
              name="city"
              type="text"
              placeholder="Search Location"
              className="input_field w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              id="submit"
              className="btn_search px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {/* Day Info */}
        <div className="day_info grid grid-cols-2 md:grid-cols-4 gap-4 text-black">
          <div className="content bg-white p-4 rounded-md shadow ">
            <div className="flex justify-between">
              <p className="title text-gray-500 uppercase text-sm">City</p>
              
            </div>
            <span id="names" className="value font-bold text-lg">
              {currentWeather ? city : 'Loading...'}
            </span>
          </div>

          <div className="content bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <p className="title text-gray-500 uppercase text-sm">Temp</p>
              <span>
                   {/* <img
              src={`https:${currentWeather.condition.icon}`} // Use the condition icon here for simplicity
              alt="Humidity icon"
              style={{ width: '30px', height: '30px' }}
            /> */}
              
              </span>
            </div>
            <span id="temps" className="value font-light text-lg">
              {currentWeather ? `${currentWeather.temp_c}°C` : 'Loading...'}
            </span>
          </div>

          <div className="content bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <p className="title text-gray-500 uppercase text-sm">Humidity</p>
              <span>
                
            
              </span>
            </div>
            <span id="humidities" className="value font-light text-lg">
              {currentWeather ? `${currentWeather.humidity}%` : 'Loading...'}
            </span>
          </div>
          <div className="content bg-white p-4 rounded-md shadow">
            <div className="flex justify-between">
              <p className="title text-gray-500 uppercase text-sm">Wind Speed</p>
              <span>
             
              </span>
            </div>
            <span id="winds" className="value font-light text-lg">
              {currentWeather ? `${currentWeather.wind_kph} km/hr` : 'Loading...'}
            </span>
          </div>
        </div>

        {/* Forecast Section */}
        <div className="list_content mt-6 border-r-4 p-4 text-black">
          <ul id="forecastList" className="space-y-4 grid md:grid-cols-4 text-center justify-center items-center">
            
            {/* Forecast data will be dynamically inserted here */}

            {forecast.length > 0 ? (
              forecast.map((day) => {
                const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
                const temp = `${day.day.avgtemp_c}°C`;
                const icon = day.day.condition.icon;

                return (
                  <li key={day.date} className="flex items-center p-4">
                    <img src={`https:${icon}`} alt="Weather Icon" />
                    <span className="px-2">{dayName}</span>
                    <span className="day_temp">{temp}</span>
                  </li>
                );
              })
            ) : (
              <p>Loading forecast...</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
};

export default WeatherApp;
