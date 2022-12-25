import Home from "./pages/Home";
import Dairies from "./pages/Dairies";
import Auth from "./pages/Auth";
import Header from "./components/Header"; //note that the header componenet is standalone
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
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
            </Routes>
          </section>
        </div>
      </Router>
    </>
  );
}

export default App;
