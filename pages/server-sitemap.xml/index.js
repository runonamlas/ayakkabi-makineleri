import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products')
  const newsSitemaps = data.data.map((item) => ({
    loc: `https://www.ayakkabimakineleri.com/ilan/${product.id}-${product.name.replace(/ /g, '-')}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}