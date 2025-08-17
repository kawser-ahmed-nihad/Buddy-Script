import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaMedal, FaThumbsUp, FaThumbsDown, FaComments } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const fetchUser = async (axiosSecure, email) => {
  const res = await axiosSecure.get(`/api/users?email=${encodeURIComponent(email)}`);
  return res.data[0];
};

const fetchPosts = async (axiosSecure, authorEmail, limit = 3) => {
  const res = await axiosSecure.get(`/api/logged/posts?authorEmail=${encodeURIComponent(authorEmail)}&limit=${limit}`);
  return res.data.posts;
};

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const MyProfile = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const userEmail = authUser?.email;

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user', userEmail],
    queryFn: () => fetchUser(axiosSecure, userEmail),
    enabled: !!userEmail,
  });

  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['posts', userEmail],
    queryFn: () => fetchPosts(axiosSecure, userEmail),
    enabled: !!userEmail,
  });

  if (userLoading || postsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading user data</p>;
  if (postsError) return <p>Error loading posts</p>;

  if (!user) return <p>User not found</p>;

  const showBronze = user.status === 'bronze';
  const showGold = user.status === 'gold';

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photo || user.image}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-[#cc5429]"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="mt-4 flex items-center gap-4">
            {showBronze && (
              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm shadow-sm">
                <FaMedal className="text-yellow-500" />
                Bronze Badge
              </div>
            )}
            {showGold && (
              <div className="flex items-center gap-2 bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-sm shadow-sm">
                <FaMedal className="text-yellow-800" />
                Gold Badge
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Posts</h3>
        {posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li
                key={post._id}
                className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-bold text-[#cc5429]">{post.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  #{post.tag} • {formatDistanceToNow(new Date(post.createdAt))} ago
                </p>
                <p className="text-gray-700 mb-3">{truncate(post.description, 120)}</p>
                <div className="flex items-center gap-6 text-gray-700 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <FaThumbsUp className="text-green-600" />
                    <span>{post.upVote}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaThumbsDown className="text-red-600" />
                    <span>{post.downVote}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComments className="text-blue-600" />
                    <span>{post.commentCount || 0}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
