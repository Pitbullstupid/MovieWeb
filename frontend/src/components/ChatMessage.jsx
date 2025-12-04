import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { Badge, Sparkles } from 'lucide-react'
import { genreMap } from '@/lib/data'
import { Link } from 'react-router'

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
  const botAvatar = "https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg"

  // Render "Thinking..."
  if (chat.text === "Thinking...") {
    return (
      <div className="w-full flex justify-start my-3">
        <img src={botAvatar} className="w-8 h-8 rounded-full mr-3" />
        <div className="px-4 py-2 bg-[#263344] rounded-2xl text-blue-400 flex items-center gap-2">
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
        <img src={botAvatar} className="w-7 h-7 rounded-full mr-3 self-start" />
      )}

      {/* Bubble Chat */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-[15px] ${isUser
          ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-br-none"
          : "bg-slate-700/70 text-slate-100 rounded-bl-none"
          }`}
      >

        {/* Bot icon */}
        {isBot && parsedTexts.length === 0 && (
          <Sparkles className="mr-2 opacity-60 w-5 h-5 text-slate-500" />
        )}

        {/* Render phim JSON */}
        {parsedTexts.length > 0 ? (
          parsedTexts.map((item, idx) => {
            const movie = movies?.find(m => m._id === item._id)
            return (
              <>
                {movie && (
                  <Link to={`/phim/${movie.original_title}`}>
                    <div className="flex gap-3 bg-slate-800/60 rounded-xl p-3 border border-slate-600/30 hover:border-purple-500/50 transition-all cursor-pointer mb-2  hover:scale-102">

                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        className="w-16 h-24 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="font-semibold text-white text-sm mb-1 line-clamp-1">
                        <p className="font-semibold text-white truncate w-[90%]">
                          {movie.title || movie.original_title}
                        </p>

                        <div className='flex gap-2'>
                          {movie.genre_ids?.map((gid) => (
                            <p className="text-slate-400 text-xs mb-2 pt-2">{genreMap[gid]}</p>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-default text-xs font-bold">
                            <FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-blue-300 text-xs leading-relaxed">{item.reason}</p>
                      </div>

                    </div>
                  </Link>
                )}
              </>
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
