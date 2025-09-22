import AnimatedPage from "@/components/AnimatedPage";
import Anime from "@/components/Anime";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotMovies from "@/components/HotMovies";
import MoviesByRegion from "@/components/MoviesByRegion";

const HomePage = () => {
  return (
    <>
      <Header />
      <AnimatedPage>
        <Banner />
        <Category />
        <MoviesByRegion />
        <HotMovies />
        <Anime />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default HomePage;
