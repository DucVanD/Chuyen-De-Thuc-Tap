import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userroute from "./routers/user.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {Userroute.map((route, index) => {
          const Component = route.component;
          return (
            <Route key={index} path={route.path} element={<Component />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
