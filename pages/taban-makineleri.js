import axios from 'axios'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Category from "../components/Category";
import Layout from "../components/Layout";
import styles from '../styles/ProductList.module.css'

export default function TabanMakineleri({ products}){
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Layout>
  <Category catSelect={2}/>
  <main className={styles.main}>
      <h1 className={styles.title}>
        ayakkabı makineleri
      </h1>
      <div className={styles.productsList}>      
      </div>
    </main>
</Layout>;
  return <Layout>
    <Category catSelect={2}/>
    <main className={styles.main}>
        <h1 className={styles.title}>
          taban makineleri
        </h1>
        <div className={styles.productsList}>
        { products.map(product => {
            const imageArray = product.images.split(",")
            const unit = {
              1 : "tl",
              2 : "£",
              3 : "$"
            }
            const name = product.name.replace(/ /g, '-')
            const nameArray = product.users.username.split("-")
            var nameConfig = ''
            nameArray.forEach(e=>{
              const nameParse = e.charAt(0).toUpperCase()+ e.slice(1) + " "
              nameConfig += nameParse
            })

            return <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
              <div className={styles.productCard}>
                <div className={styles.productLeft}>
                  <Image priority="true" className={styles.productimage} src={imageArray[product.vitrin-1]} height='80' width='100' layout='responsive'/>
                </div>
                <div className={styles.productRight}>
                  <a className={styles.productTitle}>{product.name}</a>
                  <a className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</a>
                  <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
                  <a className={styles.productAdress}>{product.users.address.split('%')[1]}</a>
                </div>
              </div></a>
            </Link>
            }
          )}
        </div>

       
      </main>
  </Layout>
}

export const getStaticProps = async () => {
  try {
    const {data} = await axios.get('http://localhost:8080/api/product-categories/2')
    const products = data.data.products.reverse()

    return {
      props: {
        products,
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
