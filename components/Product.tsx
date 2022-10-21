import Link from "next/link";
import Image from "next/image";
import { Rating } from "./Rating";





interface ProductDetails {
  id: number;
  description: string;
  title: string;
  urlAdres: string;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
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
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<ProductDetails, "title" | "urlAdres" | "id">;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
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
    </>
  );
};
