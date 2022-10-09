import {Rating} from './Rating'

interface ProductProps {
    data: {
      description: string;
      urlAdres: string;
      rating: number;
    };
  }

  
  export const Product = ({ data }: ProductProps) => {
    return (
      <>
        <img src={data.urlAdres}></img>
        <p>{data.description}</p>
        <Rating rating={data.rating} />
      </>
    );
  };