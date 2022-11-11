import React from "react";
import { Product } from "../../utils/typings";

interface Props {
  data: Product;
}
function SingleProduct(data: Props) {
  console.log(data);

  return <div>single prod</div>;
}

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return {
    props: { data },
  };
};

export default SingleProduct;
