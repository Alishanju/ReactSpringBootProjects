import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      localStorage.setItem("role", payload.role);

      window.location.reload();
    },
    onError: () => setError("Invalid username or password"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleSubmit} className="border border-black rounded-sm flex flex-col justify-center items-center gap-3 p-3">
      <h2 className="font-semibold underline">Login Form</h2>

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="border border-black pl-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border border-black pl-2 "
      />

      <button type="submit" className="text-white bg-black rounded-sm px-3 py-1">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </div>
  );
}
