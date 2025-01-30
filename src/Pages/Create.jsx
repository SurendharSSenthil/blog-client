import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../url";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Check if token exists, otherwise redirect to login
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.role !== "A") {
            navigate("/");
        }
        if (!token) {
            navigate("/auth");
        }
    }, [navigate]);

    // Handle post submission
    const handleSubmit = async () => {
        if (!title || !content) {
            alert("Please provide both title and content.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/auth");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${url}/post/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    imageUrl,
                }),
            });

            if (response.ok) {
                navigate(-1);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (err) {
            console.error("Error creating post:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Quill Modules with Full Formatting Options
    const quillModules = {
        toolbar: [
            [
                { font: ["serif", "sans-serif", "monospace"] },
                { size: ["small", "normal", "large", "huge"] },
            ],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    return (
        <div className="w-full mx-auto bg-slate-900 overflow-hidden min-h-screen">
            <Header />
            <div className="shadow-lg md:px-16 md:py-6 p-6">
                <h1 className="md:text-3xl text-2xl poppins font-semibold text-violet-500 text-center my-4">
                    New Blog Post
                </h1>

                {/* Post Title Input */}
                <div className="my-4">
                    <label className="block text-gray-400 mb-2">
                        Post Title
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 rounded-lg bg-slate-800 text-gray-400"
                        placeholder="Enter the title of your post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Image URL Input */}
                <div className="my-4">
                    <label className="block text-gray-400 mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 rounded-lg bg-slate-800 text-white"
                        placeholder="Enter the image URL for your post"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                {/* Rich Text Editor for Post Content */}
                <div className="my-4">
                    <label className="block text-gray-400 mb-2">
                        Post Content
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="bg-white text-black"
                        placeholder="Write your post content here..."
                        modules={quillModules}
                    />
                </div>

                {/* Submit Button */}
                <div className="my-4">
                    <button
                        className={`bg-violet-500 text-white font-semibold hover:bg-violet-600 duration-150 px-4 py-2 rounded-lg mt-2 w-full ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Publishing..." : "Publish Post"}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreatePost;
