import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";


const ChatBot = ({ movies, userList }) => {
  const [chatHistory, setChatHistory] = useState([]);
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
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
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
      updateHistory("❌ Lỗi khi tạo phản hồi");
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
      <div className="w-[80%] mx-auto bg-bgdefault rounded-2xl p-5">
        <div className="rounded-2xl  mb-4">
          <div className="w-full flex items-center justify-center">
            <p className="text-white font-semibold text-[22px]">
              Bạn chưa biết xem gì? Đừng lo đã có AI hỗ trợ
            </p>
          </div>
          <div
            ref={chatBodyRef}
            className="w-full h-[450px] bg-[#1A1A1A] rounded-xl p-4 overflow-y-auto"
          >
            {chatHistory.map((msg, index) => (
              <>
                <ChatMessage key={index} chat={msg} movies={movies} userList={userList}/>
              </>
            ))}
          </div>
        </div>
        <InputGroup className="w-[60%] mx-auto border-2 border-[#2F2F2F] rounded-2xl text-white">
          <InputGroupInput
            placeholder="Nhập câu hỏi về phim..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <InputGroupButton align="inline-end" onClick={sendMessage} className="bg-white rounded-full text-black hover:opacity-90 h-full flex items-center">
            <FontAwesomeIcon
              icon={faPaperPlane}

            />
          </InputGroupButton>
        </InputGroup>

      </div>
    </div>
  );
};

export default ChatBot;
