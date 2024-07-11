import Head from "next/head";

type Props = {
  title: string;
};

export default function HeadComponent(props: Props) {
  return (
    <Head>
      <title>{props.title} - GURILAP</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Signika+Negative:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <script
        src="https://kit.fontawesome.com/73d927d61d.js"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      />
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      />
    </Head>
  );
}
