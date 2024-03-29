import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles/GirisYap.module.css'
import { setCookie } from 'nookies'
import Image from "next/future/image";
import Head from "next/head";

export default function GirisYap(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorState, setErrorState] = useState('');

  const router = useRouter();

  const submitLogin = async (event) => {
    event.preventDefault();

    const groupData = {
      email, password
    }

    await axios(process.env.NEXT_PUBLIC_AXIOS_CONF+"/auth/login",{
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
      router.reload()
      }).catch (error => {
         switch (error.response.status) {
          case 0:
            setErrorState("Ağ hatası lütfen tekrar deneyin")
            break;
          case 401:
            setErrorState("Yanlış mail veya parola, tekrar deneyiniz.")
            break;
          default:
            setErrorState(error.response.data.message)
            break;
        }
    });
  }
  return <main className={styles.main}>
    <Head>
      <title>giriş yap - ayakkabi makineleri</title>
      <meta name='description' content='Sitemize giriş yaparak makinelerinizi koyabilir ve hızlıca satabilirsiniz. Üye olmadan devam ederek tüm ayakkabı taban kesim vb makinelerini görebilirsiniz.' />
      <meta name='twitter:url' content='https://ayakkabimakineleri.com/giris-yap' />
      <meta name='twitter:title' content='giriş yap - ayakkabi makineleri' />
      <meta name='twitter:description' content='Sitemize giriş yaparak makinelerinizi koyabilir ve hızlıca satabilirsiniz. Üye olmadan devam ederek tüm ayakkabı taban kesim vb makinelerini görebilirsiniz.' />
      <meta property='og:title' content='giriş yap - ayakkabi makineleri' />
      <meta property='og:description' content='Sitemize giriş yaparak makinelerinizi koyabilir ve hızlıca satabilirsiniz. Üye olmadan devam ederek tüm ayakkabı taban kesim vb makinelerini görebilirsiniz.' />
      <meta property='og:url' content='https://ayakkabimakineleri.com/giris-yap' />
    </Head>
      <h1 className={styles.title}>
        giriş yap / üye ol
      </h1>
      <div className={styles.leftPanel}>
        {errorState != '' && <a className={styles.errorText}>{errorState}</a>}
        <form className={styles.formStyle} onSubmit={submitLogin}>
          <label className={styles.fieldHead} htmlFor="email">telefon numarası veya e-posta adresi*</label>
          <input required className={styles.categoryInput} type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-posta adresi veya telefon numarası" maxLength="25" />
          <label className={styles.fieldHead} htmlFor="passwordText">şifreniz*</label>
          <div className={styles.passField}>
            <input required className={styles.passInput} type={passwordShown ? "text" : "password"} id="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="sifreniz" name="password" />
            <button type="button" className={styles.iconButton} onClick={()=>setPasswordShown(!passwordShown)}><Image  alt="giriş yap" type="image" width={24} height={24} src={passwordShown ? "/icons/passSee.png" : "/icons/passSeeNot.png"}/></button>
          </div>
          <Link prefetch={false} href='sifremi-unuttum'><a className={styles.sifremiUnuttum}>şifremi unuttum</a></Link>
          <button type="submit" className={styles.saveButton}>giriş yap</button>
        </form>
        <a className={styles.veya}>henüz kayıtlı değil isen</a>
        <Link prefetch={false} href='uye-ol'>
          <button type="submit" className={styles.kayıtol}>
            kayıt ol
          </button>
        </Link>
      </div>
    </main>
}