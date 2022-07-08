import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import styles from '../styles/GirisYap.module.css'
import { setCookie } from 'nookies'

export default function GirisYap(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const submitLogin = async (event) => {
    event.preventDefault();

    const groupData = {
      email, password
    }
    console.log("GroupData ", groupData)

    try {
      const { data } = await axios({
        url:"http://localhost:8080/api/auth/login",
        method: "POST",
        data: groupData
      });

      console.log("response back ", data.data);
      setCookie(null, "OursiteJWT", data.data.token, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      setCookie(null, 'name', data.data.username)
      setCookie(null, 'callNumber', data.data.callNumber)
     // console.log(decodeURIComponent("salman%20makina"))
      setCookie(null, 'address', data.data.address)
      setCookie(null, 'type', data.data.accountType)
      router.push('/')
      
    } catch (error) {
      console.log("error ", error)
    }
  }
  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Giriş yap / Üye ol
      </h1>
      <div className={styles.leftPanel}>
        <form className={styles.formStyle} onSubmit={submitLogin}>
          <label className={styles.fieldHead} htmlFor="email">telefon numarası veya e-posta adresi*</label>
          <input required className={styles.categoryInput} type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-posta adresi veya telefon numarası" maxLength="25" />
          <label className={styles.fieldHead} htmlFor="passwordText">şifreniz*</label>
          <input required className={styles.categoryInput} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="sifreniz" name="oassword" />
          <a className={styles.sifremiUnuttum}>şifremi unuttum</a>
          <button type="submit" className={styles.saveButton}>giriş yap</button>
        </form>
        <a className={styles.veya}>veya</a>
        <button type="submit" className={styles.loginbutton}>
            google ile giris yap
        </button>
        <button type="submit" className={styles.loginbutton}>
            facebook ile giriş yap
        </button>
        <a className={styles.veya}>henüz kayıtlı değil isen</a>
        <Link href='uye-ol'>
          <button type="submit" className={styles.kayıtol}>
            kayıt ol
          </button>
        </Link>
      </div>
      <div className={styles.rightPanel}>
        <h2>İlan yayınlayabilmek için giriş yapmalı ya da üye olmasın.</h2>
        <h2>Gördüğüm kadarıyla henüz hesabına giriş yapmamışsın.</h2>
        <h2>Hemen yan kısımdan giriş yapabilir. Veya hızlıca üyelik oluşturabilirsin.</h2>
      </div>
    </main>
  </Layout>
}