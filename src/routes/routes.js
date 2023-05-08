import { Children } from "react";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "login",
            element: <LoginPage />
        },
        {
            path: "register",
            element: <RegisterPage />
        },

    ]

}]

export default routes;