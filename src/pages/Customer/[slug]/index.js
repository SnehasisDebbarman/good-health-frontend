import React from "react";
import { useRouter } from "next/router";

export default function Page({ data }) {
  const router = useRouter();
  const { pd } = router;
  return <div>Post: {JSON.stringify(data)}</div>;
}

export async function getServerSideProps(context) {
  console.log(context.query);
  const res = await fetch(
    "https://fakestoreapi.com/products/" + context.query.slug
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
