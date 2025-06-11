import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {

    // States:-
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    // Hooks:-
    const navigate = useNavigate();

    // Functions:-
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/blogs');
            data.success ? setBlogs(data.data) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // UseEffect():-
    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [])

    // value to return:-
    const value = {
        axios, navigate,
        token, setToken,
        blogs, setBlogs,
        input, setInput
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}