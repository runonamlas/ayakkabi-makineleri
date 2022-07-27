import axios from 'axios'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/GirisYap.module.css'

export default function SifreyiYenile({ data }) {
  const [password, setPassword] = useState('')
  const [passwordR, setPasswordR] = useState('')
  const [passwordShown, setPasswordShown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorState, setErrorState] = useState();
  const [buttonState, setButtonState] = useState(false);
  const router = useRouter();
  useEffect(() => { 
    const handleLogout = async () => {
      const cookies = parseCookies()
      for (const cookie of Object.keys(cookies)) {
        await destroyCookie(null, cookie, {path:"/"})
      }
    }
    handleLogout()
    setMounted(true) 
  }, []);



  if (!mounted) return <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>
        şifreyi yenile
      </h1>
      <div className={styles.productsList}>
        
      </div>
    </main>
  </Layout>;

  

  const submitLogin = async (event) => {
    setButtonState(true)
    event.preventDefault();
    if(password != passwordR){
      setErrorState("şifreler eşleşmiyor")
      setButtonState(false)
    }
    const groupData = {
      password
    }
    console.log(data.id)
    axios.defaults.headers.common['Authorization'] = data.id;
    await axios.post(process.env.NEXT_PUBLIC_AXIOS_CONF+"/auth/change",groupData).then(response => {
      router.push('/')
      
    }).catch((error) => {
      console.error('Error:', error.response);
    });




  }

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          şifreyi yenile
        </h1>
        <div className={styles.productsList}>
        {buttonState ? (<div className={styles.loaderDiv}><div className={styles.loader}></div><a>Şifre güncelleniyor..</a></div>) : (
        <form className={styles.formStyle} onSubmit={submitLogin}>
          <label className={styles.fieldHead} htmlFor="passwordText">yeni şifreniz*</label>
          <input required className={styles.categoryInput} type={passwordShown ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="yeni şifreniz" minLength="8" />
          <label className={styles.fieldHead} htmlFor="passwordRText">yeni şifreniz(tekrar)*</label>
          <div className={styles.passField}>
            <input required className={styles.passInput} type={passwordShown ? "text" : "password"} id="passwordR" value={passwordR} onChange={(e) => setPasswordR(e.target.value)}  placeholder="yeni sifreniz(tekrar)" name="passwordR" minLength="8" />
            <button type="button" className={styles.iconButton} onClick={()=>setPasswordShown(!passwordShown)}><img className={styles.icon} type="image" src={passwordShown ? "../icons/passSee.svg" : "../icons/passNotSee.svg"}/></button>
          </div>
          {errorState && (<div className={styles.errorDiv}>{errorState}</div>)}
          <button type="submit" className={styles.saveButton}>şifreyi değiştir</button>
        </form>)}
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const data = context.params
  return {
      props: {
        data,
      },
    }
}
