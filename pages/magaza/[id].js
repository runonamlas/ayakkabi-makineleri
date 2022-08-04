import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/MagazaScreen.module.css';

export default function MagazaScreen({user}){
  const nameArray = user.username.split("-")
  var nameConfig = ''
  nameArray.forEach(e=>{
    const nameParse = e.charAt(0).toUpperCase()+ e.slice(1) + " "
    nameConfig += nameParse
  })
  const unit = {
    1 : "tl",
    2 : "£",
    3 : "$"
  }

  return (
    <main className={styles.main}>
      <div className={styles.headText}>
      <h1>{nameConfig.replace(/\s+$/g, '')}</h1>
      <h2>{user.callNumber}</h2>
      <h3>{user.address}</h3>
      <div className={styles.butonGroup}>
        
        <Link href={`/mesaj/${user.id}-${user.username}`}><div className={styles.mesajButton}>
          mesaj gönder</div>
        </Link>
        <Link href={`tel:${user.callNumber}`} ><div className={styles.callButton}>
          ara ({user.callNumber})</div>
        </Link>
      </div>
      </div>
      <div className={styles.ilanlar}>
        <h1 className={styles.title}>
          ilanlar
        </h1>
        <div className={styles.productsList}>
          { user.products.reverse().map(product => {
            const images = product.images.split(',')
            const name = product.name.replace(/ /g, '-')
            return <Link key={product.id} href={`/ilan/${product.id}-${name}`}>
              <div className={styles.productCard}>
                <div className={styles.productLeft}>
                  <Image priority="true" alt="ayakkabı makinesi resmi" className={styles.productimage} src={images[product.vitrin-1] ? images[product.vitrin-1]: ''} height='65' width='100' layout='responsive'/>
                </div>
                <div className={styles.productRight}>
                  <a className={styles.productTitle}>{product.name}</a>
                  <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>

                </div>
              </div>
            </Link>
          })}
        </div>
      </div>
    </main>)
}
export const getServerSideProps = async (context) => {
  try {
    const param = context.params.id
    const {data} = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/user/profile/'+param)
    const user = data.data
    return {
      props: {
        user,
      },
    }
  } catch (error) {
    const user = {}
    return {
      props: {
        user,
      },
    }
  }
}