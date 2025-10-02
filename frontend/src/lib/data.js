export const genreMap = {
  28: "Hành động",
  12: "Phiêu lưu",
  16: "Hoạt hình",
  35: "Hài",
  80: "Tội phạm",
  99: "Tài liệu",
  18: "Chính kịch / Tâm lý",
  10751: "Gia đình",
  14: "Giả tưởng / Thần thoại",
  36: "Lịch sử",
  27: "Kinh dị",
  10402: "Âm nhạc",
  9648: "Bí ẩn",
  10749: "Lãng mạn / Tình cảm",
  878: "Khoa học viễn tưởng",
  10770: "Phim truyền hình",
  53: "Giật gân / Ly kỳ",
  10752: "Chiến tranh",
  37: "Viễn Tây",
};
export const languageCountryMap = {
  en: "Hoa Kỳ",
  vi: "Việt Nam",
  ja: "Nhật Bản",
  ko: "Hàn Quốc",
  zh: "Trung Quốc",
  hi: "Ấn Độ",
  fr: "Pháp",
  de: "Đức",
  es: "Tây Ban Nha",
  it: "Ý",
  pt: "Brazil",
  ru: "Nga",
  th: "Thái Lan",
};
export const year = Object.fromEntries(
  Array.from({ length: 2025 - 2000 + 1 }, (_, i) => {
    const y = 2025 - i;
    return [y, `Năm ${y}`];
  })
);



// các màu gradient
export const gradients = [
  ["#556DD9", "#7A8EE3"],
  ["#8080AB", "#A1A1C5"],
  ["#429A85", "#6FBFAF"],
  ["#8E7CC1", "#B09ED4"],
  ["#D59A83", "#E6B8A8"],
  ["#505363", "#7A7D91"],
  ["#459CA0", "#76C4C7"],
  ["#D5947A", "#E6B09B"],
  ["#6DBA67", "#9EDC97"],
  ["#B75C5C", "#D78B8B"],
  ["#B74C8A", "#D279A8"],
  ["#F087B0", "#F6AFCB"],
  ["#C65E93", "#DD8AB3"],
];




