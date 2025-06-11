import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import { Navbar, Footer, Loader } from "../components/index";
import { assets, blog_data, comments_data } from "../assets/assets";
import { useAppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

function Blog() {
    const { axios } = useAppContext();
    const { id } = useParams();
    
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    
    const [formData, setFormData] = useState({
        name: "",
        comment: "",
    });

    async function fetchBlogData() {
        try {
            const { data } = await axios.get(`/blog/${id}`);
            data.success ? setData(data.data) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function fetchComments() {
        try {
            const { data } = await axios.get(`/blog/${id}/comments`);
            data.success ? setComments(data.data) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleFormData(event) {
        const { name, value } = event.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    async function addComment(event) {
        event.preventDefault();
        try {
            const { data } = await axios.post('/comment/create', {
                blog: id,
                content: formData.comment
            }, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });

            if (data.success) {
                toast.success(data.message);
                setFormData({ name: "", comment: "" });
            }    
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    if (!data) return <Loader />;

    return (
        <div className="relative">
            <img
                src={assets.gradientBackground}
                alt=""
                className="absolute -top-50 -z-1 opacity-60"
            />
            <Navbar />

            {/* Introduction section */}
            <div className="text-center mt-20 text-gray-600">
                <p className="text-primary py-4 font-medium">
                    Published on {" "}
                    { Moment(data.createdAt).format("MMMM Do YYYY") }
                </p>
                <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
                    { data.title }
                </h1>
                <h2 className="my-5 max-w-lg truncate mx-auto">
                    { data.subtitle }
                </h2>
                <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
                    { data.author.username }
                </p>
            </div>

            {/* Main blog content section */}
            <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
                <img
                    src={data.image}
                    alt="image"
                    className="rounded-3xl mb-5"
                />
                <div
                    className="rich-text max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>

                {/* Comments section */}
                <div className="mt-14 mb-10 max-w-3xl mx-auto">
                    <p className="font-semibold mb-4">
                        Comments {`(${comments.length})`}
                    </p>
                    <div className="flex flex-col gap-4">
                        {
                            comments.map((comment, index) => {
                                return (
                                    <div key={index}
                                    className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <img
                                                src={assets.user_icon}
                                                alt=""
                                                className="w-6"
                                            />
                                            <p className="font-medium">
                                                { comment.user.username }
                                            </p>
                                        </div>
                                        <p className="text-sm max-w-md ml-8">
                                            { comment.content }
                                        </p>
                                        <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                                            { Moment(comment.createdAt).fromNow() }
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {/* Add Comment section */}
                <div className="max-w-3xl mx-auto">
                    <p className="font-semibold mb-4">Add your comment</p>
                    <form
                        onSubmit={addComment}
                        className="flex flex-col items-start gap-4 max-w-lg"
                    >
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={handleFormData}
                            value={formData.name}
                            className="w-full p-2 border border-gray-300 rounded outline-none"
                        />

                        <textarea
                            name="comment"
                            id="comment"
                            placeholder="Comment..."
                            required
                            onChange={handleFormData}
                            value={formData.comment}
                            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                        ></textarea>

                        <button
                            type="submit"
                            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Share buttons section */}
                <div className="my-24 max-w-3xl mx-auto">
                    <p className="font-semibold my-4">
                        Share this article on social media
                    </p>
                    <div className="flex">
                        <img src={assets.facebook_icon} width={50} alt="" />
                        <img src={assets.twitter_icon} width={50} alt="" />
                        <img src={assets.googleplus_icon} width={50} alt="" />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Blog;
