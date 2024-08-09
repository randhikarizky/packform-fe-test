import HeadComponent from "@/app/global/components/HeadComponent";
import { CustomNextPage } from "@/app/global/interfaces/layout";

const Dashboard: CustomNextPage = () => {
  return (
    <>
      <HeadComponent title="Dashboard" />
      {/* <AuthComponent /> */}
    </>
  );
};

Dashboard.useAuthLayout = false;
export default Dashboard;
