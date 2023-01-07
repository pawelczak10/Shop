interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return <div className="text-blue-500 font-bold"> {rating}.0 / 5.0</div>;
};
