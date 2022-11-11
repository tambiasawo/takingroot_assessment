import Head from "next/head";
import React, { useState } from "react";
import { Product } from "../utils/typings";
import SingleProduct from "../components/Product";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Products() {
  const router = useRouter();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

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

  return (
    <div className=" items-center mt-0">
      <Head>
        <title>E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative w-[90%] mx-auto top-0">
        <button
          className=" right-5 hidden top-0 py-2 sm:flex px-4 float-right rounded bg-[#027fff] justify-end "
          onClick={() => logoutUser()}
        >
          Sign out
        </button>
        <a
          onClick={() => logoutUser()}
          className="flex items-center mt-5 justify-end cursor-pointer sm:hidden"
        >
          Sign Out
        </a>

        <div className=" relative w-[60%] mx-auto mt-8 z-30">
          <ReactSearchAutocomplete
            items={products}
            placeholder="Search"
            fuseOptions={{ keys: ["title", "description"] }}
            resultStringKeyName="title"
            onSearch={onSearchHandler}
            onSelect={onSelectHandler}
            inputSearchString={searchValue}
            inputDebounce={300}
            onClear={() => setSearchValue("")}
          />
        </div>

        {isLoading ? (
          <div className="absolute w-[60%] mx-auto mt-[15%] left-[50%]">
            <CircularProgress />
          </div>
        ) : (
          <div className=" relative w-[90%] mx-auto top-32 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map((product: Product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;
