import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: 'Lahore',
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setWeatherData: (state, action) => {
      state.currentWeather = action.payload.current;
      state.forecast = action.payload.forecast.forecastday;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoaded: (state) => {
      state.loading = false;
    },
  },
});

export const { setCity, setWeatherData, setLoading, setError, setLoaded } = weatherSlice.actions;
export default weatherSlice.reducer;
