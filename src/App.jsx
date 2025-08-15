import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Feed from "./components/feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import PageNotFound from "./components/PageNotFound.jsx";
import ConnectionRequest from "./components/ConnectionRequest.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Connections from "./components/Connections.jsx";
// import { useSelector } from "react-redux"
function App() {
  // const user = useSelector((state) => state.user);
  return (
    <>
      {/* here i am using the provider to connect the store to the app */}
      <Provider store={appStore}>
        {/* BrowserRouter is used to enable routing in the app */}
        {/* Routes is used to define the different routes in the app */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/connectionRequest"
                element={
                  <ProtectedRoute>
                    <ConnectionRequest />
                  </ProtectedRoute>
                }
                />
                <Route
                  path="/connections"
                  element={
                    <ProtectedRoute>
                      <Connections />
                    </ProtectedRoute>
                  }
                  />
                  </Route>
              <Route path="*" element={<PageNotFound />} />
            {/* // if the page not found lets show page not found error */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
