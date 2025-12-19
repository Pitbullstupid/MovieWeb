import React from 'react'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { SendHorizonal } from 'lucide-react'

const InputComment = ({ newComment, setNewComment, handleSend}) => {
    return (
        <div className="mb-6 bg-[#1e2128] rounded-lg border border-[#2a2d3a] overflow-hidden">
            <div className="relative">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận"
                    className="w-full bg-transparent p-4 text-sm text-white placeholder-[#5a5d6a] resize-none focus:outline-none min-h-[120px]"
                    maxLength={1000}
                />
                <span className="absolute top-4 right-4 text-sm text-[#5a5d6a]">
                    {newComment.length} / 1000
                </span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-[#181b22] border-t border-[#2a2d3a]">
                <div className="flex items-center gap-2">
                    <Switch id="anonymous" />
                    <Label htmlFor="anonymous">Ẩn danh ?</Label>
                </div>
                <button className="px-6 py-2  font-bold rounded-md flex items-center gap-2 text-default" onClick={handleSend}>
                    <p>Gửi</p>
                    <SendHorizonal />
                </button>
            </div>

        </div>

    )
}

export default InputComment
