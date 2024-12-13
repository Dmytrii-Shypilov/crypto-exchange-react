import { Routes, Route} from "react-router-dom";

import s from './App.module.scss'

import Header from "./components/Header/Header";
import TradePage from "./pages/TradePage/TradePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";

function App() {
  return (
    <div className={s.wrapper}>
      <Header />
  
        <Routes>
          <Route
            path="/"
            element={<AuthorizationPage/>}
          />
          <Route path="/trade/:tradedPair" element={<TradePage />} />
        </Routes>
     
    </div>
  );
}

export default App;
