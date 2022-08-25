import axios from 'axios'
import Image from "next/future/image";
import Head from 'next/head';
import Link from "next/link";
import Category from "../../components/Category";
import styles from '../../styles/ProductList.module.css'

export default function AyakkabiMakineleri({ products, params}){
  return <section className={styles.section}>
          <Head>
        <title>{params[1]} {params[2]}</title>
        <meta name='twitter:title' content={params[1]} />
        <meta property='og:title' content={params[1]}/>
        <meta name='description' content={params[1]}/>
        <meta name='twitter:description' content={params[1]} />
        <meta property='og:description' content={params[1]}/>
      </Head>
    <Category catSelect={params[0]-1}/>
    <main className={styles.main}>
        <h1 className={styles.title}>
          {params[1]} {params[2]}
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
            var date = new Date(product.createdAt);
            return <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
              <div className={styles.productCard}>
                <div className={styles.photoDiv}>
                  <Image priority="true" alt="ayakkabı makinesi resmi" className={styles.productImage} src={imageArray[product.vitrin-1]} height='80' width='100' />
                </div>
                <div className={styles.productInfoDiv}>
                  <p className={styles.productTitle}>{product.name}</p>
                  <p className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</p>
                  <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  <p className={styles.productAdress}>{product.users.address.split('%')[1]}</p>
                  <p className={styles.productDate}>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</p>
                </div>
              </div></a>
            </Link>
            }
          )}
        </div>
      </main>
  </section>
    
}

export const getServerSideProps = async (context) => {
  const params = context.params.id.split("-")
  const id = params[0]
  try {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/product-categories/'+id)
    const products = data.data.products.reverse()

    return {
      props: {
        products,
        params,
      },
    }
  } catch (error) {
    const products = []
    return {
      props: {
        products,
        params,
      },
    }
  }
}
