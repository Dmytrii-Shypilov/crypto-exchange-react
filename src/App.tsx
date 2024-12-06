import { Routes, Route} from "react-router-dom";

import s from './App.module.scss'

import Header from "./components/Header/Header";
import TradePage from "./pages/TradePage/TradePage";

function App() {
  return (
    <div className={s.wrapper}>
      <Header />
  
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <h1>Heloo</h1>
              </main>
            }
          />
          <Route path="/trade/:tradedPair" element={<TradePage />} />
        </Routes>
     
    </div>
  );
}

export default App;
