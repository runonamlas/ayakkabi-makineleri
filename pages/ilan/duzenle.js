import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import styles from '../../styles/IlanVer.module.css'
import Head from "next/head";

export default function Duzenle ({product}) {
  const router = useRouter();
  const [buttonState, setButtonState] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const [selectedFile, setSelectedFile] = useState([])
  const [preview, setPreview] = useState([])
  const [vitrinState, setVitrin] = useState(0)

  const [name, setName] = useState(product?.name)
  const [brand, setBrand] = useState(product?.brand)
  const [used, setUsed] = useState(product?.used)
  const [price, setPrice] = useState(product?.price)
  const [priceUnit, setPriceUnit] = useState(product?.priceUnit)
  const [categoryID, setCategoryID] = useState(product?.categories.id)

  useEffect(() => {
      if (!selectedFile) {
          return
      }
      if(selectedFile.length>6){
        setSelectedFile(selectedFile.slice(0,6))
      }
      setPreview([])
      selectedFile.map(e=>{
        if(typeof e === 'string' || e instanceof String){
          setPreview(arr => [...arr, e])
        }else{
          const objectUrl = URL.createObjectURL(e)
          setPreview(arr => [...arr, objectUrl])
          return () => URL.revokeObjectURL(e)
        }
      }
      )
  }, [selectedFile])

  useEffect(()=>{
    const cookies = parseCookies()
    if(!cookies.OursiteJWT){
      router.push('/giris-yap')
    }
    const images = product?.images.split(',')
    setSelectedFile(images)
  },[])
  // create a preview as a side effect, whenever selected file is changed
  
  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          return
      }
      const arr = Array.from(e.target.files);
      arr = arr.slice(0,6)
      arr.map(a=>{
        setSelectedFile(arr => [...arr, a]);
      })
      
      
  }

  const deleteimage = i => {
    setSelectedFile(selectedFile.filter((a, index) => index !== i))
    if(vitrinState==i){
      setVitrin(0)
    }
  }

  const vitrinimage = i => {
    setVitrin(i)
  }


  const submitLogin = async (event) => {
    setButtonState(true);
    event.preventDefault();
    const cookies = parseCookies()
    const imageArray = [];
    for (const file of selectedFile) {
      if(typeof file === 'object' || file instanceof Object){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my-uploads');
        await axios('https://api.cloudinary.com/v1_1/ayakkabimakineleri/image/upload/I_watermarks_kkddiq', {
          method: 'POST',
          data: formData
        }).then(r => {
          imageArray.push(r.data.secure_url)
        });
      }else{
        imageArray.push(file)
      }
    }
    if (selectedFile.length == 0 ){
      setButtonState(false);
      setErrorState('En az bir tane resim ekleyin.')
    }else if (imageArray.length == 0 ){
      setButtonState(false);
      setErrorState('Bir hata oluştu. Lütfen tekrar deneyin.')
    }else{
      const images = imageArray.toString()
      const vitrin = vitrinState+1
      const id = product.id
      console.log(id)
      const groupData = {
        id, name, images, brand, used, price, priceUnit, categoryID, vitrin
      }
      
      axios.defaults.headers.common['Authorization'] = cookies.OursiteJWT;
      await axios.put(process.env.NEXT_PUBLIC_AXIOS_CONF+"/products/update",groupData).then(response => {
        router.push('/guncelle')
      }).catch((error) => {
        console.error('Error:', error.response);
      });
    }
  }

  return <main className={styles.main}>
      <Head>
        <title>ilan güncelle - ayakkabi makineleri</title>
        <meta name='description' content='Ürünlerinizi hızlı ve kolay satmak için hemen ilanınızı yayınlayın. Tüm ayakkabı taban kesim vb makinelerinin arasında sizde yer alın.' />
        <meta name='twitter:url' content='https://ayakkabimakineleri.com/ilan-ver' />
        <meta name='twitter:title' content='ilan ver - ayakkabi makineleri' />
        <meta name='twitter:description' content='Ürünlerinizi hızlı ve kolay satmak için hemen ilanınızı yayınlayın. Tüm ayakkabı taban kesim vb makinelerinin arasında sizde yer alın.' />
        <meta property='og:title' content='ilan ver - ayakkabi makineleri' />
        <meta property='og:description' content='Ürünlerinizi hızlı ve kolay satmak için hemen ilanınızı yayınlayın. Tüm ayakkabı taban kesim vb makinelerinin arasında sizde yer alın.' />
        <meta property='og:url' content='https://ayakkabimakineleri.com/ilan-ver' />
      </Head>
      <h1 className={styles.title}>
        ilan güncelle
      </h1>
      {buttonState ? (<div className={styles.loaderDiv}><div className={styles.loader}></div><a>kaydediliyor..</a></div>) : (
        <form className={styles.formStyle} onSubmit={submitLogin}>
        <label className={styles.fieldHead} htmlFor="category">kategori*</label>
        <select required className={styles.categoryInput} id="category" value={categoryID-1} name="category" onChange={(e) => setCategoryID(parseInt(e.target.value))}>
          <option value="1">Ayakkabı Makineleri</option>
          <option value="2">Taban Makineleri</option>
          <option value="3">Kesim Makineleri</option>
          <option value="4">Kemer Makineleri</option>
        </select>
        <label className={styles.fieldHead} htmlFor="baslik">başlık*</label>
        <input required className={styles.categoryInput} type="text" id="baslik" name="baslik" placeholder="başlık" maxLength="65" value={name} onChange={(e) => setName(e.target.value)} />
        <label className={styles.fieldHead} htmlFor="marka">marka</label>
        <input required className={styles.categoryInput} type="text" id="marka" placeholder="marka" name="marka" value={brand} onChange={(e) => setBrand(e.target.value)}/>
        <label className={styles.fieldHead} htmlFor="category">durumu*</label>
        <select required className={styles.categoryInput} id="category" name="category" onChange={(e) => setUsed(e.target.value)}>
          <option value="ikinci el">ikinci el</option>
          <option value="sıfır">sıfır</option>
        </select>
        <label className={styles.fieldHead} >fotograflar*</label>
        <div className={styles.imageDiv} draggable="false">
          {selectedFile &&  preview.map((e, index)=>(
          <div draggable="false" key={index} className={styles.imageDivCup}>
            <button type="button" name="vitrinimage" onClick={()=>vitrinimage(index)} disabled={vitrinState==index ? true : false} className={styles.vitrinimage}>vitrin</button>
            <button type="button" name="deleteimage" onClick={()=>deleteimage(index)} className={styles.deleteimage}>X</button>
            <Image key={index} draggable="false"  alt="ayakkabı makinesi resmi" className={styles.productimage} src={e} height='150' width='200' />
          </div>)) }
        </div>
        {selectedFile.length>=6 ? (<a className={styles.maxImages}>en fazla 6 adet resim yükleyebilirsiniz</a>):(
          <label className={styles.customFileUpload}>
            <input type='file' accept="images/*" className={styles.imageInput} onChange={onSelectFile} multiple/>
            fotograf seç
          </label>
        )}

        <label className={styles.fieldHead} >fiyat*</label>
        <div className={styles.adressDiv}>
          <div >
          <input required type="number" className={styles.priceInput} id="marka" name="marka" placeholder="fiyat" value={price} onChange={(e) => setPrice(e.target.value)} />
          
          <select className={styles.priceSelect} id="price-unit" name="price-unit" onChange={(e) => setPriceUnit(parseInt(e.target.value))}>
          <option value="1">tl</option>
          <option value="2">€</option>
          <option value="3">$</option>
        </select>
          </div>
        </div>

        {errorState && (<div className={styles.errorDiv}>{errorState}</div>)}
        <button type="submit" className={styles.saveButton} disabled={buttonState}>
          güncelle
        </button>
       
      </form>
      )}
    </main>
}

export const getServerSideProps = async (context) => {
  try{
    const token=context.req.headers.cookie?.split(";").find((c) => c.trim().startsWith("callNumber"))?.split("=")[1];
    const id = context.query['id']
    const {data} = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products/'+id)
    const product =data.data
    if(product.users.callNumber == token ){
      return {
      props: {
        product,
      },
    }
  }else{
    const product = {}
    return {
      props: {
        product,
      },
    }
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