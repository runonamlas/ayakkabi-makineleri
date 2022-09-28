import axios from "axios";
import {getServerSideSitemap} from "next-sitemap";

export const getServerSideProps  = async (ctx) => {
  const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products')
  const newsSitemaps = data.data.map((item) => ({
    loc: `https://www.ayakkabimakineleri.com/ilan/${item.id}-${item.name.replace(/ /g, '-')}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
  }));

  const magazaSitemaps = data.data.map((item) => ({
    loc: `https://www.ayakkabimakineleri.com/magaza/${product.users.id}-${product.users.username}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
  }));

  const fields = [...newsSitemaps, ...magazaSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}