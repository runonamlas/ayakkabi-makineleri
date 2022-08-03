import axios from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import styles from '../styles/GirisYap.module.css'

export default function SifremiUnuttum({ data }) {
  const [email, setEmail] = useState('')
  const [errorState, setErrorState] = useState();
  const [buttonState, setButtonState] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  useEffect(() => { 
    const handleLogout = async () => {
      const cookies = parseCookies()
      for (const cookie of Object.keys(cookies)) {
        await destroyCookie(null, cookie, {path:"/"})
      }
    }
    handleLogout()
  }, []);



  const submitLogin = async (event) => {
    setButtonState(true)
    event.preventDefault();
    const groupData = {
      email
    }
    await axios.post(process.env.NEXT_PUBLIC_AXIOS_CONF+"/auth/forget",groupData).then(response => {
      setShowFinish(true)
      
    }).catch((error) => {
      if(error.response.status ==404){
        setButtonState(false)
        setErrorState("Bu maile ait bir hesap bulunamadı.")
      }else{
        console.error('Error:', error.response);
      }
      
    });




  }

  return <main className={styles.main}>
        <h1 className={styles.title}>
          şifremi unuttum
        </h1>
        <div className={styles.productsList}>
        {showFinish ? (<div className={styles.loaderDiv}><div className={styles.loader}></div><a>Mail Kutunuza gelen linke tıklayınız.</a></div>) : (
        buttonState ? (<div className={styles.loaderDiv}><div className={styles.loader}></div><a>Mail Yollanıyor..</a></div>) : (
        <form className={styles.formStyle} onSubmit={submitLogin}>
          <label className={styles.fieldHead} htmlFor="eposta">e-posta adresiniz (mail yollanacaktır)*</label>
          <input required className={styles.categoryInput} type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email adresiniz (mail yollanacaktır.)" />
          {errorState && (<div className={styles.errorDiv}>{errorState}</div>)}
          <button type="submit" className={styles.saveButton}>şifreyi değiştir</button>
        </form>))}
    </div>
  </main>
}