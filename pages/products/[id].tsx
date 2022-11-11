import React from "react";
import { Product } from "../../utils/typings";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
interface Props {
  data: Product;
}
function SingleProduct() {
  const router = useRouter();
  const { id } = router.query;

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  };
  const { data: product, isLoading, error } = useQuery("product", fetchProduct);

  console.log(product);
  return (
    <div className="relative top-40 grid grid-cols-1 sm:grid-cols-2 gap-y-6 w-[90%] mx-auto">
      {/* <div className="">
        <img src={product.images[0].join()} alt={product.title} />
      </div> */}
      <div className="">
        <h1 className="text-xl md:text-2xl font-bold">{product.title}</h1>
        <h3 className="text-xl font-light">${product.price}</h3>
        <span>{product.rating}</span>
        <div>{product.description}</div>

        <div>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
