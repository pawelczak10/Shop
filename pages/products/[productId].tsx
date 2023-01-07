import { GetStaticPropsContext } from "next";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";
import { serialize } from "next-mdx-remote/serialize";
import { gql } from "@apollo/client";
import { apolloClient } from "../../graphql/apolloClient";
import { ProductIdDocument, ProductIdQuery } from "../../src/gql/graphql";
import { ProductsDetails } from "../../components/Products";

const ProductIdPages = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Something went wrog!</div>;
  }

  return (
    <div>
      {/* <Link href="/products">
        <button
          className="block rounded-lg ml-5 mt-5 hover:bg-black bg-gray-800 focus:ring-offset-2 focus:ring-gray-800 p-3 text-sm text-white"
          type="submit"
        >
          Go back
        </button>
      </Link> */}
      <ProductsDetails
        data={{
          id: data.id,
          title: data.name,
          urlAdres: data.images[0].url,
          description: data.description,
          rating: 5,
          longDescription: data.longDescription,
          slug: data.slug,
          price: data.price,
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
