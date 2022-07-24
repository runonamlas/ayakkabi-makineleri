import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import * as React from "react";
import Layout from "../components/Layout";
import styles from '../styles/IlanVer.module.css'

export default function IlanVer () {
  const router = useRouter();
  const [buttonState, setButtonState] = React.useState(false);
  const [errorState, setErrorState] = React.useState(null);

  const [selectedFile, setSelectedFile] = React.useState([])
  const [preview, setPreview] = React.useState([])
  const [vitrinState, setVitrin] = React.useState(0)

  const [name, setName] = React.useState('')
  const [brand, setBrand] = React.useState('')
  const [used, setUsed] = React.useState('ikinci el')
  const [price, setPrice] = React.useState(0)
  const [priceUnit, setPriceUnit] = React.useState(1)
  const [categoryID, setCategoryID] = React.useState(1)

  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
      if (!selectedFile) {
          return
      }
      if(selectedFile.length>6){
        setSelectedFile(selectedFile.slice(0,6))
      }
      setPreview([])
      selectedFile.map(e=>{
        const objectUrl = URL.createObjectURL(e)
        setPreview(arr => [...arr, objectUrl])
        return () => URL.revokeObjectURL(e)
      }
      )
  }, [selectedFile])

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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');
      await axios('https://api.cloudinary.com/v1_1/ayakkabimakineleri/image/upload', {
        method: 'POST',
        data: formData
      }).then(r => {
        imageArray.push(r.data.secure_url)
      });
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
      const groupData = {
        name, images, brand, used, price, priceUnit, categoryID, vitrin
      }
      
      axios.defaults.headers.common['Authorization'] = cookies.OursiteJWT;
      await axios.post("http://localhost:8080/api/products/add",groupData).then(response => {
        router.push('/kaydet')
      }).catch((error) => {
        console.error('Error:', error.response);
      });
    }
  }

  return <Layout navSelect={1}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        ilan ver
      </h1>
      {buttonState ? (<div className={styles.loaderDiv}><div className={styles.loader}></div><a>kaydediliyor..</a></div>) : (
        <form className={styles.formStyle} onSubmit={submitLogin}>
        <label className={styles.fieldHead} htmlFor="category">kategori*</label>
        <select required className={styles.categoryInput} id="category" name="category" onChange={(e) => setCategoryID(parseInt(e.target.value))}>
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
            <Image key={index} draggable="false" className={styles.productimage} src={e} height='150' width='200' />
          </div>)) }
        </div>
        {selectedFile.length>=6 ? (<a className={styles.maxImages}>en fazla 6 adet resim yükleyebilirsiniz</a>): (
          <label className={styles.customFileUpload}>
            <input type='file' accept="image/png, image/jpeg, image/jpg" className={styles.imageInput} onChange={onSelectFile} multiple/>
            fotograf seç
          </label>
            
        ) }

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
          kaydet
        </button>
       
      </form>
      )}
    </main>
  </Layout>
}