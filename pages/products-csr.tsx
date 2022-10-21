import { InferGetStaticPropsType } from "next";
import { useQuery } from '@tanstack/react-query'
import { ProductDetails } from "../components/Product";

interface StoreApiResponse{
  id:  number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
      rate: number;
      count: number
  }
}

const getProducts= async () => {
  const res = await fetch("http://localhost:3000/json/api/offers?fields=id");
  const data:StoreApiResponse[] = await res.json()
  return data

}

const ProductsCsrPage = () => {
  const result = useQuery(["products"], getProducts)
  result.data;
  result.isLoading
  result.isError
  console.log(result.data)
  if(result.isLoading){
    return <div>loading...</div>
  }

  if(!result.data || result.error){
    return <div>Something went wrong!</div>
  }
    return (
      <ul className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {result.data.map((product) => {
          return (
            <li key={product.id} className="shadow-xl border-2">
              <ProductDetails data={{
                id: product.id,
                title: product.title,
                description: product.description,
                urlAdres: product.image,
                rating: product.rating.rate,
              }} />
            </li>
          );
        })}
      </ul>
    );
  };
export default ProductsCsrPage;



