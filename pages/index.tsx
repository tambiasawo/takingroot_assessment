import Head from "next/head";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Required").min(2),
      password: Yup.string().required("Required").min(2).max(16),
    }),

    onSubmit: () => {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formik.values.username,
          password: formik.values.password,
          expiresInMins: 60,
        }),
      })
        .then((res) => res.json())
        .then((res) => localStorage.setItem("token", res.token))
        .then(() => router.push("/product-listings"));
    },
  });

  return (
    <div className="relative  flex flex-col md:items-center md:justify-center w-screen h-screen md:bg-transparent">
      <Head>
        <title>E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-center font-semibold text-xl  md:text-2xl mt-24 mb-10">
          FE Assessement App
        </h1>{" "}
        <form
          onSubmit={formik.handleSubmit}
          className="relative py-10 px-6 space-y-3 md:mt-0 md:max-w-md md:px-14"
        >
          <input
            className={` form-control ${
              formik.errors.username && formik.touched.username
                ? "!border-red-400"
                : ""
            }`}
            type="username"
            placeholder="Username"
            {...formik.getFieldProps("username")}
          />

          <input
            className={` form-control ${
              formik.errors.password && formik.touched.password
                ? "!border-red-400"
                : ""
            }`}
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
          />
          <button
            disabled={
              formik.errors.username || formik.errors.password ? true : false
            }
            type="submit"
            className="py-3 w-full rounded bg-[#027fff] disabled:bg-gray-300"
          >
            {"Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
