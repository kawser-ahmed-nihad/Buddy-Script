import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const useTags = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/tags');

      return res.data.map(tag => ({
        value: tag.tagName,
        label: tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1),
      }));
    },
  });
};

const AddPost = ({ userPosts = [] }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log("User:", user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { data: tagOptions = [], isLoading } = useTags();

  const isBronze = user?.status === 'bronze';
  const postLimitReached = isBronze && userPosts.length >= 5;

  const onSubmit = async (data) => {
    const postData = {
      authorImg: user.photoURL,
      authorName: user.displayName,
      authorEmail: user.email,
      title: data.title,
      description: data.description,
      tag: data.tag?.value || '',
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/api/posts', postData);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Post added successfully', 'success');
        reset();
      }
    } catch (error) {
      console.error('Post submission failed:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white  rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6  ">
        Add a New Post
      </h2>

      {postLimitReached ? (
        <div className="text-center">
          <p className="text-red-500 font-medium">Bronze users can add up to 5 posts only.</p>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
            Become a Gold Member
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


          <div>
            <label className="block text-gray-700 mb-1">Author Image</label>
            <input
              type="text"
              value={user.photoURL || ''}
              readOnly
              className="w-full px-4 py-2 rounded border  text-black cursor-not-allowed"
            />
          </div>


          <div>
            <label className="block text-black  mb-1">Author Name</label>
            <input
              type="text"
              value={user.displayName || ''}
              readOnly
              className="w-full px-4 py-2 rounded border  cursor-not-allowed"
            />
          </div>


          <div>
            <label className="block text-black  mb-1">Author Email</label>
            <input
              type="email"
              value={user.email || ''}
              readOnly
              className="w-full px-4 py-2 rounded border  cursor-not-allowed"
            />
          </div>


          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Post Title"
            className="w-full px-4 py-2 rounded border "
          />
          {errors.title && <p className="text-red-500">Title is required</p>}


          <textarea
            {...register('description', { required: true })}
            placeholder="Post Description"
            className="w-full px-4 py-2 rounded border "
            rows="4"
          />
          {errors.description && <p className="text-red-500">Description is required</p>}


          <Controller
            name="tag"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                placeholder="Select a Tag"
                isLoading={isLoading}
              />
            )}
          />
          {errors.tag && <p className="text-red-500">Tag is required</p>}

          <button
            type="submit"
            className="w-full bg-[#cc5429] hover:bg-[#e35b2c] text-white transition font-semibold py-2 rounded"
          >
            Submit Post
          </button>
        </form>
      )}
    </div>
  );
};

export default AddPost;
