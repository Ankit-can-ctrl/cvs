"use client";
import React, { useEffect, useState } from "react";

interface Formdata {
  email: string;
  password: string;
}

export default function Signin() {
  const [formdata, setFormdata] = useState<Formdata>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(formdata: Formdata) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    );

    const data = await response.json();
    console.log(data);
    alert(data.message);
  }

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

  return (
    <div>
      <input
        onChange={handleChange}
        type="email"
        name="email"
        value={formdata.email}
        placeholder="Email"
      />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        value={formdata.password}
        placeholder="Password"
      />
      <button onClick={() => handleSubmit(formdata)}>Signin</button>
    </div>
  );
}
