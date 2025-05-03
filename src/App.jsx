import { Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo.jsx";
import Users from "./pages/Users.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-4 md:px-10 lg:px-32 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
