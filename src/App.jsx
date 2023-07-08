import { Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import CustomSnackbar from "./common/CustomSnackbar";

function App() {
  return (
    <div>
      <CustomSnackbar />
      <Outlet />
    </div>
  );
}

export default App;
