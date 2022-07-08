import Image from "next/image";
import * as React from "react";
import citiesList from "../cities.config";
import Layout from "../components/Layout";
import styles from '../styles/IlanVer.module.css'

export default function IlanVer () {
  const [selectedCity, setSelectedCity] = React.useState();
  const [selectedDistrict, setSelectedDistrict] = React.useState();
  const availableDistrict = citiesList.cities.find((c) => c.name === selectedCity);
  const [selectedFile, setSelectedFile] = React.useState([])
  const [preview, setPreview] = React.useState([])
  const [vitrin, setVitrin] = React.useState(0)

  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
      if (!selectedFile) {
          return
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
      arr.map(a=>{
        setSelectedFile(arr => [...arr, a]);
      })
      
  }

  const deleteimage = i => {
    setSelectedFile(selectedFile.filter((a, index) => index !== i))
    if(vitrin==i){
      setVitrin(0)
    }
  }

  const vitrinimage = i => {
    setVitrin(i)
  }

  return <Layout navSelect={1}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        ilan ver
      </h1>
      <form className={styles.formStyle} action="/kaydet" method="post">
        <label className={styles.fieldHead} htmlFor="category">kategori*</label>
        <select required className={styles.categoryInput} id="category" name="category">
          <option value="ayakkabi-makineleri">Ayakkabı Makineleri</option>
          <option value="taban-makineleri">Taban Makineleri</option>
          <option value="kesim-makineleri">Kesim Makineleri</option>
          <option value="kemer-makineleri">Kemer Makineleri</option>
        </select>
        <label className={styles.fieldHead} htmlFor="baslik">başlık*</label>
        <input required className={styles.categoryInput} type="text" id="baslik" name="baslik" placeholder="başlık" maxLength="25" />
        <label className={styles.fieldHead} htmlFor="marka">marka</label>
        <input required className={styles.categoryInput} type="text" id="marka" placeholder="marka" name="marka" />
        <label className={styles.fieldHead} >adres*</label>
        <div className={styles.adressDiv}>
          
          <div className={styles.adressDownDiv}>
            <select
              required
              placeholder="il"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={styles.adressSelect}
            >
              <option>il seçin</option>
              {citiesList.cities.map((value) => {
                return (
                  <option value={value.name} key={value.name}>
                    {value.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.adressDownDiv}>
            <select
              required
              placeholder="ilçe"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className={styles.adressSelect}
            >
              <option>ilçe seçin</option>
              {availableDistrict?.counties.map((e) => {
                return (
                  <option value={e.name} key={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <textarea required name="message" rows="5"  className={styles.categoryInput} placeholder="açık adres">
        </textarea>
        <label className={styles.fieldHead} >fotograflar*</label>
        <div className={styles.imageDiv} draggable="false">
          {selectedFile &&  preview.map((e, index)=>(
          <div draggable="false" key={index} className={styles.imageDivCup}>
            <button type="button" name="vitrinimage" onClick={()=>vitrinimage(index)} disabled={vitrin==index ? true : false} className={styles.vitrinimage}>vitrin</button>
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
          <input required type="number" className={styles.priceInput} id="marka" name="marka" placeholder="fiyat"  />
          
          <select className={styles.priceSelect} id="price-unit" name="price-unit">
          <option value="tl">tl</option>
          <option value="euro">€</option>
          <option value="dolar">$</option>
        </select>
          </div>
        </div>

       
        <button type="submit" className={styles.saveButton}>
          kaydet
        </button>
       
      </form>
    </main>
  </Layout>
}

