import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AddTags = () => {
    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/api/tags', data);

            if (res.data.insertedId) {
                Swal.fire('✅ Added!', 'Tag has been added.', 'success');
                reset();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire('⚠️ Duplicate!', error.response.data.message, 'warning');
            } else {
                console.error(error);
                Swal.fire('❌ Error!', 'Failed to add tag.', 'error');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-4">Add New Tag</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("tagName", { required: true })}
                    type="text"
                    placeholder="Enter tag name"
                    className="w-full px-4 py-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-[#cc5429] text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Add Tag
                </button>
            </form>
        </div>
    );
};

export default AddTags;
