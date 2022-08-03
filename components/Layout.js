import Head from "next/head";
import Header from "./Header";

const Layout = ({children, navSelect}) => {
  return <>
    <Head>
      <title>Ayakkabı Taban Kesim Kemer Makineleri Burada - Ayakkabı Makineleri</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Sahibinden ayakkabı, taban, kesim, kemer, hazır alt makineleri ve sanayi makineleri alım satım sitesi. İlan vererek kendi makinelerinizi hemen satılık olarak koyabilirsiniz."></meta>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
}

export default Layout