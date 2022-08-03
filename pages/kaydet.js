import Image from "next/image";
import Link from "next/link";
import styles from '../styles/Kaydet.module.css'

export default function Kaydet(){
  return <main className={styles.main}>
      <Image src="/icons/check.svg" alt="success" width="200" height="200" />
      <h1 className={styles.title}>İlanınız onay aşamasındadır.</h1>
      <h2>Bilgilerin doğruluğu ve fiyatın tutarlılığı sonrasında onaylanacaktır. </h2>
      <h3>Onay süresi ortalama 30 dakikadır.</h3>
      <h2>Amatör hesap olduğunuz için ilanın yayın süresi 30 gündür. </h2>
      <Link href="hesap-yukselt"><h1 className={styles.updateText}>Yayın süresini uzatmak için hesabınızı yükseltebilirsiniz.</h1></Link>
      <h1>İyi satışlar dileriz. </h1>
      
        <Link href="/" ><div className={styles.saveButton}>
          tamam</div>
      </Link>
      
      
       
    </main>
}