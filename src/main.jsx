import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DashboardContextProvider from "./context/DashboardContextProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import DisplayUsers from "./components/DisplayUsers.jsx";
import Header from "./components/Header.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      { path: "/home", element: <Home /> },
      {
        path: "/display-users",
        element: (
          <>
            <Header title="Users" />
            <DisplayUsers />
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DashboardContextProvider>
      <RouterProvider router={appRouter} />
    </DashboardContextProvider>
  </React.StrictMode>
);
