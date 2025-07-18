import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPostsByTag = async (tag) => {
  const res = await axios.get(`/api/posts${tag ? `?tag=${tag}` : ''}`);
//   return res.data;
  return Array.isArray(res.data) ? res.data : [];
};

const PostList = ({ selectedTag }) => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts', selectedTag],
    queryFn: () => fetchPostsByTag(selectedTag),
    
  });

  if (isLoading) return <p>Loading posts...</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">
        {selectedTag ? `Posts with #${selectedTag}` : 'All Posts'}
      </h3>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white shadow p-4 rounded-lg border">
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                Tags: {post.tags.map((tag) => `#${tag}`).join(', ')}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts found for this tag.</p>
      )}
    </div>
  );
};

export default PostList;
