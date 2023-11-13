import { Children } from "react";
import App from "../App";
import HomePage from "../pages/HomePage";

const routes = [{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />
        },

    ]

}]

export default routes;