import { Camera, Video, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import photo from '../../../assets/people1.png';

const PostInput = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const axiosInstance = useAxios();
    const { register, handleSubmit, reset } = useForm();

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosInstance.get('/profile', { withCredentials: true });
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        if (!data.text && !file) return toast.error('Add text or image');

        setLoading(true);
        try {
            let imageUrl = null;

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append(
                    'upload_preset',
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                );

                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: formData }
                );

                const dataRes = await uploadRes.json();
                imageUrl = dataRes.secure_url;
            }

            await axiosInstance.post(
                '/posts',
                {
                    text: data.text,
                    image: imageUrl,
                    upVote: 0,
                    downVote: 0,
                    authorName: user?.name,
                    authorEmail: user?.email,
                },
                { withCredentials: true }
            );

            toast.success('Post created!');
            reset();
            setFile(null);
            setPreview(null);

        } catch (error) {
            console.error(error);
            toast.error('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="p-3 sm:p-4 bg-white rounded shadow-sm mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Text Input Row */}
                <div className="flex items-start space-x-3 mb-4 border-b pb-3 border-gray-200">
                    <img
                        src={photo}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <textarea
                        {...register('text')}
                        rows="3"
                        className="w-full p-2 bg-transparent rounded resize-none outline-none text-sm sm:text-base"
                        placeholder="What's on your mind?"
                    ></textarea>
                </div>

                {/* Preview Image */}
                {preview && (
                    <div className="mb-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full max-h-64 object-cover rounded"
                        />
                    </div>
                )}

                {/* Actions + Post Button */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <label className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
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

                    {/* Post Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
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
        className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default PostInput;
