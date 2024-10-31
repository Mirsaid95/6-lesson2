import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Messages } from "./pages/messages";
import { MainLayout } from "./config/layout/main-layout";
import { Register } from "./pages/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Messages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
