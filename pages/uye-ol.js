import Image from "next/image";
import * as React from "react";
import citiesList from "../cities.config";
import Layout from "../components/Layout";
import styles from '../styles/UyeOl.module.css'

export default function UyeOl () {

  
  const [selectedCity, setSelectedCity] = React.useState();
  const [selectedDistrict, setSelectedDistrict] = React.useState();
  const availableDistrict = citiesList.cities.find((c) => c.name === selectedCity);

  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Üye Ol
      </h1>
      <form className={styles.formStyle} action="/uye-ol" method="post">
        <label className={styles.fieldHead} htmlFor="email">e-posta adresi*</label>
        <input required className={styles.categoryInput} type="text" id="email" name="email" placeholder="e-posta adresi" maxLength="25" />
        <label className={styles.fieldHead} htmlFor="callnumber">telefon numarası*</label>
        <input required className={styles.categoryInput} type="text" id="callnumber" placeholder="telefon numarası" name="callnumber" />
        <label className={styles.fieldHead} htmlFor="companyname">şirket adı* (gözükücek adınız)</label>
        <input required className={styles.categoryInput} type="text" id="callnumber" placeholder="telefon numarası" name="callnumber" />
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
        <label className={styles.fieldHead} htmlFor="password">şifreniz*</label>
        <input required className={styles.categoryInput} type="password" id="password" placeholder="şifre" name="password" />
        <label className={styles.fieldHead} htmlFor="password">şifreniz* (tekrar)</label>
        <input required className={styles.categoryInput} type="password" id="passwordR" placeholder="şifre tekrar" name="passwordR" />
        <div className={styles.fieldHead}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
        <label htmlFor="vehicle1"> Kvk okudum anldım</label>
        </div>

        <button type="submit" className={styles.saveButton}>
          kayıt ol
        </button>
       
      </form>
    </main>
  </Layout>
}

