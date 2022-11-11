import React from "react";
import { Product } from "../utils/typings";
import Image from "next/image";
import Link from "next/link";

interface SingleProduct {
  product: Product;
}
function Product({ product }: SingleProduct) {
  return (
    <Link href={`product/${product.id}`}>
      <div className="h-auto w-auto cursor-pointer">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={800}
          height={800}
        />

        {product.price}
      </div>
    </Link>
  );
}

export default Product;
