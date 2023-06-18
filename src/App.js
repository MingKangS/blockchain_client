import logo from "./logo.svg";
import "./App.css";
import "./styles/globals.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PostView from "./pages/PostView";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="new-post" element={<NewPost />} />
          <Route path=":postId" element={<PostView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
