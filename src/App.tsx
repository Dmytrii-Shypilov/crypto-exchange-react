import { Routes, Route } from "react-router-dom";

import s from "./App.module.scss";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TradePage from "./pages/TradePage/TradePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "./redux/user/user-selector";

function App() {
  const { user } = useSelector(getUserData);

  useEffect(() => {
    // const isSocketOpen = sessionStorage.getItem(`socket-open-${user.id}`);

   if(!user.id) return

    // if (isSocketOpen) {
    //   console.log("WebSocket already connected for this user");
    //   return;
    // }


    const socket = new WebSocket(
      `ws://localhost:8000/paperTrade/stream/${user.id}`
    );
    
 

    socket.onopen = () => {
      console.log("WebSocket connected");
      sessionStorage.setItem(`socket-open-${user.id}`, "true");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      // sessionStorage.removeItem(`socket-open-${user.id}`);
      socket.close();
      console.log('App removeed and socket closed')
    };
  }, [user.id]);

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
  );
}

export default App;
