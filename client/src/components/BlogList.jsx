import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { blogCategories, blog_data } from "../assets/assets";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function BlogList() {
    const [menu, setMenu] = useState("All");

    return (
        <div>
            {/* Blog filter menu */}
            <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
                {blogCategories.map((category, index) => (
                    <div key={index} className="relative">
                        <button
                            onClick={() => setMenu(category)}
                            className={`relative cursor-pointer text-gray-500 ${menu === category && "text-white"} rounded-full px-4 py-0.5`}
                        >
                            {category}
                            {menu === category && (
                                <motion.div
                                    layoutId="underline"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                    className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                                ></motion.div>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Blog cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
                {blog_data
                    .filter((blog) => menu === "All" || blog.category === menu)
                    .map((blog) => {
                        return <BlogCard key={blog._id} blog={blog} />;
                    })}
            </div>
        </div>
    );
}

export default BlogList;
