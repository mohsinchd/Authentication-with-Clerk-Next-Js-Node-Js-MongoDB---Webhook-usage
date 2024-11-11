"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";

const DetailsUser = () => {
  const { getToken } = useAuth();
  const getUserDetail = async () => {
    const token = await getToken();

    try {
      const response = await fetch("http://localhost:5000/api/v1/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div>
      <button onClick={getUserDetail}>Click to call api</button>
    </div>
  );
};

export default DetailsUser;
