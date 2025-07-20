import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const feedbackOptions = [
    "Offensive language",
    "Spam content",
    "Irrelevant comment"
];

const CommentsDetails = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [modalComment, setModalComment] = useState(null);
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reportedComments, setReportedComments] = useState({});

    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/comments/${postId}`);
            return res.data.comments;
        }
    });




    const reportMutation = useMutation({
        mutationFn: async ({ commentId, feedback, commentText, commenterEmail }) => {
            return axiosSecure.post('/api/reports', {
                postId,
                commentId,
                feedback,
                commentText,
                commenterEmail,
                email: user.email,
                reportedAt: new Date()
            });
        },
        onSuccess: () => {
            Swal.fire('Reported!', 'Comment has been reported.', 'success');
        },
        onError: () => {
            Swal.fire('Error', 'Could not report the comment.', 'error');
        }
    });

    const handleFeedbackChange = (commentId, value) => {
        setSelectedFeedback({ ...selectedFeedback, [commentId]: value });
    };

    const handleReport = (comment) => {
        reportMutation.mutate({
            commentId: comment._id,
            feedback: selectedFeedback[comment._id],
            commentText: comment.comment,
            commenterEmail: comment.userEmail

        });
        setReportedComments({ ...reportedComments, [comment._id]: true });
    };


    if (isLoading) return <p className="text-center">Loading comments...</p>;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => {
                            const text = comment?.comment || "";
                            const isLong = text.length > 20;
                            const trimmedText = isLong ? `${text.slice(0, 20)}...` : text;

                            return (
                                <tr key={comment._id}>
                                    <td>{comment.userEmail}</td>
                                    <td>
                                        {trimmedText}
                                        {isLong && (
                                            <button
                                                className="ml-2 text-blue-600 underline"
                                                onClick={() => setModalComment(text)}
                                            >
                                                Read More
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm"
                                            value={selectedFeedback[comment._id] || ""}
                                            onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                        >
                                            <option value="" disabled>Select feedback</option>
                                            {feedbackOptions.map((opt, idx) => (
                                                <option key={idx} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-xs btn-warning text-white"
                                            disabled={
                                                !selectedFeedback[comment._id] || reportedComments[comment._id]
                                            }
                                            onClick={() => handleReport(comment)}
                                        >
                                            {reportedComments[comment._id] ? 'Reported' : 'Report'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={!!modalComment}
                onRequestClose={() => setModalComment(null)}
                contentLabel="Full Comment"
                className="modal-box"
                overlayClassName="modal-overlay"
            >
                <h3 className="text-lg font-bold mb-2">Full Comment</h3>
                <p>{modalComment}</p>
                <div className="mt-4 text-right">
                    <button className="btn btn-sm btn-error" onClick={() => setModalComment(null)}>
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CommentsDetails;
