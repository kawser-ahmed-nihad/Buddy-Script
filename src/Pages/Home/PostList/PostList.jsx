import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const fetchPosts = async (axiosSecure, selectedTag, popular, page, searchTerm) => {
  let url = `/api/posts?page=${page}&limit=5`;
  if (selectedTag) url += `&tag=${selectedTag}`;
  if (popular) url += `&sort=popular`;
  if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
  const res = await axiosSecure.get(url);
  return res.data;
};

const PostList = ({ selectedTag, searchTerm }) => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [popular, setPopular] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [selectedTag, searchTerm]);

  const { data = {}, isLoading } = useQuery({
    queryKey: ['posts', selectedTag, popular, page, searchTerm],
    queryFn: () => fetchPosts(axiosSecure, selectedTag, popular, page, searchTerm),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading posts...</p>;

  const posts = data.posts || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="mt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {searchTerm
            ? `Search results for "${searchTerm}"`
            : selectedTag
            ? `Posts with #${selectedTag}`
            : 'All Topics'}
        </h3>
        <button
          onClick={() => setPopular(!popular)}
          className="px-4 py-2 border rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          {popular ? 'Sort by Latest' : 'Sort by Popularity'}
        </button>
      </div>

      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={post.authorImg || 'https://via.placeholder.com/50'}
                  alt="Author"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{post.authorName}</h4>
                  <p className="text-xs text-gray-400">Offline</p>
                </div>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">#{post.tag}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                <p className="text-gray-700 mt-1">{post.description?.slice(0, 200)}...</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                <span className="flex items-center gap-1">
                  <FaCommentDots /> {post.commentCount || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaThumbsUp /> {post.upVote || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaThumbsDown /> {post.downVote || 0}
                </span>
                <Link
                  to={`/posts/${post._id}`}
                  className="ml-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          {searchTerm
            ? `No results found for "${searchTerm}".`
            : `No posts found${selectedTag ? ` for #${selectedTag}` : ''}.`}
        </p>
      )}

      <div className="flex justify-center gap-2 mt-10">
        {[...Array(totalPages).keys()].map((p) => (
          <button
            key={p + 1}
            onClick={() => setPage(p + 1)}
            className={`px-3 py-1 border rounded ${
              page === p + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {p + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
