import axios from 'axios'
import Image from 'next/future/image'
import Link from 'next/link'
import Category from '../components/Category'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home({ products }) {
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
            return  <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
                  <div key={product.id} className={styles.productCard}>
                  <Image priority="true" className={styles.productimage} src={imageArray[product.vitrin - 1]} height='80' width='100' layout='responsive' />
                <p className={styles.productTitle}>{product.name}</p>
                <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                
                </div></a>
                 </Link>
                
           
          }
        )}
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products/')
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
