import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";

import "@src/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default MyApp;
