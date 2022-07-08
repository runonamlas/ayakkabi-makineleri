import Link from "next/link";
import Layout from "../components/Layout";
import styles from '../styles/Hesabim.module.css'
import { parseCookies, destroyCookie} from 'nookies'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Hesabim(){
  const [name , setName] = useState('')
  const [callNumber , setCallNumber] = useState('')
  const [address , setAddress] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies()
    setName(cookies.name)
    setCallNumber(cookies.callNumber)
    setAddress(cookies.address)
    switch (cookies.type) {
      case '0':
        return setStatus('amatör hesap')
      case '1':
        return setStatus('gold hesap')
      default:
        return setStatus('ana hesap')
    }
  }, []);
  
  const handleLogout = () => {
    const cookies = parseCookies()
    for (const cookie of Object.keys(cookies)) {
      destroyCookie(null, cookie)
    }
    router.push("/")
  }

  console.log(status)
  return <Layout navSelect={2}>
    <main className={styles.main}>
      <h1 className={styles.title}>{name}</h1>
      <h2 className={styles.title}>{callNumber}</h2>
      <h3 className={styles.title}>{address}</h3>
      <div className={styles.hesapType}>
        <a>{status}</a>
        <Link href='hesap-yukselt'>
          <div className={styles.saveButton}>
          yükselt</div>
        </Link>
      </div>
      <div className={styles.butonGroup}>
        <Link href='istatistikler'>
          <div className={styles.saveButton}>
          istatistikler</div>
        </Link><br/>
        <Link href='mesajlar'>
          <div className={styles.saveButton}>
          mesajlar</div>
        </Link><br/>
        <Link href='ilanlarim'>
          <div className={styles.saveButton}>
          ilanlarım</div>
        </Link><br/>
        <Link href='hesap-guncelle'>
          <div className={styles.saveButton}>
          bilgileri güncelle</div>
        </Link>
      </div>

      <div className={styles.butonGroup}>
          <div className={styles.saveButton} onClick={handleLogout}>
          çıkış yap</div>
      </div>
      
    </main>

  </Layout>
}

export default Hesabim