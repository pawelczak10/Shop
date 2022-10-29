import Link from "next/link";
import Image from "next/image";
import { Rating } from "./Rating";
import { NextSeo } from "next-seo";
import { ShopReactMarkDown } from "./ShopMarkdown";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownResult } from "../utils";
import { useCartState } from "./../components/Cart/CartContext";

interface ProductDetails {
  id: number;
  description: string;
  title: string;
  urlAdres: string;
  rating: number;
  longDescription: MarkdownResult;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="bg-white p-4">
        <NextSeo
          title={data.title}
          description={data.description}
          canonical={`https://shop-six-eta.vercel.app/products/${data.id}`}
          openGraph={{
            url: `https://shop-six-eta.vercel.app/products/${data.id}`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.urlAdres,
                alt: data.title,
                type: "image/jpeg",
              },
            ],
            siteName: "Our Shop",
          }}
        />
        <Image
          src={data.urlAdres}
          alt={data.title}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <MDXRemote {...data.longDescription} />
      </article>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<ProductDetails, "title" | "urlAdres" | "id">;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();

  return (
    <>
      <div className="bg-white p-4">
        <Image
          src={data.urlAdres}
          alt={data.title}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
        </a>
      </Link>
      <button
        className=""
        onClick={() => {
          cartState.addItemToCart({
            id: data.id,
            price: 21,
            title: data.title,
            count: 1,
          });
        }}
      >
        Add to Shop
      </button>
    </>
  );
};
