import { Routes, Route } from "react-router-dom";

import s from "./App.module.scss";

import Header from "./components/Header/Header";
import TradePage from "./pages/TradePage/TradePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
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
              <div>Home page</div>
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
  );
}

export default App;
