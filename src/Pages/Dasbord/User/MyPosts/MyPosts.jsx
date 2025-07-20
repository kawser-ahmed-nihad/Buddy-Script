import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import {
    FaRegFileAlt,
    FaThumbsUp,
    FaThumbsDown,
    FaCommentDots,
    FaTrashAlt,
    FaSyncAlt,
} from 'react-icons/fa';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const {
        data: posts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/posts?authorEmail=${encodeURIComponent(user?.email)}`);
            return res.data.posts;
        },
        enabled: !!user?.email,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/api/posts/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Post has been deleted.', 'success');
            queryClient.invalidateQueries(['myPosts', user?.email]);
        },
        onError: () => {
            Swal.fire('Error!', 'Could not delete the post.', 'error');
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <p className="text-center text-gray-600">Loading posts...</p>;

    return (
        <div className="max-w-7xl mx-auto md:px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Posts</h2>
            </div>

            <div className="overflow-x-auto rounded-lg ">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="text-left px-4 py-2">Title</th>
                            <th className="text-center px-4 py-2">Votes</th>
                            <th className="text-center px-4 py-2">Comments</th>
                            <th className="text-center px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id} className="border-t hover:bg-gray-50 transition">
                                <td className="px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <FaRegFileAlt className="text-indigo-600" />
                                    <span>{post.title}</span>
                                </td>
                                <td className="text-center px-4 py-2">
                                    <div className="flex justify-center gap-3">
                                        <span className="flex items-center text-green-600 gap-1">
                                            <FaThumbsUp /> {post.upVote}
                                        </span>
                                        <span className="flex items-center text-red-500 gap-1">
                                            <FaThumbsDown /> {post.downVote}
                                        </span>
                                    </div>
                                </td>
                                <td className="text-center px-4 py-2">
                                    <Link
                                        to={`/dashboard/comments/${post._id}`}
                                        className="btn btn-sm btn-info text-white gap-1"
                                    >
                                        <FaCommentDots />
                                        {post.commentCount || 0}
                                    </Link>
                                </td>
                                <td className="text-center px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="btn btn-sm btn-error text-white gap-1"
                                    >
                                        <FaTrashAlt />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPosts;
