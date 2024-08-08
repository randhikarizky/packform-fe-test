import usePermission from "@/app/global/hooks/usePermission";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { can } = usePermission();

  const router = useRouter();

  useEffect(() => {
    if (can()) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [router.pathname, can()]);

  return <></>;
};

export default Index;
