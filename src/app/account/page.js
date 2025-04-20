"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountLayout from "../components/AccountLayout";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
       router.replace("/account/profile");
    }, [router]);

   

  if (loading) {
    return (
      <AccountLayout>
      <></>
      </AccountLayout>
    );
  }

  return null;
};

export default Page;
