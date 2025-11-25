import React, { useState } from "react";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";

import postImg from "../../../assets/timeline_img.png";
import people1 from "../../../assets/people1.png";
import people2 from "../../../assets/people2.png";
import people3 from "../../../assets/people3.png";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const PostCard = () => {
    const queryClient = useQueryClient();
    const [commentText, setCommentText] = useState({});
    const [replyText, setReplyText] = useState({});

    const axiosInstance = useAxios();
    // const { user } = useAuth();
   
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosInstance.get("/profile", {
                withCredentials: true,
            });
            return res.data;
        },
    });

    const userId = user?._id;

 
    const { data: posts = [] } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await axiosInstance.get("/allpost", {
                withCredentials: true,
            });
            return res.data;
        },
    });

    // console.log(posts);
    const likeMutation = useMutation({
        mutationFn: async (postId) => {
            return axiosInstance.patch(
                `/posts/like/${postId}`,
                {
                    userId,
                    voteType: "upVote",
                },
                { withCredentials: true }
            );
        },
        onSuccess: () => queryClient.invalidateQueries(["post"]),
    });

  
    const handleComment = async (postId) => {
        if (!commentText[postId]) return;

        await axiosInstance.post(
            `/posts/comment/${postId}`,
            { text: commentText[postId] },
            { withCredentials: true }
        );

        setCommentText({ ...commentText, [postId]: "" });
        queryClient.invalidateQueries(["post"]);
    };

    
    const handleReply = async (postId, commentIndex) => {
        if (!replyText[`${postId}-${commentIndex}`]) return;

        await axiosInstance.post(
            `/posts/reply/${postId}/${commentIndex}`,
            { text: replyText[`${postId}-${commentIndex}`] },
            { withCredentials: true }
        );

        setReplyText({
            ...replyText,
            [`${postId}-${commentIndex}`]: "",
        });

        queryClient.invalidateQueries(["post"]);
    };

    return (
        <div className="w-full max-w-xl mx-auto    mb-6">
            {posts.map((post) => (
                <div key={post._id} className=" rounded-2xl bg-white mb-6">
                    
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={people1}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-sm font-semibold text-gray-800">
                                    {post.authorName}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    6 minutes ago · Public
                                </p>
                            </div>
                        </div>

                        <FiMoreHorizontal size={22} className="text-gray-500" />
                    </div>

                    {/* Post Text */}
                    <p className="px-4 text-sm text-gray-700 mb-3">{post.text}</p>

                    {/* Post Image */}
                    {post.image && (
                        <img
                            src={post.image}
                            alt="content"
                            className="w-full max-h-[350px] object-cover"
                        />
                    )}

                    {/* Reaction bar */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center -space-x-1">
                            <img src={people1} className=" w-10 rounded-full" />
                            <img src={people2} className=" w-10 rounded-full" />
                            <img src={people3} className=" w-10 rounded-full" />
                        </div>
                        <div className="text-sm text-gray-500">120 shares</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm">
                        <button
                            onClick={() => likeMutation.mutate(post._id)}
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg"
                        >
                            <AiOutlineLike size={19} />
                            {post.likeCount || 0} Like
                        </button>

                        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg">
                            <FaRegComment size={18} /> Comment
                        </button>

                        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg">
                            <RiShareForwardLine size={20} /> Share
                        </button>
                    </div>

                    {/* Comment Input */}
                    <div className="px-4 py-3">
                        <input
                            type="text"
                            placeholder="Write a comment"
                            className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                            value={commentText[post._id] || ""}
                            onChange={(e) =>
                                setCommentText({
                                    ...commentText,
                                    [post._id]: e.target.value,
                                })
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleComment(post._id)
                            }
                        />
                    </div>

                    {/* Comments Display */}
                    {post.comments?.map((cmt, cIndex) => (
                        <div key={cIndex} className="px-4 py-2">
                            <div className="flex items-start gap-3">
                                <img
                                    src={people1}
                                    className="w-9 h-9 rounded-full"
                                />
                                <div>
                                    <div className="bg-gray-100 rounded-xl px-3 py-2 max-w-[80%]">
                                        <p className="text-sm text-gray-800">
                                            {cmt.text}
                                        </p>
                                    </div>

                                    {/* Replies */}
                                    {cmt.replies?.map((reply, rIndex) => (
                                        <div
                                            key={rIndex}
                                            className="flex items-start gap-2 mt-2 ml-8"
                                        >
                                            <img
                                                src={people2}
                                                className="w-7 h-7 rounded-full"
                                            />
                                            <div className="bg-gray-100 rounded-xl px-3 py-1 max-w-[70%]">
                                                <p className="text-xs text-gray-700">
                                                    {reply.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Reply input */}
                                    <div className="ml-8 mt-2">
                                        <input
                                            type="text"
                                            placeholder="Write a reply"
                                            className="w-full bg-gray-100 rounded-full px-3 py-1 text-xs outline-none"
                                            value={
                                                replyText[`${post._id}-${cIndex}`] || ""
                                            }
                                            onChange={(e) =>
                                                setReplyText({
                                                    ...replyText,
                                                    [`${post._id}-${cIndex}`]: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                handleReply(post._id, cIndex)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PostCard;
