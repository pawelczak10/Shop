import { useGetReviewsForProductSlugQuery } from "../../src/gql/graphql";
import { ProductReviewItem } from "../../components/ProductReview/ProductReviewListItem";
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
