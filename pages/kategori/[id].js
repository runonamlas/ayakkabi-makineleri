import axios from 'axios'
import Image from "next/image";
import Link from "next/link";
import Category from "../../components/Category";
import Layout from "../../components/Layout";
import styles from '../../styles/ProductList.module.css'

export default function AyakkabiMakineleri({ products, params}){
  return <Layout>
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

            return <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
              <div className={styles.productCard}>
                <div className={styles.productLeft}>
                  <Image priority="true" className={styles.productimage} src={imageArray[product.vitrin-1]} height='80' width='100' layout='responsive'/>
                </div>
                <div className={styles.productRight}>
                  <p className={styles.productTitle}>{product.name}</p>
                  <p className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</p>
                  <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  <p className={styles.productAdress}>{product.users.address.split('%')[1]}</p>
                </div>
              </div></a>
            </Link>
            }
          )}
        </div>
      </main>
  </Layout>
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