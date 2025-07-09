import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './utils/appStore';

function App() {
  return (
   <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
      <Body />
    </PersistGate>
    </Provider>
    
  );
}

export default App;
