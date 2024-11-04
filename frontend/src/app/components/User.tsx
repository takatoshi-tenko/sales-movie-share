import { getHTTPClient } from "@/context/Global";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const client = getHTTPClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    client
      .post("http://localhost:3001/api/users", data)
      .then((response) => {
        setUsers((prev) => [...prev, response.data]);
        console.log(response);
      })
      .catch(() => {
        console.error("エラーが発生しました");
      });
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
      <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
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
