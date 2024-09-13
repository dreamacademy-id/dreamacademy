// components/ProtectedRoute.js
'use client'
import { useEffect } from "react";
import { useAuth } from "../../../../../public/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/pages/login"); // Redirect to login if not authenticated
    }
  }, [currentUser, router]);

  return currentUser ? children : null;
};

export default ProtectedRoute;
