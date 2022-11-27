import { apolloClient } from "../graphql/apolloClient";
import { gql } from "@apollo/client";
import { ReviewContentFragment } from "../src/gql/graphql";
import { useGetReviewsForProductSlugQuery } from "../src/gql/graphql";
interface ProductReviewListProps {
  productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
  const { data } = useGetReviewsForProductSlugQuery({
    variables: { slug: productSlug },
  });

  if (!data?.product) {
    return null;
  }
  return (
    <ul>
      {data.product.reviews.map((review: any) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
};

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}
const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  return (
    <li>
      <h3>{review.headline}</h3>
      <div>{review.rating}</div>
      <p>{review.content}</p>
      <footer>{review.name}</footer>
    </li>
  );
};
