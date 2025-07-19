import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaThumbsUp, FaThumbsDown, FaComment, FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton } from 'react-share';
import Modal from 'react-modal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

Modal.setAppElement('#root'); 

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [voteStatus, setVoteStatus] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCommentText, setModalCommentText] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch post data
  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/posts/${id}`);
      return res.data;
    },
  });

  // Fetch comments data
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/comments?postId=${id}`);
      return res.data;
    },
  });

  // Set user vote status on load
  useEffect(() => {
    if (post && user) {
      const userVote = post.votes?.find(v => v.userId === user.email);
      if (userVote) {
        setVoteStatus(userVote.voteType === 'upVote' ? 'upvote' : 'downvote');
      } else {
        setVoteStatus(null);
      }
    }
  }, [post, user]);

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ voteType, userId }) =>
      axiosSecure.patch(`/api/posts/${id}/vote`, { voteType, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });

  // Comment mutation
  const commentMutation = useMutation({
    mutationFn: async (commentData) => axiosSecure.post('/api/comments', commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      reset();
    },
  });

  if (postLoading || commentsLoading) return <p className="text-center">Loading...</p>;
  if (!post) return <p className="text-center">Post not found</p>;

  // Handle vote click with login check
  const handleVote = (type) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (voteStatus === type) {
      // Unvote
      voteMutation.mutate({ voteType: null, userId: user.email });
      setVoteStatus(null);
    } else {
      const voteType = type === 'upvote' ? 'upVote' : 'downVote';
      voteMutation.mutate({ voteType, userId: user.email });
      setVoteStatus(type);
    }
  };

  // Submit comment handler with login check
  const onSubmit = (data) => {
    if (!user) {
      navigate('/login');
      return;
    }

    commentMutation.mutate({
      postId: id,
      userEmail: user.email,
      userName: user.displayName,
      userImg: user.photoURL,
      comment: data.comment,
      createdAt: new Date().toISOString(),
    });
  };

  // Open modal for big comment
  const handleOpenModal = (text) => {
    setModalCommentText(text);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  // Show truncated comment with "Show more"
  const renderCommentText = (text) => {
    const maxLength = 150;
    if (text.length > maxLength) {
      return (
        <>
          {text.slice(0, maxLength)}...
          <button
            onClick={() => handleOpenModal(text)}
            className="text-blue-600 underline ml-2"
          >
            Show more
          </button>
        </>
      );
    }
    return text;
  };

  const shareUrl = `${window.location.origin}/post/${id}`;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={post.authorImg}
          alt={post.authorName}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-bold">{post.authorName}</h2>
          <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-800 dark:text-gray-300 mb-4">{post.description}</p>
      <p className="text-blue-600 font-semibold mb-4">#{post.tag}</p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={() => handleVote('upvote')}
          disabled={voteMutation.isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            voteStatus === 'upvote' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-800'
          }`}
        >
          <FaThumbsUp />
          <span>{post.upVote}</span>
        </button>

        <button
          onClick={() => handleVote('downvote')}
          disabled={voteMutation.isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            voteStatus === 'downvote' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-800'
          }`}
        >
          <FaThumbsDown />
          <span>{post.downVote}</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800">
          <FaComment />
          <span>{comments.length}</span>
        </div>

        <FacebookShareButton url={shareUrl} quote={post.title}>
          <button className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            <FaShareAlt />
            <span>Share</span>
          </button>
        </FacebookShareButton>
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Comments ({comments.length})</h3>

        {user ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register('comment', { required: 'Comment is required' })}
              className="w-full border p-2 rounded resize-none mb-2"
              rows={3}
              placeholder="Write your comment..."
            />
            {errors.comment && <p className="text-red-600 mb-2">{errors.comment.message}</p>}
            <button
              type="submit"
              disabled={commentMutation.isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Comment
            </button>
          </form>
        ) : (
          <p className="text-red-600">
            Please{' '}
            <button onClick={() => navigate('/login')} className="underline">
              login
            </button>{' '}
            to comment, vote, and share.
          </p>
        )}
      </div>

      {/* Comments List */}
      <ul className="space-y-4">
        {comments.map((c) => (
          <li
            key={c._id}
            className="border p-3 rounded bg-gray-50 dark:bg-gray-800 flex items-start gap-3"
          >
            <img
              src={c.userImg || '/default-user.png'}
              alt={c.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{c.userName}</p>
              <p
                className="text-gray-700 dark:text-gray-300 cursor-pointer"
                onClick={() => handleOpenModal(c.comment)}
              >
                {renderCommentText(c.comment)}
              </p>
              <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Comment Details"
        className="max-w-xl mx-auto mt-20 bg-white p-6 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
      >
        <h2 className="text-xl font-bold mb-4">Full Comment</h2>
        <p className="mb-6 whitespace-pre-wrap">{modalCommentText}</p>
        <button
          onClick={closeModal}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PostDetails;
