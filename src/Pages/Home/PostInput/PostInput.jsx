import { Camera, Video, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import photo from '../../../assets/people1.png';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';

const PostInput = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const axiosInstance = useAxios();

    const { data: user, } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosInstance.get("/profile", {
                withCredentials: true,
            });
            return res.data;
        },
    });

    // console.log(user);


    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        if (!data.text && !file) return alert('Add text or image');
        if (!user.name && !user.email) return alert('Unauthorized');

        setLoading(true);
        try {
            let imageUrl = null;

            // Upload to Cloudinary if file exists
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append(
                    "upload_preset",
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                );

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const dataRes = await res.json();
                imageUrl = dataRes.secure_url; // Cloudinary image URL
            }

            // Send post data to backend
            await axiosInstance.post(
                '/posts',
                {
                    text: data.text, image: imageUrl, upVote: 0,
                    downVote: 0, authorName: user.name,
                    authorEmail: user.email,
                },
                { withCredentials: true }
            );

            toast.success('Post created!');
            reset();
            setFile(null);
            setPreview(null);

        } catch (err) {
            console.error(err);
            alert('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);

        // Show image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-sm mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-3 mb-4 border-b pb-4 border-gray-200">
                    <img
                        src={photo}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <textarea
                        {...register('text')}
                        rows="4"
                        className="w-full mt-2 p-2 bg-transparent rounded resize-none outline-none"
                        placeholder="Enter your message"
                    ></textarea>
                </div>

                {preview && (
                    <div className="mb-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full max-h-64 object-cover rounded"
                        />
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                        <label className="flex items-center space-x-1 p-4 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <Camera className="w-5 h-5 text-gray-500" />
                            <span>Photo</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        {renderAction('Video', <Video className="w-5 h-5 text-gray-500" />)}
                        {renderAction('Event', <Calendar className="w-5 h-5 text-gray-500" />)}
                        {renderAction('Article', <FileText className="w-5 h-5 text-gray-500" />)}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150"
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const renderAction = (label, icon) => (
    <button
        type="button"
        className="flex items-center space-x-1 p-4 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default PostInput;
