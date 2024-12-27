import { Routes, Route } from "react-router-dom";

import s from "./App.module.scss";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TradePage from "./pages/TradePage/TradePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { TradeStreamProvider } from "./context/TradeStreamContext";


function App() {
  
  return (
    <TradeStreamProvider>
    <div className={s.wrapper}>
      <Header />

      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthorizationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/trade/:tradedPair"
          element={
            <PrivateRoute>
              <TradePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
    </TradeStreamProvider>
  );
}

export default App;
