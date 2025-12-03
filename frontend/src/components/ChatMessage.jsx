import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const ChatMessage = ({ chat, movies, userList }) => {
  const isUser = chat.role === "user"
  const isBot = chat.role === "model"
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);
  const user = userList?.find((u) => u._id === userId);
  // Avatar mini
  const userAvatar = user?.Avatar;
  const botAvatar = "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg"

  // Render "Thinking..."
  if (chat.text === "Thinking...") {
    return (
      <div className="w-full flex justify-start my-3">
        <img src={botAvatar} className="w-8 h-8 rounded-full mr-3" />
        <div className="px-4 py-2 bg-[#1F1F1F] rounded-2xl text-blue-400 flex items-center gap-2">
          <span className="loading-dots">Đang suy nghĩ...</span>
        </div>
      </div>
    )
  }

  let parsedTexts = []
  if (typeof chat.text === "string") {
    const regex = /```json([\s\S]*?)```/g
    let match
    while ((match = regex.exec(chat.text)) !== null) {
      try {
        const json = JSON.parse(match[1].trim())
        if (Array.isArray(json)) parsedTexts.push(...json)
        else parsedTexts.push(json)
      } catch { }
    }
  }

  const formattedText = parsedTexts.length === 0 ? chat.text : null

  return (
    <div className={`w-full flex my-4 ${isUser ? "justify-end" : "justify-start"}`}>

      {/* Avatar trái (bot) */}
      {!isUser && (
        <img src={botAvatar} className="w-8 h-8 rounded-full mr-3 self-start" />
      )}

      {/* Bubble Chat */}
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-[15px] ${isUser
            ? "bg-[#3A3A3A] text-white rounded-br-none"
            : "bg-[#1F1F1F] text-gray-200 rounded-bl-none"
          }`}
      >
        {/* Bot icon */}
        {isBot && parsedTexts.length === 0 && (
          <FontAwesomeIcon icon={faSearch} className="mr-2 opacity-60" />
        )}

        {/* Render phim JSON */}
        {parsedTexts.length > 0 ? (
          parsedTexts.map((item, idx) => {
            const movie = movies?.find(m => m._id === item._id)
            return (
              <div key={idx} className="flex gap-3 my-2">
                {movie ? (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      className="w-[70px] h-[110px] rounded-xl"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {movie.title || movie.original_title}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {movie.original_title}
                      </p>
                      <p className="text-default mt-1 text-sm">
                        {item.reason}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-yellow-300">
                    👉 {item.reason}
                  </p>
                )}
              </div>
            )
          })
        ) : (
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ node, ...props }) => (
                <code className="bg-black/40 text-green-300 p-2 rounded block text-sm overflow-x-auto" {...props} />
              )
            }}
          >
            {formattedText || ""}
          </ReactMarkdown>
        )}
      </div>

      {/* Avatar phải (user) */}
      {isUser && (
        <img src={userAvatar} className="w-8 h-8 rounded-full ml-3 self-start" />
      )}
    </div>
  )
}

export default ChatMessage
