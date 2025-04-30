import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./_core/store/store";
import { persistStore } from "redux-persist";
import Main from "./main";
import { Toaster } from "react-hot-toast";

const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
