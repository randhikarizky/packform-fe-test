import usePermission from "@/app/global/hooks/usePermission";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { can } = usePermission();

  const router = useRouter();

  useEffect(() => {
    router.push("");
  }, []);

  return <></>;
};

export default Index;
