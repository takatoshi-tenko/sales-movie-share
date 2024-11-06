import { getHTTPClient } from "@/context/Global";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const client = getHTTPClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Railsが期待する形にキーを付ける
    formData.append("user[name]", formData.get("name") as string);
    formData.append("user[email]", formData.get("email") as string);
    formData.append("user[password]", formData.get("password") as string);
    
    // 画像ファイルもラップする
    if (formData.get("avatar")) {
      formData.append("user[avatar]", formData.get("avatar") as File);
    }
    
    // 不要なフィールドを削除（もしあれば）
    formData.delete("name");
    formData.delete("email");
    formData.delete("password");
    formData.delete("avatar");
  
    client
      .post("http://localhost:3001/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {
        console.error("エラーが発生しました");
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    client
      .get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(() => {
        console.error("エラーが発生しました");
      });
  }
  , []);

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-md p-6 bg-white rounded-lg shadow-md space-y-4" encType="multipart/form-data">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">名前</label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">プロフィール画像</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Profile Preview" className="mt-4 w-32 h-32 object-cover rounded-full shadow-md" />
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          送信
        </button>
      </div>
    </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">ユーザー一覧</h2>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="bg-white shadow-md p-4 rounded-lg">
              <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
