import Link from "next/link";
import Layout from "../components/Layout";
import styles from '../styles/GirisYap.module.css'

export default function GirisYap(){
  return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Giriş yap / Üye ol
      </h1>
      <div className={styles.leftPanel}>
        <form className={styles.formStyle} action="/giris-yap" method="post">
          <label className={styles.fieldHead} htmlFor="email">telefon numarası veya e-posta adresi*</label>
          <input required className={styles.categoryInput} type="text" id="email" name="email" placeholder="e-posta adresi veya telefon numarası" maxLength="25" />
          <label className={styles.fieldHead} htmlFor="marka">şifreniz*</label>
          <input required className={styles.categoryInput} type="text" id="password" placeholder="sifreniz" name="oassword" />
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