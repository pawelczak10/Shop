import { gql } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import { ProductListItem } from "../components/Product";
import { apolloClient } from "../graphql/apolloClient";
import { ProductDocument, ProductQuery } from "../src/gql/graphql";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.products.map((product: any) => {
        return (
          <li key={product.id} className="shadow-xl border-2">
            <ProductListItem
              data={{
                id: product.id,
                title: product.name,
                urlAdres: product.images[0].url,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ProductsPage;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<ProductQuery>({
    query: ProductDocument,
  });


  return {
    props: {
      data,
    },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
