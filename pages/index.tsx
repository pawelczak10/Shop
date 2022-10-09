import type { NextPage } from "next";
import { ReactNode } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Product } from "./components/Product";
import { Main } from "./components/Main";


const DATA = {
  description:
    "Ogólnie znana teza głosi, iż użytkownika może rozpraszać zrozumiała zawartość strony, kiedy ten chce zobaczyć sam jej wygląd. Jedną z mocnych stron używania Lorem Ipsum jest to, że ma wiele różnych „kombinacji” zdań, słów i akapitów, w przeciwieństwie do zwykłego: „tekst, tekst, tekst”, sprawiającego, że wygląda to „zbyt czytelnie” po polsku.",
  urlAdres: "https://picsum.photos/id/1060/536/354",
  rating: 4.5,
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>
        <Product data={DATA} />
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
