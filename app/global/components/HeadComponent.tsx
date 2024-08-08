import Head from "next/head";

type Props = {
  title: string;
};

export default function HeadComponent(props: Props) {
  return (
    <Head>
      <title>{props.title} - InAI</title>
    </Head>
  );
}
