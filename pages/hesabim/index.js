import Link from "next/link";
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
    if(cookies.OursiteJWT){
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
    }else{
      router.push('/giris-yap')
    }
    
  }, []);
  
  const handleLogout = async (e) => {
    e.preventDefault()
    const cookies = parseCookies()
    for (const cookie of Object.keys(cookies)) {
      await destroyCookie(null, cookie, {path:"/"})
    }
    router.push('/')
  }

  return <main className={styles.main}>
    <div className={styles.infoGroup}>
       <h1 className={styles.title}>{name}</h1>
      <h2 className={styles.title}>{callNumber}</h2>
      <h3 className={styles.title}>{address} {city}</h3>
      <h3>{status}</h3>
      <Link prefetch={false} href='/hesabim/hesap-yukselt'>
        <a className={styles.yukselt}>yükselt</a>
      </Link>
    </div>
    <div className={styles.butonGroup}>
      <Link prefetch={false} href='/hesabim/istatistikler'>
        <a className={styles.saveButton}>istatistikler</a>
      </Link>
      <Link prefetch={false} href='/hesabim/mesajlar'>
        <a className={styles.saveButton}>mesajlar</a>
      </Link>
      <Link prefetch={false} href='/hesabim/ilanlarim'>
        <a className={styles.saveButton}>ilanlarım</a>
      </Link>
      <Link prefetch={false} href='/hesabim/hesap-guncelle'>
        <a className={styles.saveButton}>bilgileri güncelle</a>
      </Link>
      <a className={styles.saveButton} onClick={handleLogout}>çıkış yap</a>
    </div>
  </main>
}

export default Hesabim