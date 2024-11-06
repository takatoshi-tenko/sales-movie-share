'use client'

import { getHTTPClient } from "@/context/Global";
import { useEffect } from "react";
import VideoUploadForm from "./components/VideoUploadForm";
import User from "./components/User";
import { VideoList } from "./components/VideoList";

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

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">動画管理ページ</h1>

        {/* 動画アップロードフォーム */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">動画をアップロード</h2>
          <VideoUploadForm />
        </div>

        {/* 動画一覧 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">動画一覧</h2>
          <VideoList />
        </div>

        {/* ユーザー情報 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">ユーザー情報</h2>
          <User />
        </div>
      </div>
    </div>
  );
}
