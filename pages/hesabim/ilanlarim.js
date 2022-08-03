import axios from "axios";
import Image from "next/future/image";
import Link from "next/link";
import styles from '../../styles/Ilanlarim.module.css'

export default function Ilanlarim({products}){
  if(products){
    const groupByCategory = products?.reduce((group, product) => {
    const { categories } = product;
    group[categories.name] = group[categories.name] ?? [];
    group[categories.name].push(product);
    return group;
  }, {});
    return  <main className={styles.main}>
      <h1 className={styles.title}>ilanlarım</h1>
      <div className={styles.productListDiv}>
      {Object.keys(groupByCategory).map((keyName, i) => (
        <> <h2  className={styles.categoryTitle}>
          {keyName.toLocaleLowerCase()}
        </h2>
        <div className={styles.productList}>
        {groupByCategory[keyName].map(product => {
            const imageArray = product.images.split(",")
            const unit = {
              1: "tl",
              2: "£",
              3: "$"
            }
            const name = product.name.replace(/ /g, '-')
            return <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
              <div className={styles.productCard}>
                <Image priority="true" className={styles.productimage} src={imageArray[product.vitrin - 1]} height='80' width='100' layout='responsive' />
                <p className={styles.productTitle}>{product.name}</p>
                <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p></div></a>
            </Link>
          }
          )}
        </div></>
        ))}
       </div>
    </main>
  }
  return <Layout>
  <main className={styles.main}>
    <h1 className={styles.title}>ilanlarım</h1>
    <div></div>
  </main>
</Layout>
  
  
}

export const getServerSideProps = async (context) => {
  try {
    const token=context.req.headers.cookie.split(";").find((c) => c.trim().startsWith("OursiteJWT")).split("=")[1];
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/user/products')
    const products = data.data
    return {
      props: {
        products
      },
    }
  } catch (error) {
    const products = []
    return {
      props: {
        products,
      },
    }
  }
}
