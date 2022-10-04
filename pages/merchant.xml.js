import axios from "axios";

const Merchant = () => {};

const toProduct = (product) => {
	const name = product.name.replace(/ /g, '-')
	const imageArray = product.images.split(",")
	const unit = {
		1: "tl",
		2: "£",
		3: "$"
	}
  return `<item> 
	<g:id>${product.id}</g:id>
	<title>${product.name}</title>
	<link>https://www.ayakkabimakineleri.com/ilan/${product.id}-${name}</link>
	<description>${product.name}</description>
	<g:image_link>${imageArray[product.vitrin - 1]}</g:image_link> 
	<g:price>${product.price} ${unit[product.priceUnit]}</g:price> 
	<g:availability>in_stock</g:availability> 
	<g:brand>${product.brand}</g:brand>   
	<g:update_type>merge</g:update_type> 
	</item> `
}
;
  
const createSitemap = (productList) => `<?xml version="1.0"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">

<channel>
<title>Merchant</title> 
<link>http://www.ayakkabimakineleri.com</link> 
<description>ayakkabimakineleri.com product list</description> 

${productList.map((product) => toProduct(product)).join("")}
</channel> </rss>

`;
	
export async function getServerSideProps({ res, req }) {      
	const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products')
  const products = data.data
	const sitemap = createSitemap(products);
	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();
	return { props: { results : {products}}}
};

export default Merchant