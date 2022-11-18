import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductListItem } from "../components/Product";
import { Main } from "../components/Main";
import { gql, useQuery } from "@apollo/client";
// const DATA = {
//   id: 1,
//   description:
//     "Ogólnie znana teza głosi, iż użytkownika może rozpraszać zrozumiała zawartość strony, kiedy ten chce zobaczyć sam jej wygląd. Jedną z mocnych stron używania Lorem Ipsum jest to, że ma wiele różnych „kombinacji” zdań, słów i akapitów, w przeciwieństwie do zwykłego: „tekst, tekst, tekst”, sprawiającego, że wygląda to „zbyt czytelnie” po polsku.",
//   urlAdres: "https://picsum.photos/id/1060/536/354",
//   rating: 4.5,
//   title: "TEST",
// };

const Home = () => {
  const { loading, error, data } = useQuery(gql`
  query Product {
    products {
      id
      slug
      name
      price
    }
  }
  `);

  if (loading) {
    return <Main>Ladowanie...</Main>;
  }
  if (error) {
    return <Main>{JSON.stringify(error)}</Main>;
  }
  return (
    <Main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Main>
  );
};

export default Home;
