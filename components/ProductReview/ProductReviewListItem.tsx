import { ReviewContentFragment } from "../../src/gql/graphql";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}
export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  return (
    <li>
      <div className=" px-96 mx-96 ">
        <div className="w-96 py-4 px-8 content-center  mx-20 bg-white shadow-lg rounded-lg my-20">
          <div className="flex justify-center md:justify-end -mt-16"></div>
          <div>
            <h2 className="text-gray-800 text-3xl font-semibold">
              {review.headline}
            </h2>
            {review.rating && (
              <h3 className="text-gray-800 mt-2 gap-4 text-xl font-semibold">
                Rating: {review.rating}.0 / 5.0
              </h3>
            )}
            <p className="mt-2 text-gray-600">{review.content}</p>
          </div>
          <div className="flex justify-end mt-4">
            <a href="#" className="text-xl font-medium text-indigo-500">
              {review.name}
            </a>
          </div>
        </div>
      </div>
    </li>
    // <li classNameName="border mt-4 bg-white p-2 max-w-md mx-auto shadow-md rounded-md">
    //   <h3 classNameName="font-bold">{review.headline}</h3>
    //   {review.rating && (
    //     <div>
    //       Ocena: <span classNameName="text-gray-500">{review.rating}/5</span>
    //     </div>
    //   )}
    //   <p classNameName="my-2 italic">{review.content}</p>
    //   <footer classNameName="pl-4">{review.name}</footer>
    // </li>
  );
};
