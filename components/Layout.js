import Head from "next/head";
import Header from "./Header";

const Layout = ({children, navSelect}) => {
  return <>
    <Head>
      <title>Ayakkabı Makineleri</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header navSelect={navSelect}/>
    {children}
  </>
}

export default Layout