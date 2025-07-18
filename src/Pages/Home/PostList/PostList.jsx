import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchPosts = async ({ queryKey }) => {
  const [_key, selectedTag, popular, page] = queryKey;
  let url = `/api/posts?page=${page}&limit=5`;

  if (selectedTag) url += `&tag=${selectedTag}`;
  if (popular) url += `&sort=popular`;

  const res = await axios.get(url);
  return res.data;
};

const PostList = ({ selectedTag }) => {
  const [page, setPage] = useState(1);
  const [popular, setPopular] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ['posts', selectedTag, popular, page],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;

  const posts = data.posts || [];
  const totalPages = data.totalPages || 1;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {selectedTag ? `Posts with #${selectedTag}` : 'All Posts'}
        </h3>
        <button
          onClick={() => setPopular(!popular)}
          className="px-4 py-2 border rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          Sort by Popularity
        </button>
      </div>

      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="bg-white shadow p-4 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <img src={post.authorImage} alt="Author" className="w-8 h-8 rounded-full" />
                <span className="text-sm text-gray-600">{post.authorName}</span>
                <span className="text-xs text-gray-400 ml-auto">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p className="text-gray-700 mt-1">{post.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Tags: {post.tags.map((tag) => `#${tag}`).join(', ')}
              </p>
              <div className="mt-2 text-sm text-gray-600 flex gap-4">
                <span>Comments: {post.commentsCount || 0}</span>
                <span>Total Vote: {post.upVote - post.downVote}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts found for this tag.</p>
      )}

      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages).keys()].map((p) => (
          <button
            key={p + 1}
            onClick={() => setPage(p + 1)}
            className={`px-3 py-1 border rounded ${page === p + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {p + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
