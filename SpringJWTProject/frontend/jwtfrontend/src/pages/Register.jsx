import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => alert("User registered successfully"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
    return;
  }
    mutation.mutate(form);
      setForm({ username: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-sm">
    <form onSubmit={handleSubmit} className="border border-black flex flex-col justify-center items-center gap-3 p-3">
      <h2 className="font-semibold underline">Register Form</h2>

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
        className="border border-black pl-2"
      />

      <button type="submit" className="text-white bg-black rounded-sm px-3 py-1">Register</button>
    </form>
    </div>
  );
}
