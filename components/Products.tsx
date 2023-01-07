import Link from "next/link";
import Image from "next/image";
import { Rating } from "./Rating";
import { MarkdownResult } from "../utils";
import { useCartState } from "./../components/Cart/CartContext";
import { ProductReviewContainer } from "./ProductReview/ProductReviewContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


interface ProductDetails {
    id: number;
    description: string;
    title: string;
    urlAdres: string;
    rating: number;
    longDescription: MarkdownResult;
    slug: string;
    price: number;
}

interface ProductProps {
    data: ProductDetails;
}

export const ProductsDetails = ({ data }: ProductProps) => {
    const cartState = useCartState();

    const reviewFormSchema = yup
        .object({
            quantity: yup.number().min(1).max(5).required(),
        })
        .required();

    type ReviewFormData = yup.InferType<typeof reviewFormSchema>


    const { register, handleSubmit } = useForm<ReviewFormData>({
        resolver: yupResolver(reviewFormSchema),
    });
    const onSubmit = handleSubmit((datas) => {
        console.log(datas);

        cartState.addItemToCart({
            id: data.id,
            price: data.price / 100,
            title: data.title,
            count: datas.quantity,
        });



    });

    return (
        <>
            <>
                <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                    <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
                        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                            <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600  dark:text-white">
                                Products / {data.title}
                            </p>
                            <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white mt-4">
                                {data.title}
                            </h2>

                            <div className="flex flex-row justify-between mt-5">
                                <Rating rating={data.rating} />
                                <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 dark:text-white duration-100 cursor-pointer">
                                    22 reviews
                                </p>
                            </div>

                            <p className="font-normal text-base leading-6 text-gray-600  mt-7">
                                {data.description}
                            </p>
                            <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-white">
                                $ {data.price / 100}
                            </p>
                            <form onSubmit={onSubmit} >

                                <div className="lg:mt-11 mt-10">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-medium text-base leading-4 text-gray-600 ">
                                            Select quantity
                                        </p>
                                        <div className="flex mb-3">
                                            <input
                                                id="counter"
                                                aria-label="input"
                                                {...register("quantity")}
                                                className="border dark:text-white border-gray-300 dark:bg-transparent h-full text-center w-14 pb-1"
                                                type="number"
                                                max='5'
                                                min='1'
                                                defaultValue='5'
                                            />

                                        </div>
                                    </div>
                                    <hr className="bg-gray-200 w-full my-2" />
                                    <div className="flex flex-row justify-between items-center mt-4"></div>
                                </div>
                                <button
                                    type="submit"


                                    className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 rounded-lg w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                                >
                                    Add to shopping bag
                                </button>
                            </form>
                        </div>

                        <div className="w-full sm:w-96 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                            <div className="w-full lg:w-10/12 bg-gray-100 flex justify-center items-center  ml-10">
                                <Image
                                    src={data.urlAdres}
                                    alt={data.title}
                                    width="450px"
                                    height="450px"
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ProductReviewContainer productSlug={data.slug} />
            </>
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
                className="m-1 mx-5 h-10 transform rounded-md bg-purple-700 px-4 py-2 text-white transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline-none"
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
