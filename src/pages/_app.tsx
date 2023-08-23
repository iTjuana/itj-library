import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import "~/styles/globals.css";

// fontawesome icon config for css working properly - https://fontawesome.com/docs/web/use-with/react/use-with
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// slick carousel css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "~/styles/carousel.css";

// tRPC setup from - https://trpc.io/docs/client/nextjs/setup
import { api } from "utils/trpc";
import Layout from "~/components/layout";

config.autoAddCss = false;

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout
        title="iTj Library"
        description="iTj Library - Borrow and Donate Books"
      >
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
