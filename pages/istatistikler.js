import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from '../styles/Istatistikler.module.css'

export default function Istatistikler({userData}){
  const [total, setTotal] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    userData?.products?.map( product =>{
      setTotal(total + product.clickProduct)
      
    },
    setTopProducts(userData?.products?.sort(function(a, b) { return a.clickProduct - b.clickProduct; }).slice(0,3).reverse())
    )
  }, []);
  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>
        istatistikler
      </h1>
      <div className={styles.box}>
        <div className={styles.boxinbox}>
          <a className={styles.staticticTitle}>Mağaza Görüntülenme Sayısı</a>
          <a className={styles.staticticValue}>{userData?.clickProfile}</a>
        </div>
        <div className={styles.boxinbox}>
          <a className={styles.staticticTitle}>Toplam İlan Görüntülenme Sayısı</a>
          <a className={styles.staticticValue}>{total}</a>
        </div>
        <div className={styles.boxinboxTop}>
          <a className={styles.staticticTitle}>En Çok Görüntülenen İlanlar</a>
          <div className={styles.productsList}>
            {topProducts.map((product,v) =>{
              const imageArray = product.images.split(",")
              const unit = {
                1 : "tl",
                2 : "£",
                3 : "$"
              }
              const name = product.name.replace(/ /g, '-')
  
  
              return <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
               
                <div className={styles.productCard}>
                  <div className={styles.productLeft}>
                    <Image priority="true" className={styles.productimage} src={imageArray[product.vitrin-1]} height='30' width='50' layout='responsive'/>
                  </div>
                  <div className={styles.productRight}>
                    <a className={styles.productTitle}>{product.name}</a>
                    <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
                  </div>
                </div></a>
              </Link>
             
            })}
          </div>
        </div>
      </div>
    </main>
  </Layout>
}


export const getServerSideProps = async (context) => {
  try {
    const token=context.req.headers.cookie.split(";").find((c) => c.trim().startsWith("OursiteJWT")).split("=")[1];
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = await axios.get('http://localhost:8080/api/user/statistic')
    const userData = data.data
    return {
      props: {
        userData
      },
    }
  } catch (error) {
    const userData = {}
    return {
      props: {
        userData,
      },
    }
  }
}
