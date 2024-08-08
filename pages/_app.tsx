import { default as LayoutRegular } from "@/app/global/components/Layout/Layout";
import LayoutAuth from "@/app/global/components/Layout/LayoutAuth";
import { CustomNextPage } from "@/app/global/interfaces/layout";
import { encryptStorage } from "@/app/global/utility/storage";
import ThemeConfig from "@/assets/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type CustomAppProps = AppProps & {
  Component: CustomNextPage;
  pageProps: any;
};

const App = ({ Component, pageProps }: CustomAppProps) => {
  const Layout = Component.useAuthLayout ? LayoutAuth : LayoutRegular;

  useEffect(() => {
    const dummyUser = { email: "admin@gmail.com", password: "12345678" };

    encryptStorage.setItem("dummyUser", JSON.stringify(dummyUser));
  }, []);

  return (
    <>
      <ThemeConfig>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <ReactQueryDevtools />
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ThemeConfig>
    </>
  );
};

export default App;
