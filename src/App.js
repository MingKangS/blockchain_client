import logo from "./logo.svg";
import "./App.css";
import "./styles/globals.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomeView from "./pages/HomeView";
import PostView from "./pages/PostView";
import NewPostView from "./pages/NewPostView";
import ProfileView from "./pages/ProfileView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path="new-post" element={<NewPostView />} />
          <Route path=":username" element={<ProfileView />} />
          <Route path="post/:postId" element={<PostView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
