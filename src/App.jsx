import React from "react";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store";
import AirportPage from "./components/airport-page/AirportPage";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AirportPage />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
