import { getHTTPClient } from "@/context/Global";
import { useEffect, useState } from "react";

type Media = {
  key: string;
  url: string;
  type: string;
};

export function FileList() {
  const [videos, setVideos] = useState<Media[]>([]);
  const [imgs, setImgs] = useState<Media[]>([]);

  const client = getHTTPClient();

  useEffect(() => {
    client
      .get("http://localhost:3001/api/media")
      .then((response) => {
        const videos = response.data.filter((data: any) => data.type === 'video');
        const imgs = response.data.filter((data: any) => data.type === 'image');
        setVideos(videos);
        setImgs(imgs);
      })
      .catch(() => {
        console.error("エラーが発生しました");
      });
  }, []);

  return (
    <div className="p-4">
      <ul className="space-y-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <li key={video.key} className="media-card">
            <video
              controls
              src={video.url}
              className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </li>
        ))}
        {imgs.map((img) => (
          <li key={img.key} className="media-card">
            <img
              src={img.url}
              alt=""
              className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
