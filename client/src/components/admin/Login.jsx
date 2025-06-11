import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import toast from "react-hot-toast";

function Login() {
    const { axios, setToken } = useAppContext();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleFormData(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { data } = await axios.post('/user/login', formData, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
            
            if(data.success) {
                setToken(data.data.token);
                localStorage.setItem('token', data.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full py-6 text-center">
                        <h1 className="text-3xl font-bold">
                            <span className="text-primary">User</span> Login
                        </h1>
                        <p className="font-light">
                            Enter your credentials to access <br /> the dashboard panel
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full mt-6 sm:max-w-md text-gray-600"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="your email id"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormData}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="your password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormData}
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <button
                            className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
