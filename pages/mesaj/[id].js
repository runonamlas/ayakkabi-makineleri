import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Layout from "../../components/Layout";
import styles from '../../styles/MessagePage.module.css';

function MessagePage({data}){
  const [image, setImage] = React.useState('add')
  const changeImage = (i) => {
    setImage(i)
  }

  return (<Layout>
    <Head>
      <title>{data.id}</title>
    </Head>
    <main className={styles.main}>
      <Link href={`/magaza/${data.id}`}>
        <a>
          <div className={styles.OwnerTitle}>
        <a>Salman Makine</a>
        <Image className={styles.productimage} src='/icons/right-arrow-white.svg' height='20' width='20' />
      </div>
        </a>
      </Link>
      

      <div className={styles.chatView}>
        <div className={styles.chatSatirLeft}>
          <div className={styles.chatDiv}>
          </div>
        </div>
        <div className={styles.chatSatirRight}>
          <div className={styles.chatDiv}>
          </div>
        </div>
      </div>
      <div className={styles.chatWrite}>
        <div className={styles.productCard}>
          <Image className={styles.productimage} src='/icons/add.svg' height='80' width='100'/>
          <a className={styles.productTitle}>Sahibinden sıfır ayarında bla bla bla</a>
          <a className={styles.productPrice}>15.000 TL</a>
        </div>
        <div>
          <input required type="text" className={styles.chatInput} id="mesaj" name="mesaj" placeholder="bla bla bla"  />
          <input type="image" src="/icons/right-arrow.svg" className={styles.writeButton} alt="Submit" width="48" height="48" />
        </div>
      
      </div>
     
    </main>
    
  </Layout>)
}

export const getServerSideProps = async (context) => {
  return {
    props:{
      data: context.params
    }
  }
}

export default MessagePage;