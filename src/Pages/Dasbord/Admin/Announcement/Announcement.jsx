import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const Announcement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

 
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            authorImg: user?.photoURL || '',
            authorName: user?.displayName || '',
            email: user?.email || '',
            title: '',
            description: ''
        }
    });

    const mutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/api/announcements', data),
        onSuccess: () => {
            Swal.fire('Success', 'Announcement created successfully', 'success');
            reset({
                authorImg: user?.photoURL || '',
                authorName: user?.displayName || '',
                email: user?.email || '',
                title: '',
                description: ''
            });
            queryClient.invalidateQueries(['announcements']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to create announcement', 'error');
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block mb-1 font-semibold">Author Image URL (readonly)</label>
                    <input
                        type="text"
                        {...register('authorImg')}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Author Name (readonly)
                    </label>
                    <input
                        type="text"
                        {...register('authorName')}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Email (readonly)
                    </label>
                    <input
                        type="email"
                        {...register('email')}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={5}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || mutation.isLoading}
                    className="btn btn-primary"
                >
                    {isSubmitting || mutation.isLoading ? 'Submitting...' : 'Submit Announcement'}
                </button>
            </form>
        </div>
    );
};

export default Announcement;
