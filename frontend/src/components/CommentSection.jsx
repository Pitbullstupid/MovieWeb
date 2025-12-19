import React, { useEffect, useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Reply, MoreHorizontal, ChevronDown, SendHorizonal, CircleX } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faInfinity } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-responsive-modal';
import LoginForm from './LoginForm';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import InputComment from './InputComment';

const CommentSection = ({ user }) => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'kim chi',
            avatar: 'https://i.pinimg.com/1200x/3f/7b/ce/3f7bcec34c71ffecb3430ecb24d6fa1a.jpg',
            isPremium: '2026-11-19T10:13:34.357Z',
            time: '3 giờ trước',
            content: 'nói chung là cố cảnh nặc ko ae đê t còn xem',
            likes: 0,
            dislikes: 0,
            userLiked: false,
            userDisliked: false,
            replies: [],
        },
        {
            id: 2,
            author: 'Hazzie410',
            avatar: 'https://i.pinimg.com/736x/b6/e6/5a/b6e65a20e4d32c9a6f984d2d699ed2e1.jpg',
            isPremium: '2025-11-19T10:13:34.357Z',
            time: '2 ngày trước',
            content: 'Dicimi đã đọc cmt trước khi xem r, thấy chê dữ làm mà t vẫn cắm đầu cắm cổ vào xem vì thích nhớ Mckenna Grace & Mason Thames vì cno đẹp đôi ( là người yêu ngoài đời ). Nhưng đúng là phim như cứt chấm tương. Thực sự d thể hiểu nội sao 2025 r còn có kịch bản đơi truy như này? Phim kể về nữ 9 yêu A, nam 9 yêu B. Và 17 năm sau thì A và B cùng die vì cno ngoại tình. Thẩm chí cno ngoại tình rất lâu, đẻ ra đứa con và đổ vô cho nam 9. Đã thế B còn là chị em ruột của nữ 9 => em gái fuck anh chồng. Tiếp đến 2 ông bà nam nữ 9 cũng có vấn đề, thích nhau từ lúc mới người còn đang hẹn hò với A & B, thiếu mới bước fuck nhau. Tui kia die thì 2 đứa này đến với nhau, d hiểu kiểu j? Con gái của nữ 9 thì đi thích tk M ( biết tk này có bỏ r ), mà tk này cx thích lại trong khi đang yêu con khác? Vả r tìm cách ctay ny để đến với con gái của nữ 9. Couple trẻ con này sẽ rất hay nếu d nhồi chí tiết cảm súng ngoại tình ko khác j couple lớn. Thực sự d hiểu phim kiểu j? Biên kịch đậm viết, diễn viên đấm đóng ^^',
            likes: 6,
            dislikes: 0,
            userLiked: false,
            userDisliked: false,
            replies: [],
            showReplies: false,
            replyCount: 3
        }
    ]);
    // Btn Đánh giá || Bình luân
    const [selectedButton, setSelectedButton] = useState("comment");

    const handleReviewClick = () => {
        setSelectedButton("review");
        toast.info("Tính năng đang phát triển:(((")
        setTimeout(() => {
            setSelectedButton("comment");
        }, 2000);

    };
    // Đăng nhập
    const [openModal, setOpenModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isLogin, setIsLogin] = useState(() => {
        return localStorage.getItem("isLogin") === "true";
    });
    useEffect(() => {
        localStorage.setItem("isLogin", isLogin);
    }, [isLogin]);
    useEffect(() => {
        const id = localStorage.getItem("userId");
        if (id) setUserId(id);
    }, [isLogin, openModal]);

    // Trả lời bình luận 
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyComment, setReplyComment] = useState('');

    const handleSendReply = (commentId) => {
        if (!isLogin) {
            toast.error("Vui lòng đăng nhập để bình luận!")
            setOpenModal(true);
            return
        }
        if (!replyComment.trim()) {
            toast.error("Vui lòng nhập bình luận!")
            return
        }
        setReplyComment('');
        setReplyingTo(null);
    }
    const handleReplyToggle = (commentId) => {
        setReplyingTo(replyingTo === commentId ? null : commentId);
        setReplyComment('');
    };

    // Bình luận mới
    const [newComment, setNewComment] = useState('');

    const handleSend = () => {
        if (!isLogin) {
            toast.error("Vui lòng đăng nhập để bình luận!")
            setOpenModal(true);
            return
        }
        if (!newComment.trim()) {
            toast.error("Vui lòng nhập bình luận!")
            return
        }

    }

    // Handle like
    const handleLike = (commentId) => {
        setComments(prev =>
            prev.map(comment => {
                if (comment.id === commentId) {
                    // Nếu đã like : bỏ like
                    if (comment.userLiked) {
                        return {
                            ...comment,
                            likes: comment.likes - 1,
                            userLiked: false
                        };
                    }
                    // Nếu đang dislike : bỏ dislike + thêm like
                    if (comment.userDisliked) {
                        return {
                            ...comment,
                            dislikes: comment.dislikes - 1,
                            likes: comment.likes + 1,
                            userDisliked: false,
                            userLiked: true
                        };
                    }
                    // Chưa like: thêm like
                    return {
                        ...comment,
                        likes: comment.likes + 1,
                        userLiked: true
                    };
                }
                return comment;
            })
        );
    };

    // Handle dislike
    const handleDislike = (commentId) => {
        setComments(prev =>
            prev.map(comment => {
                if (comment.id === commentId) {
                    // Nếu đã dislike : bỏ dislike
                    if (comment.userDisliked) {
                        return {
                            ...comment,
                            dislikes: comment.dislikes - 1,
                            userDisliked: false
                        };
                    }
                    // Nếu đang like : bỏ like + thêm dislike
                    if (comment.userLiked) {
                        return {
                            ...comment,
                            likes: comment.likes - 1,
                            dislikes: comment.dislikes + 1,
                            userLiked: false,
                            userDisliked: true
                        };
                    }
                    // Chưa dislike : thêm dislike
                    return {
                        ...comment,
                        dislikes: comment.dislikes + 1,
                        userDisliked: true
                    };
                }
                return comment;
            })
        );
    };



    return (
        <>
            <div className="w-full max-w-4xl  text-white p-6 rounded-lg">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Bình luận (76)</h2>
                    <div className="flex bg-[#1e1e1e] border border-[#3a3a3a] rounded-md overflow-hidden">
                        <button
                            onClick={() => setSelectedButton("comment")}
                            className={
                                "px-4 py-1.5 text-sm " +
                                (selectedButton === "comment"
                                    ? "bg-white text-black rounded-md"
                                    : "bg-transparent text-white  hover:bg-[#2d2d2d]")
                            }
                        >
                            Bình luận
                        </button>

                        <button
                            onClick={handleReviewClick}
                            className={
                                "px-4 py-1.5 text-sm " +
                                (selectedButton === "review"
                                    ? "bg-white text-black rounded-md"
                                    : "bg-transparent text-white  hover:bg-[#2d2d2d]")
                            }
                        >
                            Đánh giá
                        </button>
                    </div>

                </div>


                {/* Login */}
                {!isLogin ? (
                    <p className="text-[#999] text-sm mb-4">
                        Vui lòng <span className="text-default cursor-pointer" onClick={() => setOpenModal(true)}>đăng nhập</span> để tham gia bình luận.
                    </p>
                ) : (
                    <div className='flex gap-4 items-center mb-4'>
                        <Avatar>
                            <AvatarImage
                                className="cursor-pointer w-10 h-10 rounded-full"
                                src={user?.Avatar || "https://github.com/shadcn.png"}
                            />
                            <AvatarFallback>Avt</AvatarFallback>
                        </Avatar>
                        <div className=''>
                            <p className='text-[#999] text-[12px]'>Bình luận với tên</p>
                            <p className='font-semibold'>{user?.userName}</p>
                        </div>
                    </div>
                )}

                {/* Comment input */}
                <InputComment newComment={newComment} setNewComment={setNewComment} handleSend={handleSend} />
                {/* Comments list */}
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment?.id} className="flex gap-3">
                            <img src={comment?.avatar || "https://github.com/shadcn.png"} className="w-10 h-10 flex-shrink-0 text-2xl rounded-full" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold">{comment?.author}</span>
                                    {/* IsPremium */}
                                    {(comment?.isPremium && new Date(comment?.isPremium) > new Date()) ? (
                                        <FontAwesomeIcon icon={faCrown} className="text-default" />
                                    ) : (
                                        <FontAwesomeIcon icon={faInfinity} className="text-default" />
                                    )}
                                    <span className="text-[#666] text-sm">{comment?.time}</span>
                                </div>
                                <p className="text-[#ddd] text-sm leading-relaxed mb-3">{comment?.content}</p>

                                {/* Action buttons */}
                                <div className="flex items-center gap-4 text-[#999]">
                                    <button
                                        onClick={() => handleLike(comment?.id)}
                                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        {comment.likes > 0 && <span className="text-sm">{comment?.likes}</span>}
                                    </button>
                                    <button
                                        onClick={() => handleDislike(comment?.id)}
                                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                                    >
                                        <ThumbsDown className="w-4 h-4" />
                                        {comment?.dislikes > 0 && <span className="text-sm">{comment?.dislikes}</span>}
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-white transition-colors" onClick={() => handleReplyToggle(comment.id)}>
                                        {replyingTo === comment.id ? (
                                            <>
                                                <CircleX className="w-4 h-4" />
                                                <span className="text-sm">Hủy</span>
                                            </>
                                        ) : (
                                            <>
                                                <Reply className="w-4 h-4" />
                                                <span className="text-sm">Trả lời</span>
                                            </>
                                        )}
                                    </button>
                                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                        <span className="text-sm">Thêm</span>
                                    </button>
                                </div>
                                {/* Input reply */}
                                {replyingTo === comment.id && (
                                    <div className="mt-3 max-w-xl">
                                        <InputComment
                                            newComment={replyComment}
                                            setNewComment={setReplyComment}
                                            handleSend={() => handleSendReply(comment.id)}
                                        />
                                    </div>
                                )}

                                {/* Show replies button */}
                                {comment?.replyCount > 0 && (
                                    <button className="flex items-center gap-2 mt-3 text-[#999] hover:text-white transition-colors">
                                        <ChevronDown className="w-4 h-4" />
                                        <span className="text-sm">{comment?.replyCount} bình luận</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} center>
                <div className="w-full flex items-center justify-between ">
                    <img
                        src="/sticker(2).webp"
                        alt=""
                        className="w-[435px] h-[435px]"
                    />
                    <LoginForm
                        setOpenModal={setOpenModal}
                        setIsLogin={setIsLogin}
                        setUserId={setUserId}
                    />
                </div>
            </Modal>
        </>
    );
};

export default CommentSection;