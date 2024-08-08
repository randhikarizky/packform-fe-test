import AuthComponent from "@/app/feature/auth/presentation/components/AuthComponent";
import HeadComponent from "@/app/global/components/HeadComponent";
import { CustomNextPage } from "@/app/global/interfaces/layout";

const Login: CustomNextPage = () => {
  return (
    <>
      <HeadComponent title="Login" />
      <AuthComponent />
    </>
  );
};

Login.useAuthLayout = true;
export default Login;
