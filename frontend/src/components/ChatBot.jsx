import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage.jsx";
import { Send, Sparkles } from "lucide-react";


const ChatBot = ({ movies, userList }) => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "Bạn chưa biết xem gì? Hãy chat với tôi!=)"
    }
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef();

  const formatMoviesForAI = (movies) => {
    return movies
      .map(
        (m) =>
          `{"_id":"${m._id}", "title":"${m.title}", "genres":"${m.genres}", "overview":"${m.overview}"}`
      )
      .join("\n");
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { role: "user", text: input };
    setChatHistory((prev) => [...prev, newMsg, { role: "model", text: "Thinking..." }]);
    generateBotResponse([...chatHistory, newMsg]);
    setInput("");
  };

  const generateBotResponse = async (history) => {
    const updateHistory = (text, movieObj = null) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, movie: movieObj },
      ]);
    };

    try {
      const movieText = formatMoviesForAI(movies);

      const fullPrompt = `
Bạn là hệ thống gợi ý phim.

DANH SÁCH PHIM (CHỈ ĐƯỢC CHỌN TRONG DANH SÁCH NÀY):
${movieText}

YÊU CẦU BẮT BUỘC:
- Chỉ được dùng các _id tồn tại trong danh sách phim ở trên.
- Tuyệt đối không tự tạo _id mới.
- Trả về tối đa 3 phim phù hợp nhất với câu hỏi của người dùng.
- Nếu không tìm được phim phù hợp, trả về 3 phim có popularity cao nhất.
- Chỉ trả về JSON dạng mảng:
[
  { "_id": "id của phim", "reason": "ngắn gọn 1 câu" }
]
- KHÔNG viết thêm text ngoài JSON.

Câu hỏi người dùng: "${history[history.length - 1].text}"
`;


      const requestHistory = [
        ...history.map(({ role, text }) => ({
          role,
          parts: [{ text }],
        })),
        { role: "user", parts: [{ text: fullPrompt }] },
      ];

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        { contents: requestHistory },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },
        }
      );

      const botText = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      // Parse JSON
      let movieData = null;
      try {
        const parsed = JSON.parse(botText);
        if (parsed._id) {
          movieData = movies.find((m) => m._id === parsed._id);
          updateHistory(parsed.reason, movieData);
          return;
        }
      } catch { }

      updateHistory(botText);

    } catch (e) {
      console.log(e);
      updateHistory("Lỗi khi tạo phản hồi");
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  console.log(chatHistory);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-black to-gray-900 p-5">
      <div className="min-h-screen w-[80%] mx-auto rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Movie Recommendations
            </h1>
            <p className="text-slate-400 mt-2">Chatbot AI gợi ý phim thông minh</p>
          </div>

          {/* Chat box */}
          <div className="bg-slate-800/40 border border-slate-700/40 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">

            {/* Messages */}
            <div
              ref={chatBodyRef}
              className="h-[500px] overflow-y-auto p-6 space-y-4"
              style={{
                scrollbarWidth: 'none',
                // scrollbarColor: '#6366f1 #1e293b'
              }}
            >
              {chatHistory.map((msg, index) => (
                <ChatMessage
                  key={index}
                  chat={msg}
                  movies={movies}
                  userList={userList}
                />
              ))}
            </div>

            <div className="border-t border-slate-700/50 bg-slate-800/30 p-4">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Nhập câu hỏi về phim..."
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-2xl px-5 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  />
                  <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-2xl p-3 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['Phim hành động', 'Phim tình cảm', 'Phim kinh dị', 'Phim hài'].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setInput(suggestion)}
              className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 rounded-full text-slate-300 text-sm transition-all hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
