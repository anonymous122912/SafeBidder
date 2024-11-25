import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AuthLayout from './components/AuthLayout.jsx';
import BitsPage from "./pages/BitsPage.jsx";
import CreateBit from "./pages/CreateBit.jsx";
import Profile from "./pages/profile.jsx";
import BitDetails from "./pages/BitDetails.jsx";





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/bits",
        element: (
          <AuthLayout authentication={true}>
            <BitsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/createbit",
        element: (
          <AuthLayout authentication={true}>
            <CreateBit />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/bit/:bitid",
        element: (
          <AuthLayout authentication={true}>
            <BitDetails />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
