import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import * as React from "react";
import citiesList from "../cities.config";
import styles from '../styles/UyeOl.module.css'

export default function UyeOl () {
  const [email, setEmail] = React.useState('')
  const [callNumber, setCallNumber] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [openAddress, setOpenAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [buttonState, setButtonState] = React.useState(false)
  const [passwordShown, setPasswordShown] = React.useState(false);

  
  const [selectedCity, setSelectedCity] = React.useState();
  const [selectedDistrict, setSelectedDistrict] = React.useState();
  const availableDistrict = citiesList.cities.find((c) => c.name === selectedCity);

  const router = useRouter();
  const submitRegister = async (event) => {
    setButtonState(true);
    event.preventDefault();
    const address = openAddress+"%"+selectedDistrict+"&"+selectedCity
    const groupData = {
        username, callNumber, email, address, password
    }
    await axios(process.env.NEXT_PUBLIC_AXIOS_CONF+"/auth/register",{
        method: "POST",
        data: groupData
    }).then(response => {
      setCookie(null, "OursiteJWT", response.data.data.token, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      setCookie(null, 'name', response.data.data.username, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      setCookie(null, 'callNumber', response.data.data.callNumber, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      setCookie(null, 'address', response.data.data.address, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      setCookie(null, 'type', response.data.data.accountType, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      router.push('/')

      }).catch (error => {
      console.log("error ", error)
    });
  }

  return <main className={styles.main}>
      <h1 className={styles.title}>
        üye ol
      </h1>
      {buttonState ? (<div className={styles.loaderDiv}><div className={styles.loader}></div><a>yeni üyelik oluşturuluyorr..</a></div>) : (
      <form className={styles.formStyle} onSubmit={submitRegister} method="POST">
        <label className={styles.fieldHead} htmlFor="email">e-posta adresi*</label>
        <input required className={styles.categoryInput} type="text" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="e-posta adresi" maxLength="25" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className={styles.fieldHead} htmlFor="callnumber">telefon numarası*</label>
        <input required className={styles.categoryInput} type="text" id="callnumber" placeholder="5** *** ** **" pattern="[0-9]{10}" name="callnumber"  value={callNumber} onChange={(e) => setCallNumber(e.target.value)}/>
        <label className={styles.fieldHead} htmlFor="companyname">şirket adı* (gözükücek adınız)</label>
        <input required className={styles.categoryInput} type="text" id="username" placeholder="şirket adı" name="callnumber" value={username} onChange={(e) => setUsername(e.target.value)} />
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
              <option value="">il seçin</option>
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
              <option value="">ilçe seçin</option>
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
        <textarea required name="message" rows="5"  className={styles.categoryInput} placeholder="açık adres" value={openAddress} onChange={(e) => setOpenAddress(e.target.value)}>
        </textarea>
        <label className={styles.fieldHead} htmlFor="password">şifreniz*</label>
        <input required autoComplete="on" minLength="8" className={styles.categoryInput} id="password" type={passwordShown ? "text" : "password"} placeholder="şifre" name="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="button" className={styles.sifreyiGoster} onClick={()=>setPasswordShown(!passwordShown)}>şifreyi göster</button>
        <div className={styles.fieldHead}>
        <input type="checkbox" id="sozlesme" name="sozlesme" value="contract" required/>
        <label htmlFor="sozlesme"> Kvk okudum anldım</label>
        </div>

        <button type="submit" className={styles.saveButton}>
          kayıt ol
        </button>
       
      </form>)}
    </main>
}

