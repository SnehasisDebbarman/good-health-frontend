import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { cartState } from "@/atoms/cart";
import { useRecoilState } from "recoil";

export default function Card({ name, image, price, id, item }) {
  const [carts, setCarts] = useRecoilState(cartState);
  const [Count, setCount] = useState(0);

  const CounterHandler = (value) => {
    const existingItem = carts.find((it) => it.id === item.id);
    // setCount(existingItem.count);
    let newCart;
    if (existingItem) {
      let FilteredCart = carts.filter(
        (cartItem) => cartItem.id !== existingItem.id
      );

      let newCount = existingItem.count + value;
      setCount(newCount);
      if (newCount <= 0) {
        newCart = FilteredCart;
      } else {
        newCart = [...FilteredCart, { ...existingItem, count: newCount }];
      }
    } else {
      setCount(1);
      newCart = [...carts, { ...item, count: 1 }];
    }

    setCarts([...new Set(newCart)]);
  };

  return (
    <div
    //   href={{
    //     pathname: "/Customer/[name]",
    //     query: {
    //       name: name,
    //       price: price,
    //       image: image,
    //     },
    //   }}
    >
      <div className=" group relative shadow-lg p-2 md:p-4 rounded">
        <Link
          href={{
            // pathname: `/Customer/[id]`,
            pathname: "/Customer",
            query: {
              id: id,
            },
          }}
        >
          <div className="grid place-items-center rounded-md bg-white group-hover:opacity-75">
            <Image
              height={480}
              width={640}
              src={image}
              alt={name}
              className="h-2/3 md:h-1/2 md:w-1/2 object-contain object-center aspect-square"
            />
          </div>
          <div className="mt-4  justify-between grid grid-cols-3">
            <div className="col-span-2">
              <h3 className="text-sm text-gray-700 truncate">{name}</h3>
            </div>

            <p className="text-sm font-medium text-gray-900 text-right">
              ${price}
            </p>
          </div>
        </Link>
        <div className="w-full grid grid-cols-2 gap-2 md:gap-4 py-1 md:py-2 ">
          <div className="flex flex-row  h-10  rounded-lg relative bg-transparent">
            <button
              onClick={() => CounterHandler(-1)}
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-12 md:w-20 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-sm md:text-2xl font-thin">−</span>
            </button>
            <input
              // type="number"
              className="px-0 md:px-2 outline-none focus:outline-none text-center w-full md:w-2/3 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  "
              name="custom-input-number"
              value={Count}
            ></input>
            <button
              onClick={() => CounterHandler(1)}
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-12 md:w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-sm md:text-2xl font-thin">+</span>
            </button>
          </div>
          <Link className="w-full" href="/Customer/Carts">
            <button className="w-full h-10 text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 md:px-4 rounded">
              Go To Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
