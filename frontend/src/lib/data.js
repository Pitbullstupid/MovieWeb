
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


export const avatars = [

  "https://i.pinimg.com/1200x/3f/7b/ce/3f7bcec34c71ffecb3430ecb24d6fa1a.jpg",
  "https://i.pinimg.com/736x/96/7b/76/967b76d7c522e3e002871e636e2a9aa8.jpg",
  "https://i.pinimg.com/736x/b3/8a/69/b38a6956c8ca9f20d5380112679a6850.jpg",
  "https://i.pinimg.com/736x/68/e8/e2/68e8e272e32966a8a6eb279bddb2b459.jpg",
  "https://i.pinimg.com/736x/b6/e6/5a/b6e65a20e4d32c9a6f984d2d699ed2e1.jpg",
  "https://i.pinimg.com/1200x/9a/8f/58/9a8f5878b9435f6f1e98504ac7e07fc6.jpg",
  "https://i.pinimg.com/736x/ca/77/52/ca77521b09c176a7a35369778a8eaeee.jpg",
  "https://i.pinimg.com/736x/38/c8/31/38c831c1291e025623a640e43762c31d.jpg",
  "https://i.pinimg.com/1200x/66/1e/a5/661ea54ff252e5d56d6b27caea53c603.jpg",
  "https://i.pinimg.com/1200x/57/79/b4/5779b42b747db124db3dd78201e56609.jpg",
  "https://i.pinimg.com/736x/e7/16/fb/e716fbf69512b2d4929e7b572eea30f8.jpg",
  "https://i.pinimg.com/736x/41/d8/18/41d818b1b1e0e0ecdf548bb5fd484519.jpg",
  "https://i.pinimg.com/1200x/66/64/f5/6664f54377a3cfa4e83af8766662ff8d.jpg",
  "https://i.pinimg.com/736x/cf/0c/e7/cf0ce7a7c9e773a4fca8d3c42d9107b0.jpg",
  "https://i.pinimg.com/736x/ed/81/87/ed8187c400313d3bacf288fee67819c1.jpg",
  "https://i.pinimg.com/736x/0b/d2/c1/0bd2c1f6a26053cf582cb5873b788814.jpg",
  "https://i.pinimg.com/736x/69/ef/0a/69ef0a2e02b85a6428a521ccbe7f942b.jpg",
  "https://i.pinimg.com/736x/31/41/32/3141323f3da4a90489662135c40af1ef.jpg"
]



