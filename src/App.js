import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Error from "./Component/Error";
import "./App.css";
import Body from "./Component/Body";
import RestaurantMenu from "./Component/RestaurantMenu";
import Atm from "./Component/Atm";
function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      {/* <Atm /> */}
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
