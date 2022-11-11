import React from "react";
import { Product } from "../../utils/typings";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "../../utils/Select";

import Breadcrumbs from "../../utils/BreadCrumbs";
interface Props {
  data: Product;
}
function SingleProduct({ data }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  };
  const { data: product, isLoading, error } = useQuery("product", fetchProduct);

  if (isLoading) {
    return (
      <div className="absolute w-[60%] mx-auto mt-[15%] left-[50%]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-[60%] mx-auto mt-[40%]">
        There was an error fetching products. Please try again later.
      </div>
    );
  }
  return (
    <div className="container mx-auto font-kumbh text-base">
      <nav className="flex container justify-between fixed z-20 border-b-2 border-b-slate-200 bg-white  lg:pr-8">
        <div className="flex mr-6 pt-6 ">
          <div role="presentation">
            <Breadcrumbs title={product.title} />
          </div>
        </div>
      </nav>

      <main className="w-full flex flex-col lg:flex-row">
        <section className="h-fit flex-col gap-8 mt-16 sm:flex sm:flex-row sm:gap-4 sm:h-full sm:mt-24 sm:mx-2 md:gap-8 md:mx-4 lg:flex-col lg:mx-0 lg:mt-36">
          <picture className="relative flex items-center bg-orange sm:bg-transparent">
            <img
              src={product?.images && product?.images[0]}
              alt={product?.title}
              className="block sm:rounded-xl xl:w-[70%] xl:rounded-xl m-auto pointer-events-none transition duration-300 lg:w-3/4 lg:pointer-events-auto lg:cursor-pointer lg:hover:shadow-xl"
              id="hero"
            />
          </picture>
          <div className="thumbnails hidden justify-between gap-4 m-auto sm:flex sm:flex-col sm:justify-start sm:items-center sm:h-fit md:gap-5 lg:flex-row">
            {product?.images?.map((image: string, index: number) => (
              <div
                key={index}
                className="w-1/5 cursor-pointer rounded-xl sm:w-28 md:w-32 lg:w-[72px] xl:w-[78px] ring-active"
              >
                <img
                  src={image}
                  alt="thumbnail"
                  className="rounded-xl hover:opacity-50 transition active"
                  id="thumb-1"
                />
              </div>
            ))}
          </div>
        </section>
        <section className="w-3/4 p-6 lg:mt-36 lg:pr-0 lg:pl-40 lg:py-10 2xl:pr-40 2xl:mt-40">
          <h4 className="font-light text-orange mb-2 uppercase text-xs tracking-widest">
            {product?.category}
          </h4>
          <h1 className="text-very-dark mb-4 font-bold text-3xl lg:text-4xl">
            {product?.title}
          </h1>
          <p className="text-dark-grayish mb-6 text-base sm:text-lg">
            {product?.description}
          </p>

          <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start">
            <div className="flex items-center gap-4">
              <h3 className="text-very-dark font-bold text-3xl inline-block">
                ${product?.price}
              </h3>
            </div>
            <p className="text-dark-grayish w-fit  decoration-dark-grayish decoration-1 my-auto">
              <span className="line-through mr-5">
                $
                {Math.round(
                  product?.price * ((100 - product?.discountPercentage) / 100)
                )}
              </span>
              {Math.round(product?.discountPercentage)}% Off
            </p>
          </div>

          <div className="flex flex-col gap-5 mb-16 sm:flex-row lg:mb-0">
            <Select stock={product?.stock} />
            <button className="w-full h-10 bg-[#1876d1] py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-light shadow-md shadow-orange hover:brightness-125 transition select-none">
              Add to cart
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SingleProduct;
