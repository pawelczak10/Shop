import { GetStaticPropsContext } from "next";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";

const ProductIdPages = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Something went wrog!</div>;
  }

  return (
    <div>
      <Link href="/products">
      <a>
       Wroc na strone glowna 
        </a></Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          urlAdres: data.image,
          description: data.description,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};
export default ProductIdPages;

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

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
