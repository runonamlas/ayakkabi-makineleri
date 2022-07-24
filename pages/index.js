import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Category from '../components/Category'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home({ products }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Layout navSelect={0}>
  <Category />
  <main className={styles.main}>
    <h1 className={styles.title}>
      son ilanlar
    </h1>
    <div className={styles.productsList}>
      
    </div>
  </main>
</Layout>;

  return (
    <Layout navSelect={0}>
      <Category />
      <main className={styles.main}>
        <h1 className={styles.title}>
          son ilanlar
        </h1>
        <div className={styles.productsList}>
          {products.map(product => {
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
                <a className={styles.productTitle}>{product.name}</a>
                <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a></div></a>
            </Link>
          }
          )}
        </div>
      </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/products')
    const products = data.data
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
