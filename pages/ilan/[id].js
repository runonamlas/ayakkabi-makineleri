import axios from "axios";
import Head from "next/head";
import Image from "next/future/image";
import Link from "next/link";
import { useState } from "react";
import styles from '../../styles/ProductDetail.module.css';

export default function ProductPage({product, owner, }){
  const images = product.images.split(',')
  const [image, setImage] = useState(images[product.vitrin-1] ? images[product.vitrin-1]: '')
  const [imageIndex, setImageIndex] = useState(images[product.vitrin-1] ? product.vitrin-1 : 0)

  const changeImage = (image, i) => {
    setImageIndex(i)
    setImage(image)
  }

  const leftImage = () => {
    if(images.length > 1 && imageIndex < images.length && imageIndex > 0){
      changeImage(images[imageIndex-1], imageIndex-1)
    }else if(images.length > 1){
      changeImage(images[images.length-1], images.length-1)
    }
  }

  const rightImage = () => {
    if(images.length > 1 && imageIndex < images.length-1){
      changeImage(images[imageIndex+1], imageIndex+1)
    }else if(images.length > 1){
      changeImage(images[0], 0)
    }
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

  return (
    <main className={styles.main}>
      <Head>
        <title>{product.name} - ayakkabi makineleri</title>
        <meta name='twitter:title' content={product.name} />
        <meta property='og:title' content={product.name}/>
        <meta name='description' content={product.name}/>
        <meta name='twitter:description' content={product.name} />
        <meta property='og:description' content={product.name}/>
      </Head>
      <Head>
      
    </Head>
      <h1 className={styles.productTitle}>{product.name}</h1>
      <section className={styles.productSection}>
        <div className={styles.sliderSection}>
          {images.length > 1 && <div className={styles.smallPhotoArea}>
            { 
            images.map((imageUrl, i) => {
              return <div key={imageUrl}  className={styles.smallPhotoOne}>
              <Image key={imageUrl} alt={product.name} className={styles.productSmallImage} src={imageUrl} onClick={()=>{changeImage(imageUrl,i)}} height='100' width='300'/>
              </div>
            })
            }
          </div>}
          <div className={styles.photoArea}>
            {images.length > 1 && <button type="button" name="sag" onClick={()=>{leftImage()}} className={styles.leftbutton}>&lt;</button>}
            {images.length > 1 && <button type="button" name="sol" onClick={()=>{rightImage()}} className={styles.rightbutton}>&gt;</button>}
            <div className={styles.photoDiv}>
              <Image priority="true"  alt={product.name} className={styles.productImage} src={image}  height='700' width='700'/>
            </div>
          </div>
        </div>
        <div className={styles.contentSection}>
        <div className={styles.productDetailDiv}>
            <a className={styles.productDetailTitle}>Fiyatı</a>
            <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
          </div>
          <div className={styles.productDetailDiv}>
            <a className={styles.productDetailTitle}>Satıcı</a>
            <Link href={`/magaza/${product.users.id}-${product.users.username}`}><a className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</a></Link>
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
          <div className={styles.priceAndContactDiv}>
            {!owner && <div className={styles.buttonsGroup}>
              <Link href={{pathname: `/mesaj/${product.users.id}-${product.users.username}`, query: { product: product.id, productName: product.name} }}>
                <div className={styles.mesajButton}>mesaj gönder</div>
              </Link>
              <Link href={`tel:${product.users.callNumber}`} ><div className={styles.callButton}>
                  ara ({product.users.callNumber})</div>
              </Link>
            </div>
            }
          </div>
        </div>
      </section>
    </main>)
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