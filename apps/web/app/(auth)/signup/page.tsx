"use client";
import { env } from "process";
import React, { useEffect, useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [formdata, setFormdata] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  function handleFormdata(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(formdata: FormData) {
    console.log("before sending formdata:", formdata);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signup`,
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
  }

  return (
    <div>
      <input
        onChange={handleFormdata}
        type="text"
        name="name"
        value={formdata.name}
        placeholder="Name"
      />
      <input
        onChange={handleFormdata}
        type="email"
        name="email"
        value={formdata.email}
        placeholder="Email"
      />
      <input
        onChange={handleFormdata}
        type="password"
        name="password"
        value={formdata.password}
        placeholder="Password"
      />

      <button onClick={() => handleSubmit(formdata)}>Submit</button>
    </div>
  );
}
