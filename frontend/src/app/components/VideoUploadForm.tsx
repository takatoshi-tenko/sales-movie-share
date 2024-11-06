import React, { useState } from 'react';

const VideoUploadForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 動画ファイルの変更ハンドラー
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVideoChange = (event: any) => {
    setVideoFile(event.target.files[0]);
  };
  
  // 画像ファイルの変更ハンドラー
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (event: any) => {
    setImageFile(event.target.files[0]);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    console.log('eの値', e);
    console.log('videoFileの値', videoFile);
    console.log('imageFileの値', imageFile);
    e.preventDefault();
    // 動画ファイルまたは画像ファイルのいずれかが選択されているか確認
    if (!videoFile && !imageFile) return;

    const formData = new FormData();
    if (videoFile) {
      formData.append("video", videoFile); // 動画ファイルを追加
    }
    if (imageFile) {
      formData.append("image", imageFile); // 画像ファイルを追加
    }

    const response = await fetch('http://localhost:3001/api/media', {
      method: 'POST',
      body: formData,
    });
    console.log('responseの値', response);

    if (response.ok) {
      console.log('Files uploaded successfully');
      // アップロード成功後にファイルをリセット
      setVideoFile(null);
      setImageFile(null);
    } else {
      console.log('File upload failed');
    }
  };

  return (
    <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">動画アップロード</h2>
      <p className="text-gray-600 text-center mb-6">ここに動画ファイルをアップロードしてください。</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="video-upload">動画ファイル（オプション）</label>
          <input
            type="file"
            id="video-upload"
            accept="video/*" // 動画ファイルのみに制限
            onChange={handleVideoChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image-upload">画像ファイル（オプション）</label>
          <input
            type="file"
            id="image-upload"
            accept="image/png, image/jpeg" // 画像ファイルのみに制限
            onChange={handleImageChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          />
        </div>

        <div className="mt-4">
          {videoFile && (
            <p className="text-gray-600">
              アップロードされる動画ファイル: <span className="font-semibold">{videoFile.name}</span>
            </p>
          )}
          {imageFile && (
            <p className="text-gray-600">
              アップロードされる画像ファイル: <span className="font-semibold">{imageFile.name}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          アップロード
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
