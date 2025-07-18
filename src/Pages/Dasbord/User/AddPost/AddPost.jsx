import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';

const AddPost = ({ user = {}, userPosts = [] }) => {
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const tagOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Education', label: 'Education' },
    { value: 'Health', label: 'Health' },
    { value: 'Entertainment', label: 'Entertainment' },
  ];

  useEffect(() => {
    if (userPosts.length >= 5) {
      setIsLimitExceeded(true);
    }
  }, [userPosts]);

  const onSubmit = (data) => {
    const postData = {
      ...data,
      tag: data.tag?.value || '',
      upVote: 0,
      downVote: 0,
    };
    console.log('Submitted Data:', postData);

    // এখানে API call বা Firebase এ data পাঠাও
    reset();
  };

  if (isLimitExceeded) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500 mb-4">You have reached your post limit (5).</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          placeholder="Author Image URL"
          {...register('authorImg', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.authorImg && <p className="text-red-500">Author image is required</p>}

        <input
          type="text"
          placeholder="Author Name"
          defaultValue={user?.name || ''}
          {...register('authorName', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.authorName && <p className="text-red-500">Author name is required</p>}

        <input
          type="email"
          placeholder="Author Email"
          defaultValue={user?.email || ''}
          {...register('authorEmail', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.authorEmail && <p className="text-red-500">Author email is required</p>}

        <input
          type="text"
          placeholder="Post Title"
          {...register('title', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500">Title is required</p>}

        <textarea
          placeholder="Post Description"
          {...register('description', { required: true })}
          className="w-full p-2 border rounded"
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
            />
          )}
        />
        {errors.tag && <p className="text-red-500">Tag is required</p>}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
