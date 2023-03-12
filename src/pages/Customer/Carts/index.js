import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import { faker } from "@faker-js/faker";

import { cartState } from "@/atoms/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalCartValue } from "@/selectors/cart";

export default function Index() {
  const [OrderPlaced, setOrderPlaced] = useState(false);
  const [carts, setCarts] = useRecoilState(cartState);
  const TotalCartValue = useRecoilValue(totalCartValue);
  const email =
    typeof window !== "undefined"
      ? localStorage?.getItem("userEmail") ?? ""
      : "";

  const [userEmail, setuserEmail] = useState(email);

  const others = JSON.stringify(carts ?? "empty");

  useEffect(() => {
    router.beforePopState(async ({ as }) => {
      if (as !== router.asPath) {
        //

        const fakeData = {
          username: faker.name.firstName(),
          email: userEmail,
          phone: faker.phone.number("+91##########"),
          abandonedStatus: !OrderPlaced,
          url: "http://localhost:3001/Customer/Carts",
          others: others,
        };
        const response = await fetch(
          "https://goode-health-server.onrender.com/abandonedCart",
          // "http://localhost:3002/abandonedCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fakeData),
          }
        );
        console.log("user leave the cart", (await response.json()) ?? {});
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, []);

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <div className="min-h-screen w-full bg-white text-black p-8 grid grid-cols-2">
      <div className="">
        <h2 className="text-black p-12 text-4xl font-semibold text-center">
          Shopping Cart
        </h2>
        <div className="grid grid-cols-1">
          {carts ? (
            carts.map((it, i) => {
              return (
                <div className="mx-4 p-4 border-y-2 gap-12" key={i}>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="w-full">
                      <Image
                        height={200}
                        width={200}
                        src={it.image}
                        alt={it.title}
                      />
                    </div>
                    <div className="col-span-3 px-4">
                      <h3 className="text-lg truncate">{it.title}</h3>
                      <p className="text-sm text-slate-400">{it.description}</p>
                      <div className="pt-4 pr-4 flex justify-between items-center">
                        <p className="font-semibold">${it.price}</p>
                        <p className="font-semibold p-2  border-2 rounded">
                          {it.count}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <h2>{JSON.stringify(it)}</h2> */}
                </div>
              );
            })
          ) : (
            <div>No items</div>
          )}
        </div>
      </div>
      <div className="bg-slate-100 h-auto p-10">
        <h3 className="text-2xl mb-6  pt-20">Order Summary</h3>
        <div className="flex justify-between py-3 border-b-2 border-gray-200 text-slate-500">
          <p>Subtotal</p>
          <p>${TotalCartValue}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2 border-gray-200 text-slate-500">
          <p>Shipping Estimate</p>
          <p>$0.00</p>
        </div>
        <div className="flex justify-between py-3 border-b-2 border-gray-200 text-slate-500">
          <p>Tax Estimate</p>
          <p>$0.00</p>
        </div>
        <div className="flex justify-between py-3 text-lg border-gray-200 font-medium">
          <p>Subtotal</p>
          <p>${TotalCartValue}</p>
        </div>

        <button
          onClick={() => {
            setOrderPlaced(true);
            alert("Order Placed");
            setCarts([]);
          }}
          className="mt-3 w-full text-lg bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Place order
        </button>
      </div>
    </div>
  );
}
