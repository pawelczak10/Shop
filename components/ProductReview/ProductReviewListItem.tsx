import { ReviewContentFragment } from "../../src/gql/graphql";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}
export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  return (
    <li className="border mt-4 bg-white p-2 max-w-md mx-auto shadow-md rounded-md">
      <h3 className="font-bold">{review.headline}</h3>
      {review.rating && (
        <div>
          Ocena: <span className="text-gray-500">{review.rating}/5</span>
        </div>
      )}
      <p className="my-2 italic">{review.content}</p>
      <footer className="pl-4">{review.name}</footer>
    </li>
  );
};
