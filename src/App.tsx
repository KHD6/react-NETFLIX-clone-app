import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/react-NETFLIX-clone-app/" element={<Home />}>
          <Route path="movies/nowplaying/:id" element={<Home />} />
          <Route path="movies/upcoming/:id" element={<Home />} />
          <Route path="movies/toprated/:id" element={<Home />} />
        </Route>
        <Route path="/react-NETFLIX-clone-app/tv/" element={<Tv />}>
          <Route path="airingtoday/:id" element={<Home />} />
          <Route path="toprated/:id" element={<Home />} />
        </Route>
        <Route path="/react-NETFLIX-clone-app/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
