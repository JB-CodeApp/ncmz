"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { AUTHORS } from "@/data/blogs";

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("islogin") === "true") {
      router.push("/dashboard/posts");
      window.location.reload();
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Email and password are required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Invalid email.");

    const hashedPassword = await hashPassword(password);
    const user = AUTHORS.find((u) => u.email === email && u.password === hashedPassword);

    if (!user) return setError("Invalid credentials.");

    localStorage.setItem("islogin", "true");
    localStorage.setItem("user", user.slug);
    router.push("/dashboard/posts");
  };

  return (
    <form className="grid gap-6" onSubmit={handleLogin}>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ButtonPrimary type="submit">Continue</ButtonPrimary>
    </form>
  );
};

export default LoginForm;
