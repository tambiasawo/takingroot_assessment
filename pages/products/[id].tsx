import React from "react";
import { Product } from "../../utils/typings";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
//import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
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

  console.log({ product });
  if (isLoading) {
    return (
      <div className="relative w-[60%] mx-auto mt-[40%]">
        <CircularProgress />
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
        rer
        <section className="h-fit flex-col gap-8 mt-16 sm:flex sm:flex-row sm:gap-4 sm:h-full sm:mt-24 sm:mx-2 md:gap-8 md:mx-4 lg:flex-col lg:mx-0 lg:mt-36">
          <picture className="relative flex items-center bg-orange sm:bg-transparent">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="block sm:rounded-xl xl:w-[70%] xl:rounded-xl m-auto pointer-events-none transition duration-300 lg:w-3/4 lg:pointer-events-auto lg:cursor-pointer lg:hover:shadow-xl"
              id="hero"
            />
            <button
              className="bg-white w-10 h-10 flex items-center justify-center pl-1 rounded-full absolute right-6 z-10 sm:hidden"
              id="next-mobile"
            >
              <svg
                width="13"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                id="next-mobile"
              >
                <path
                  d="m2 1 8 8-8 8"
                  stroke="#1D2026"
                  stroke-width="3"
                  fill="none"
                  fill-rule="evenodd"
                  id="next-mobile"
                />
              </svg>
            </button>
          </picture>
          <div className="thumbnails hidden justify-between gap-4 m-auto sm:flex sm:flex-col sm:justify-start sm:items-center sm:h-fit md:gap-5 lg:flex-row">
            {product?.images.map((image: string, index: number) => (
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
        <section className="w-full p-6 lg:mt-36 lg:pr-20 lg:py-10 2xl:pr-40 2xl:mt-40">
          <h4 className="font-bold text-orange mb-2 uppercase text-xs tracking-widest">
            {product?.title}
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
                $125.00
              </h3>
              <span className="inline-block h-fit py-0.5 px-2 font-bold bg-pale-orange text-orange rounded-lg text-sm">
                50%
              </span>
            </div>
            <p className="text-dark-grayish w-fit line-through decoration-dark-grayish decoration-1 my-auto">
              $250.00
            </p>
          </div>

          <div className="flex flex-col gap-5 mb-16 sm:flex-row lg:mb-0">
            <div className="w-full h-10 text-sm bg-light py-2 flex items-center justify-between rounded-lg font-bold relatives sm:w-80">
              <div id="minus" className="plus-minus">
                <div className="w-3 h-1 bg-orange absolute" id="minus"></div>
                <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path
                      d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                      id="a"
                    />
                  </defs>
                  <use fill="#FF7E1B" fill-rule="nonzero" />
                </svg>
              </div>
              <span id="amount" className="select-none">
                0
              </span>
              <div id="plus" className="plus-minus">
                <svg
                  width="12"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  id="plus"
                >
                  <defs>
                    <path
                      d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                      id="b"
                    />
                  </defs>
                  <use fill="#FF7E1B" fill-rule="nonzero" id="plus" />
                </svg>
              </div>
            </div>
            <button
              className="w-full h-10 bg-orange py-2 flex items-center justify-center gap-4 text-xs rounded-lg font-bold text-light shadow-md shadow-orange hover:brightness-125 transition select-none"
              id="add-cart"
            >
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="hsl(223, 64%, 98%)"
                  fill-rule="nonzero"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </section>
      </main>
    </div>
  );

  {
    /* <div classNameName="relative top-40 grid grid-cols-1 sm:grid-cols-2 gap-y-6 w-[90%] mx-auto">
      <div classNameName="">
        <img src={product?.images[0]} alt={product?.title} />
      </div>
      <div classNameName="">
        <h1 classNameName="text-xl md:text-2xl font-bold">{product?.title}</h1>
        <h3 classNameName="text-xl font-light">${product?.price}</h3>
        <span>{product?.rating}</span>
        <div>{product?.description}</div>

        <div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div> */
  }
}

export default SingleProduct;
