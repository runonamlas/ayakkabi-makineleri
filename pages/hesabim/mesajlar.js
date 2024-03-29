import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/Mesajlar.module.css'

export default function Ilanlarim({messages}){
if(messages){
  return <main className={styles.main}>
      <h1 className={styles.title}>mesajlar</h1>
      <div className={styles.productList}>
        {messages.map(message => {
          return <Link key={message.id} href={`/mesaj/${message.owner.id}-${message.owner.username}`}>
          <div className={styles.productCard}>
            <div>
              <a className={styles.mesajTitle}>{message.owner.username}</a>
              <a className={styles.mesajContent}>{message.name}</a>
            </div>
            <Image  alt="mesajları göster" className={styles.productimage} src='/icons/right-arrow.svg' height='20' width='30' />
          </div>
        </Link>
        })}

      </div>
    </main>
}
return <main className={styles.main}>
    <h1 className={styles.title}>mesajlar</h1>
    <div className={styles.productList}></div>
  </main>
}

export const getServerSideProps = async (context) => {
  try {
    const token=context.req.headers.cookie.split(";").find((c) => c.trim().startsWith("OursiteJWT")).split("=")[1];
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/user/messages')
    const messages = data.data
    return {
      props: {
        messages
      },
    }
  } catch (error) {
    const messages = []
    return {
      props: {
        messages,
      },
    }
  }
}
