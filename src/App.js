import { Outlet } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Outlet />
  );
}

export default App;
