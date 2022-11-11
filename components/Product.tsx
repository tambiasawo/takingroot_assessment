import React from "react";
import { Product } from "../utils/typings";
import Link from "next/link";

interface SingleProduct {
  product: Product;
}
function Product({ product }: SingleProduct) {
  return (
    <Link href={`products/${product.id}`}>
      <div className=" z-[-3] relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        {" "}
        <img
          src={product.thumbnail}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div>
        <h3 className="mt-4 text-center text-sm text-gray-700">
          {product.title}
        </h3>
        <p className="mt-1 text-center text-lg font-medium text-gray-900">
          {product.price}
        </p>
        <div className="mt-1 text-center text-md  text-gray-900">
          {product.description}
        </div>
      </div>
    </Link>
  );
}

export default Product;
