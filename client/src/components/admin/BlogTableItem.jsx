import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../contexts/AppContext";
import toast from "react-hot-toast";

function BlogTableItem({ blog, fetchBlogs, index }) {
    const { axios } = useAppContext();
    const { title, createdAt } = blog;
    const blogDate = new Date(createdAt);

    async function deleteBlog() {
        const confirm = window.confirm('Are you sure you want to delete this blog?');
        if(!confirm) return;
        try {
            const { data } = await axios.delete(`/blog/delete/${blog._id}`);
            console.log(data);
            if(data.success) {
                toast.success(data.message);
                await fetchBlogs();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function togglePublish() {
        try {
            const { data } = await axios.patch(`/blog/toggle-publish/${blog._id}`);
            console.log(data);
            if(data.success) {
                toast.success(data.message);
                await fetchBlogs();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <tr className="border-y border-gray-300">
            <th className="px-2 py-4"> { index } </th>
            <td className="px-2 py-4"> { title } </td>
            <td className="px-2 py-4 max-sm:hidden"> { blogDate.toDateString() } </td>
            <td className="px-2 py-4 max-sm:hidden">
                <p className={`${ blog.isPublished ? "text-green-600" : "text-orange-700" }`}>
                    { blog.isPublished ? "Published" : "Unpublished" }
                </p>
            </td>
            <td className="px-2 py-4 flex text-xs gap-3">
                <button onClick={togglePublish}
                className={`border py-0.5 mt-1 rounded cursor-pointer ${ blog.isPublished ? "px-2": "px-4" }`}>
                    { blog.isPublished ? "Unpublish" : "Publish" }
                </button>
                <img
                    src={ assets.cross_icon } alt=""
                    onClick={deleteBlog}
                    className="w-8 hover:scale-110 transition-all cursor-pointer"
                />
            </td>
        </tr>
    );
}

export default BlogTableItem;
