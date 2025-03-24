"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";


const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
       router.replace("/account/profile");
    }, [router]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return null;
};

export default Page;
