"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRecoilState } from "recoil";
import { messageState } from "@/atoms/admin";

export default function Page() {
  const [sentMessages, setSentMessages] = useState([]);
  const [UniqueOrderId, setUniqueOrderId] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [messagesSent, setMessageSent] = useRecoilState(messageState);

  useEffect(() => {
    // localStorage.removeItem("userEmail");
    fetchData();
  }, []);
  useEffect(() => {
    console.log(sentMessages);
    selectedOrderId();
  }, [sentMessages]);
  useEffect(() => {
    console.log(UniqueOrderId);
  }, [UniqueOrderId]);

  const fetchData = async () => {
    let res = await fetch(
      "https://goode-health-server.onrender.com/sentMessages"
    );
    const messages = await res.json();
    setLoading(false);
    setSentMessages(messages);
    setMessageSent(messages);
  };

  const selectedOrderId = () => {
    let orderIds = sentMessages.map((it) => {
      if (!it?.abandonedStatus) {
        return it.orderId;
      }
    });

    setUniqueOrderId([...new Set(orderIds)]);
  };

  if (Loading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <div className="py-8 w-full  bg-slate-300 ">
        <div className="grid grid-cols-2">
          <div className=" p-20 mt-40 grid grid-cols-2 gap-5">
            <div className=" h-32 p-5 bg-white rounded-lg ">
              <h3 className=" text-black text-center">Total Messages sent</h3>
              <p className="text-black text-4xl text-center pt-4">
                {messagesSent.length}
              </p>
            </div>
            <div className=" h-32 p-5 bg-white rounded-lg">
              <h3 className=" text-black text-center">
                Total orders left in cart
              </h3>
              <p className="text-black text-4xl text-center pt-4">
                {UniqueOrderId.length}
              </p>
            </div>
          </div>
          <div className="">
            <h2 className="text-center text-3xl text-slate-800 py-12">
              Sent Messages
            </h2>
            <div className="h-[70vh] overflow-y-auto w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-4 place-items-center gap-2">
              {messagesSent?.map((message, i) => {
                const status = UniqueOrderId.includes(message.orderId);
                return (
                  <div
                    key={i}
                    className={
                      (status ? "bg-gray-200" : "bg-white") +
                      " p-4 shadow rounded w-full "
                    }
                  >
                    <div className="flex items-center border-b border-gray-200 ">
                      <div className="flex items-start justify-between w-full">
                        <div className="pl-3 w-full">
                          <p className="text-xl font-medium leading-5 text-gray-800">
                            {message.username}
                          </p>
                          <p className="text-sm leading-normal pt-2 text-gray-500">
                            {moment(message?.createdAt).format(
                              "hh:mm A , D MMM Y"
                            )}
                          </p>
                        </div>
                        <svg
                          width={28}
                          height={28}
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
                            stroke="#2C3E50"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="px-2">
                      <p className="text-sm leading-5 py-1 text-gray-600">
                        {message?.sendMessage}
                      </p>
                      <div className="flex">
                        <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                          {status ? "false" : "true"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
