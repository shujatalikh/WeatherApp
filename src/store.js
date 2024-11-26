import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
