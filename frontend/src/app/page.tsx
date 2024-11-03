'use client'

import { getHTTPClient } from "@/context/Global";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const client = getHTTPClient();
      client
        .get("http://localhost:3001/up")
        .then((response) => {
          console.log(response.data.data);
        })
        .catch(() => {
          console.error("エラーが発生しました");
        });
    };

    fetchData();
  })

  return <h1>Hello, Next.js!</h1>
}