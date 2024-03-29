import axios from "axios";
import Head from "next/head";
import Image from "next/future/image";
import Link from "next/link";
import { useState } from "react";
import styles from '../../styles/ProductDetail.module.css';
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function ProductPage({product, owner, }){
  const router = useRouter();
  const images = product.images.split(',')
  const [image, setImage] = useState(images[product.vitrin-1] ? images[product.vitrin-1]: '')
  const [imageIndex, setImageIndex] = useState(images[product.vitrin-1] ? product.vitrin-1 : 0)
  const [showSorun, setShowSorun] = useState(false)
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [iletisim, setIletisim] = useState('')
  const [errorState, setErrorState] = useState(null);

  const changeImage = (image, i) => {
    setImageIndex(i)
    setImage(image)
  }

  const submitSorun = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: iletisim,
        fullname: name,
        subject: iletisim,
        message: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
  setShowSorun(!showSorun)
  }

  const deleteProduct = async() => {
    const cookies = parseCookies()
    axios.defaults.headers.common['Authorization'] = cookies.OursiteJWT;
      await axios.delete(process.env.NEXT_PUBLIC_AXIOS_CONF+"/products/"+product.id).then(response => {
        if(response.status == 200){
          router.push("/")
        }else{
          console.log("error silinemedi.")
        }
      }).catch((error) => {
        console.error('Error:', error.response);
      });
  }

  const soldProduct = async() => {
    const cookies = parseCookies()
    axios.defaults.headers.common['Authorization'] = cookies.OursiteJWT;
      await axios.delete(process.env.NEXT_PUBLIC_AXIOS_CONF+"/products/sold/"+product.id).then(response => {
        if(response.status == 200){
          router.push("/")
        }else{
          console.log("error satıldı isaretlenemedi.")
        }
      }).catch((error) => {
        console.error('Error:', error.response);
      });
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
    1 : "TRY",
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
      <h1 className={styles.productTitle}>{product.name}</h1>
      <section className={styles.productSection}>
        {showSorun && <div onClick={(event)=> {if(event.target !== event.currentTarget) return;
          setShowSorun(!showSorun)}} className={styles.sorunVar}>
          <div onClick={() => {}} className={styles.sorunVarContent}>
            <h2>Sorun Bildir</h2>
            <form className={styles.formStyle} onSubmit={submitSorun}>
        <label className={styles.fieldHead} htmlFor="sorun category">sorun konusu*</label>
        <select required className={styles.categoryInput} value={category} id="sorun-category" name="sorun-category" onChange={(e) => setCategory(e.target.value)}>
          <option value="Geçersiz Fiyat Yazılmış">Geçersiz Fiyat Yazılmış</option>
          <option value="Başkasının Makinesini Satıyor">Başkasının Makinesini Satıyor</option>
          <option value="Böyle Bir Satıcı Yok">Böyle Bir Satıcı Yok</option>
          <option value="Diğer">Diğer</option>
        </select>
        <label className={styles.fieldHead} htmlFor="konu">açıklama*</label>
        <input required className={styles.categoryInput} type="text" id="konu" name="konu" placeholder="açıklama" maxLength="180" value={name} onChange={(e) => setName(e.target.value)} />
        <label className={styles.fieldHead} htmlFor="baslik">iletişim*</label>
        <input required className={styles.categoryInput} type="text" id="iletisim" name="iletisim" placeholder="size ulaşabileceğimiz telefon numarası" maxLength="65" value={iletisim} onChange={(e) => setIletisim(e.target.value)} />
        {errorState && (<div className={styles.errorDiv}>{errorState}</div>)}
        <button type="submit" className={styles.saveButton}>
          kaydet
        </button>
       
      </form>
          </div>
         </div>}
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
          <div className={styles.contentDiv}>
          <div className={styles.productDetailDiv}>
            <a className={styles.productDetailTitle}>Fiyatı</a>
            {product.status ==1 ? 
             <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a> :
              <a className={styles.productPrice}> satıldı</a>}
           
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
          </div>
          <div className={styles.contentDiv}>
          {!owner &&<button type="button" name="delete" onClick={()=>{setShowSorun(!showSorun)}} className={styles.sorunBildir}>sorun bildir</button>}
          <div className={styles.priceAndContactDiv}>

            {!owner ? <div className={styles.buttonsGroup}>
              
              <Link href={{pathname: `/mesaj/${product.users.id}-${product.users.username}`, query: { product: product.id, productName: product.name} }}>
                <div className={styles.mesajButton}>mesaj gönder</div>
              </Link>
              <Link href={`tel:${product.users.callNumber}`} ><div className={styles.callButton}>
                  ara ({product.users.callNumber})</div>
              </Link>
            </div> : <div className={styles.buttonsGroup}>
            {product.status ==1 && <><button type="button" name="sold" onClick={()=>{soldProduct()}} className={styles.callButton}>satıldı olarak işaretle</button>
              <Link href={`/ilan/duzenle?id=${product.id}`} name="duzenle" ><div className={styles.callButton}>ilanı düzenle</div></Link></>}
              <button type="button" name="delete" onClick={()=>{deleteProduct()}} className={styles.callButton}>ilanı sil</button>
            </div>
            }
          </div>
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