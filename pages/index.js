import axios from 'axios'
import Image from 'next/future/image'
import Link from 'next/link'
import Category from '../components/Category'
import styles from '../styles/Home.module.css'

export default function Home({ products }) {
  return (
      <section className={styles.section}>
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
                  <div className={styles.photoDiv}>
                    <Image  alt="ayakkabı makinesi resmi" priority="true" className={styles.productImage} src={imageArray[product.vitrin - 1]} height='100' width='100'/>
                  </div>
                  <div className={styles.productInfoDiv}>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productAddress}>{product.users.address.split('%')[1]}</p>
                    <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  </div>
                  
                </div>
              </a></Link>
            }
          )}
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
                  <div className={styles.photoDiv}>
                    <Image  alt="ayakkabı makinesi resmi" priority="true" className={styles.productImage} src={imageArray[product.vitrin - 1]} height='100' width='100'/>
                  </div>
                  <div className={styles.productInfoDiv}>
                    <p className={styles.productTitle}>{product.name}</p>
                    <p className={styles.productAddress}>{product.users.address.split('%')[1]}</p>
                    <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  </div>
                  
                </div>
              </a></Link>
            }
          )}
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
                  <div className={styles.photoDiv}>
                    <Image  alt="ayakkabı makinesi resmi" priority="true" className={styles.productImage} src={imageArray[product.vitrin - 1]} height='100' width='100'/>
                  </div>
                  <div className={styles.productInfoDiv}>
                    <p className={styles.productTitle}>{product.name}</p>
                    <p className={styles.productAddress}>{product.users.address.split('%')[1]}</p>
                    <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  </div>
                  
                </div>
              </a></Link>
            }
          )}
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
                  <div className={styles.photoDiv}>
                    <Image  alt="ayakkabı makinesi resmi" priority="true" className={styles.productImage} src={imageArray[product.vitrin - 1]} height='100' width='100'/>
                  </div>
                  <div className={styles.productInfoDiv}>
                    <p className={styles.productTitle}>{product.name}</p>
                    <p className={styles.productAddress}>{product.users.address.split('%')[1]}</p>
                    <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  </div>
                  
                </div>
              </a></Link>
            }
          )}
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
                  <div className={styles.photoDiv}>
                    <Image  alt="ayakkabı makinesi resmi" priority="true" className={styles.productImage} src={imageArray[product.vitrin - 1]} height='100' width='100'/>
                  </div>
                  <div className={styles.productInfoDiv}>
                    <p className={styles.productTitle}>{product.name}</p>
                    <p className={styles.productAddress}>{product.users.address.split('%')[1]}</p>
                    <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                  </div>
                  
                </div>
              </a></Link>
            }
          )}
          </div>
        </main>
      </section>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products')
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
