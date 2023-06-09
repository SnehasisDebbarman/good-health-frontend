import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import Link from "next/link";
import Card from "@/Components/Card";

export default function Index({ data }) {
  const email =
    typeof window !== "undefined"
      ? localStorage?.getItem("userEmail") ?? ""
      : "";

  const [userEmail, setuserEmail] = useState(email);

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <div className="min-h-screen w-full bg-white text-black p-2 md:p-8">
      <h2 className="text-black p-12 text-4xl font-semibold text-center">
        Products {userEmail}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-12">
        {data.map((item, key) => {
          let name = item?.title;
          let image = item?.image;
          let price = item?.price;
          return (
            <div key={key}>
              <Card
                name={name}
                image={image}
                price={price}
                id={data?.id}
                item={item}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
