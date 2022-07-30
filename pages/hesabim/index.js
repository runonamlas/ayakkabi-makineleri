import Link from "next/link";
import Layout from "../../components/Layout";
import styles from '../../styles/Hesabim.module.css'
import { parseCookies, destroyCookie} from 'nookies'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Hesabim(){
  const [name , setName] = useState('')
  const [callNumber , setCallNumber] = useState('')
  const [address , setAddress] = useState('')
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies()
    console.log(cookies)
    const nameArray = cookies.name.split("-")
    var nameConfig =''
    nameArray.forEach(e=>{
      const nameParse = e.charAt(0).toUpperCase()+ e.slice(1) + " "
      nameConfig += nameParse
    })

    setName(nameConfig.replace(/\s+$/g, ''))
    setCallNumber(cookies.callNumber)
    const addressArray = cookies.address.split("%")
    setAddress(addressArray[0])
    setCity(addressArray[1])
    switch (cookies.type) {
      case '0':
        return setStatus('amatör hesap')
      case '1':
        return setStatus('gold hesap')
      default:
        return setStatus('ana hesap')
    }
  }, []);
  
  const handleLogout = async (e) => {
    e.preventDefault()
    const cookies = parseCookies()
    for (const cookie of Object.keys(cookies)) {
      await destroyCookie(null, cookie, {path:"/"})
    }
    router.reload()
  }

  return <Layout navSelect={2}>
    <main className={styles.main}>
      <h1 className={styles.title}>{name}</h1>
      <h2 className={styles.title}>{callNumber}</h2>
      <h3 className={styles.title}>{address} {city}</h3>
      <div className={styles.hesapType}>
        <a>{status}</a>
        <Link href='hesabim/hesap-yukselt'>
          <div className={styles.saveButton}>
          yükselt</div>
        </Link>
      </div>
      <div className={styles.butonGroup}>
        <Link href='/hesabim/istatistikler'>
          <div className={styles.saveButton}>
          istatistikler</div>
        </Link><br/>
        <Link href='/hesabim/mesajlar'>
          <div className={styles.saveButton}>
          mesajlar</div>
        </Link><br/>
        <Link href='hesabim/ilanlarim'>
          <div className={styles.saveButton}>
          ilanlarım</div>
        </Link><br/>
        <Link href='hesabim/hesap-guncelle'>
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