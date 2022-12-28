import Home from "./pages/Home";
import Dairies from "./pages/Dairies";
import Auth from "./pages/Auth";
import Header from "./components/Header"; //note that the header componenet is standalone
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import UpdateDiary from "./pages/UpdateDiary";
function App() {
  //grab the state from the redux
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <Router>
        <div>
          <header>
            <Header />
          </header>

          <section>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/diaries" element={<Dairies />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/add" element={<Add />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/post/:id" element={<UpdateDiary />}></Route>
            </Routes>
          </section>
        </div>
      </Router>
    </>
  );
}

export default App;
