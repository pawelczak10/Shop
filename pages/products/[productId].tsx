import { GetStaticPropsContext } from "next";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";
import { serialize } from "next-mdx-remote/serialize";
import { gql } from "@apollo/client";
import { apolloClient } from "../../graphql/apolloClient";
import { ProductIdDocument, ProductIdQuery } from "../../src/gql/graphql";

const ProductIdPages = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Something went wrog!</div>;
  }

  return (
    <div>
      <Link href="/products">
        <a>Wroc na strone glowna</a>
      </Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.name,
          urlAdres: data.images[0].url,
          description: data.description,
          rating: 5,
          longDescription: data.longDescription,
          slug: data.slug,
        }}
      />
    </div>
  );
};
export default ProductIdPages;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<ProductIdQuery>({
    query: ProductIdDocument,
  });

  return {
    paths: data.products.map((product: any) => {
      return {
        params: {
          productId: product.id,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: any }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const { data } = await apolloClient.query({
    variables: { id: params.productId },
    query: gql`
      query getProductDetails($id: ID) {
        product(where: { id: $id }) {
          name
          price
          slug
          description
          images {
            url
          }
        }
      }
    `,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};

interface StoreApiResponse {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}
