import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Blog } from "./pages/index";
import { Layout, Dashboard, AddBlog, ListBlogs, Comments } from "./admin/index";
import { Login } from "./components/admin/index";
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from "./contexts/AppContext";

function App() {
    const { token } = useAppContext();

    return (
        <div>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/user" element={token ? <Layout /> : <Login />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-blog" element={<AddBlog />} />
                    <Route path="list-blog" element={<ListBlogs />} />
                    <Route path="comments" element={<Comments />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
