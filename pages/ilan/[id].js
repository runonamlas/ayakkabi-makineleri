import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Layout from "../../components/Layout";
import styles from '../../styles/ProductDetail.module.css';

export default function ProductPage({product, owner, }){
  const images = product.images.split(',')
  const [image, setImage] = React.useState(images[product.vitrin-1] ? images[product.vitrin-1]: '')
  const changeImage = (i) => {
    setImage(i)
  }
  const unit = {
    1 : "tl",
    2 : "£",
    3 : "$"
  }
  const nameArray = product.users.username.split("-")
  var nameConfig = ''
  nameArray.forEach(e=>{
    const nameParse = e.charAt(0).toUpperCase()+ e.slice(1) + " "
    nameConfig += nameParse
  })

  const used = product.used.charAt(0).toUpperCase()+ product.used.slice(1)

  return (<Layout>
    <Head>
      <title>{product.name}</title>
    </Head>
    <main className={styles.main}>
      <h1 className={styles.productTitle}>{product.name}</h1>
      <section className={styles.sliderSection}>
        
      </section>
      <section className={styles.contentSection}>

      </section>
     {/*
       <div className={styles.left}>
        <div className={styles.imageTop}>
          <button type="button" name="sag" onClick={()=>{}} className={styles.leftbutton}>&lt;</button>
          <Image className={styles.productimage} src={image}  height='700' width='700'/>
          <button type="button" name="sol" onClick={()=>{}} className={styles.rightbutton}>&gt;</button>

        </div>
        <div className={styles.imageDown}>
        { images.map(imageUrl => {
            return <Image key={imageUrl} className={styles.productimage} src={imageUrl} onClick={()=>{changeImage(imageUrl)}}  height='100' width='100'/>
            }
          )}
          </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>Satıcı</a>
          <Link href={`/magaza/${product.users.username}`}><a className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</a></Link>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>İlan Tarihi</a>
          <a className={styles.productDetailData}>{product.createdAt.substring(0,10)}</a>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>İlan Adresi</a>
          <a className={styles.productDetailData}>{product.users.address.split('%')[1]}</a>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>Marka</a>
          <a className={styles.productDetailData}>{product.brand}</a>
        </div>
        <div className={styles.productDetailDiv}>
          <a className={styles.productDetailTitle}>Durumu</a>
          <a className={styles.productDetailData}>{used}</a>
        </div>
        <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
        {!owner && <>
          <Link href={{pathname: `/mesaj/${product.users.id}-${product.users.username}`, query: { product: product.id, productName: product.name} }}><div className={styles.mesajButton}>
          mesaj gönder</div>
        </Link>
        <Link href={`tel:${product.users.callNumber}`} ><div className={styles.callButton}>
            ara ({product.users.callNumber})</div>
        </Link>
        </>
        }
        

      </div>
      */  }
    </main>
    
  </Layout>)
}

export const getServerSideProps = async (context) => {
  try {
    const token=context.req.headers.cookie?.split(";").find((c) => c.trim().startsWith("callNumber"))?.split("=")[1];
    const params = context.params.id
    const id = params.split('-')
    const {data} = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products/'+id[0])
    const product = data.data
    var owner = false
    if(product.users.callNumber == token ) owner=true
    return {
      props: {
        product,
        owner,
      },
    }
  } catch (error) {
    const product = {}
    return {
      props: {
        product,
        owner:false,
      },
    }
  }
}