//  we will activate once we know what to put there
// import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/globals.css";

import "../assets/css/animate.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/font-awsome-all.min.css";
import "../assets/css/icofont.min.css";
import "../assets/css/slick.css";
import "../assets/css/meanmenu.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/style.css";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { ToastProvider } from "react-toast-notifications";
import Amplify from "aws-amplify";
import theme from "../theme";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>DR Conference </title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ToastProvider autoDismiss>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ToastProvider>
    </ChakraProvider>
  );
}

export default MyApp;
