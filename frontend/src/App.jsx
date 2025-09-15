import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const [movie, setMovie] = useState();

  const fetchMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=vi&page=1';
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
  };
  

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
