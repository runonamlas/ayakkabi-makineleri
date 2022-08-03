import styles from '../../styles/HesapGuncelle.module.css'
import * as React from "react";
import citiesList from "../../cities.config";
import { parseCookies, setCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";

export default function HesapGuncelle(){
  const [selectedCity, setSelectedCity] = React.useState();
  const [selectedDistrict, setSelectedDistrict] = React.useState();
  const [username, setUsername] = React.useState('')
  const [openAddress, setOpenAddress] = React.useState('')
  const availableDistrict = citiesList.cities.find((c) => c.name === selectedCity);
  const [buttonState, setButtonState] = React.useState(false);
  const router = useRouter();


  const submitLogin = async (event) => {
    setButtonState(true);
    event.preventDefault();
    const cookies = parseCookies()
    const address = openAddress+"%"+selectedDistrict+"&"+selectedCity
      
      const groupData = {
        username, address
      }
      
      axios.defaults.headers.common['Authorization'] = cookies.OursiteJWT;
      await axios.put(process.env.NEXT_PUBLIC_AXIOS_CONF+"/api/user/profile",groupData).then(response => {
        setCookie(null, 'name', response.data.data.username, {
          secure: process.env.NODE_ENV !== "development",
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        });
        setCookie(null, 'address', response.data.data.address, {
          secure: process.env.NODE_ENV !== "development",
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        })
        router.push('/hesabim')
        
      }).catch((error) => {
        console.error('Error:', error.response);
      });
  }

  return <main className={styles.main}>
      <h1 className={styles.title}>profili düzenle</h1>
      <form className={styles.formStyle} onSubmit={submitLogin}>
        <label className={styles.fieldHead} htmlFor="baslik">şirket adınız*</label>
        <input required className={styles.categoryInput} type="text" id="baslik" name="baslik" placeholder="şirket adınız" maxLength="52" value={username} onChange={(e) => setUsername(e.target.value)} />
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
        <textarea required name="message" rows="5"  className={styles.categoryInput} placeholder="açık adres" value={openAddress} onChange={(e) => setOpenAddress(e.target.value)} >
        </textarea>
    

       
        <button type="submit" className={styles.saveButton} disabled={buttonState}>
          kaydet
        </button>
       
      </form>
    </main>
}