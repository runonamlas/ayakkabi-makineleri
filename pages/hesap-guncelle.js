import Image from "next/image";
import Layout from "../components/Layout";
import styles from '../styles/HesapGuncelle.module.css'
import * as React from "react";
import citiesList from "../cities.config";

export default function HesapGuncelle(){
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

  var id=2
  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>profili düzenle</h1>
      <form className={styles.formStyle} action="/kaydet" method="post">
        <label className={styles.fieldHead} htmlFor="baslik">şirket adınız*</label>
        <input required className={styles.categoryInput} type="text" id="baslik" name="baslik" placeholder="şirket adınız" maxLength="25" />
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
    

       
        <button type="submit" className={styles.saveButton}>
          kaydet
        </button>
       
      </form>
    </main>
  </Layout>
}