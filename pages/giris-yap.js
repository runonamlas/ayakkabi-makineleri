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
  const [passwordShown, setPasswordShown] = useState(false);

  const router = useRouter();

  const submitLogin = async (event) => {
    event.preventDefault();

    const groupData = {
      email, password
    }

    await axios("http://localhost:8080/api/auth/login",{
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
      router.push(router.asPath)

      }).catch (error => {
      console.log("error ", error)
    });
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
          <div className={styles.passField}>
            <input required className={styles.passInput} type={passwordShown ? "text" : "password"} id="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="sifreniz" name="password" />
            <button type="button" className={styles.iconButton} onClick={()=>setPasswordShown(!passwordShown)}><img className={styles.icon} type="image" src={passwordShown ? "icons/passSee.svg" : "icons/passNotSee.svg"}/></button>
          </div>
          <Link href='sifremi-unuttum'><a className={styles.sifremiUnuttum}>şifremi unuttum</a></Link>
          <button type="submit" className={styles.saveButton}>giriş yap</button>
        </form>
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