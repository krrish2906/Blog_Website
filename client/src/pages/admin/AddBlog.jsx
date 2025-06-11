import React, { useState, useRef, useEffect } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../contexts/AppContext'
import toast from 'react-hot-toast';
import { parse } from 'marked'

function AddBlog() {
    const { axios } = useAppContext();
    
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    
    const [isGenerating, setIsGenerating] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        image: '',
        imageFile: null,
        title: '',
        subTitle: '',
        category: 'All',
        isPublished: true 
    })

    async function formHandler(event) {
        const { name, value, files, checked } = event.target;
        if(name === 'image') {
            let file = files[0];
            setFormData((prevState) => ({
                ...prevState,
                image: URL.createObjectURL(file),
                imageFile: file
            }));
            return;
        }
        if(name === 'isPublished') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked
            }));
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value 
        }));
    }

    useEffect(() => {
        // Initiate Quill only once
        if(!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])
    
    async function generateContent() {
        if(!formData.title || formData.title.trim() === '') {
            toast.error('Please enter the title of the blog');
            return;
        }
        try {
            setIsGenerating(true);
            const { data } = await axios.post('/blog/gemini/generate', { prompt: formData.title });
            const blogContent = parse(data.data.candidates[0].content.parts[0].text);

            if (data.success) {
                quillRef.current.root.innerHTML = blogContent;
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsGenerating(false);
        }
    }
    
    async function submitHandler(event) {
        try {
            event.preventDefault();
            setIsAdding(true);

            let { imageFile, ...blogData } = formData;
            blogData = {
                ...blogData,
                content: quillRef.current.root.innerHTML
            }
            
            const blogFormData = new FormData();
            blogFormData.append('blog', JSON.stringify(blogData));
            blogFormData.append('image', imageFile);

            const { data } = await axios.post('/blog/create', blogFormData, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
            
            if(data.success) {
                toast.success(data.message);
                quillRef.current.root.innerHTML = '';
                setFormData({
                    image: '',
                    imageFile: null,
                    title: '',
                    subTitle: '',
                    category: 'All',
                    isPublished: true
                });
            }
            else {
                toast.error(data.error);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsAdding(false);
        }
    }

    return (
        <form
        encType='multipart/form-data'
        onSubmit={submitHandler}
        className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'
        >
            <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
                <p>Upload Thumbnail</p>
                <label htmlFor="image">
                    <img
                        src={formData.image === '' ? assets.upload_area : formData.image}
                        alt=""
                        className='mt-2 h-16 rounded cursor-pointer'
                    />
                    <input
                        type="file"
                        name="image"
                        id="image"
                        hidden required
                        onChange={formHandler}
                    />
                </label>

                <p className='mt-4'>Blog Title:</p>
                <input
                    type="text"
                    placeholder='Type here'
                    name="title" id="title" required
                    className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                    onChange={formHandler}
                    value={formData.title}
                />
                
                <p className='mt-4'>Subtitle:</p>
                <input
                    type="text"
                    placeholder='Type here'
                    name="subTitle" id="subTitle"
                    className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                    onChange={formHandler}
                    value={formData.subTitle}
                />

                <p className='mt-4'>Blog Description:</p>
                <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                    <div ref={editorRef}></div>
                    {
                        isGenerating && (
                            <div
                            className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center transition-all duration-200 bg-primary/10 mt-2'>
                                <div className='w-10 h-10 rounded-full border-3 border-t-primary animate-spin'>
                                </div>
                            </div>
                        )
                    }
                    <button
                        type='button'
                        onClick={generateContent}
                        disabled={isGenerating}
                        className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-primary/90 px-4 py-1.5 rounded hover:underline cursor-pointer hover:bg-primary transition-all duration-100'
                    >
                        { !isGenerating ? "Generate with AI" : "Generating" }
                    </button>
                </div>

                <p className='mt-4'>Blog Category:</p>
                <select
                    name="category" id="category" required
                    onChange={formHandler}
                    className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
                >
                    <option value="All"> Select Category </option>
                    {
                        blogCategories.map((category, index) => (
                            <option key={index} value={category}> { category } </option>
                        ))
                    }
                </select>

                <div className='flex gap-2 mt-4'>
                    <p>Publish Now:</p>
                    <input
                        type="checkbox" required
                        name="isPublished" id="isPublished"
                        className='scale-125 cursor-pointer'
                        checked={formData.isPublished}
                        onChange={formHandler}
                    />
                </div>

                <button type='submit'
                disabled={isAdding}
                className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
                    { isAdding ? 'Adding...' : 'Add Blog' }
                </button>
            </div>
        </form>
    )
}

export default AddBlog