import Head from "next/head";
import React, { useState } from "react";
import { Product } from "../utils/typings";
import SingleProduct from "../components/Product";
import { useQuery } from "react-query";
import { useUser } from "../lib/user";
import CircularProgress from "@mui/material/CircularProgress";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Products() {
  //const { user } = useUser({ redirectTo: "/" });
  const [searchValue, setSearchValue] = useState<string>("");

  const onSelectHandler = (item: any) => {
    setSearchValue(item.title);
    fetchProduct();
  };
  const fetchProduct = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchValue}`
    );
    const data = await response.json();
    return data.products;
  };

  const onSearchHandler = (item: string) => {
    if (item === "") {
      setSearchValue("");
    }
  };
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products", searchValue], fetchProduct, {
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="relative w-[60%] mx-auto mt-[40%]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="relative items-center">
      <Head>
        <title>E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {
          <div className="w-[60%] mx-auto mt-10 z-30">
            <ReactSearchAutocomplete
              items={products}
              fuseOptions={{ keys: ["title", "description"] }}
              resultStringKeyName="title"
              onSearch={onSearchHandler}
              onSelect={onSelectHandler}
              inputSearchString={searchValue}
              inputDebounce={300}
              onClear={() => setSearchValue("")}
            />
          </div>
        }

        <div className=" relative w-[90%] mx-auto top-32 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product: Product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Products;

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}
