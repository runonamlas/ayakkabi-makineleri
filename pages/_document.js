import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='tr'>
        <Head>
          
          <meta name='application-name' content='Ayakkabi Makineleri' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Ayakkabi Makineleri' />
          <meta name='description' content='Her türlü ayakkabi, taban, kemer kesim vb. makinelerin alım satım pazaryeri' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#2f8f9d' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#2f8f9d' />
          <link rel='apple-touch-icon' href='/icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://ayakkabimakineleri.com' />
          <meta name='twitter:title' content='Ayakkabi Makineleri' />
          <meta name='twitter:description' content='Her türlü ayakkabı, taban, kemer kesim vb. makinelerin alım satım pazaryeri' />
          <meta name='twitter:image' content='https://ayakkabimakineleri.com/icon.png' />
          <meta name='twitter:creator' content='@runonamlas' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Ayakkabi Makineleri' />
          <meta property='og:description' content='Her türlü ayakkabı, taban, kemer kesim vb. makinelerin alım satım pazaryeri' />
          <meta property='og:site_name' content='Ayakkabi Makineleri' />
          <meta property='og:url' content='https://ayakkabimakineleri.com' />
          <meta property='og:image' content='https://ayakkabimakineleri.com/icon.png' />

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-F9Y4WQEKCF`}
          />

          <Script id="ga-script" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F9Y4WQEKCF', {
                page_path: window.location.pathname,
              });
                  `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument