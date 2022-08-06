import Link from "next/link"
import CONSTANTS from "../constants.config"
import styles from '../styles/Category.module.css'
import { useEffect, useState } from 'react';

const Category = ({catSelect}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className={styles.categoryDiv}>
      <div className={styles.categoryHeadDiv}>
          <h2 className={styles.categoryHeadText}>kategoriler</h2>
      </div>
      <ul className={styles.categoryButonsDiv}>
        <li key="ayakkabi-makineleri-li" className={ catSelect==0? styles.categoryItemSelected : styles.categoryItem }>
          <Link key="ayakkabi-makineleri" href={"/kategori"+CONSTANTS.ayakkabiPath} className={styles.catLink} >
            <a className={ catSelect==0? styles.catTextSelected : styles.catText }>{CONSTANTS.ayakkabi}</a> 
          </Link>
        </li>
        <li key="kesim-makineleri-li" className={ catSelect==1? styles.categoryItemSelected : styles.categoryItem }>
          <Link key="kesim-makineleri" href={"/kategori"+CONSTANTS.tabanPath} className={styles.catLink}>
            <a className={ catSelect==1? styles.catTextSelected : styles.catText }>{CONSTANTS.taban}</a>
          </Link>
        </li>
        <li key="taban-makineleri-li" className={ catSelect==2? styles.categoryItemSelected : styles.categoryItem }>
          <Link key="taban-makineleri" href={"/kategori"+CONSTANTS.kesimPath} className={styles.catLink} >
            <a className={ catSelect==2? styles.catTextSelected : styles.catText }>{CONSTANTS.kesim}</a>
          </Link>
        </li>
        <li key="kemer-makineleri-li" className={ catSelect==3? styles.categoryItemSelected : styles.categoryItem }>
          <Link key="kemer-makineleri" href={"/kategori"+CONSTANTS.kemerPath} className={styles.catLink}>
            <a className={ catSelect==3? styles.catTextSelected : styles.catText }>{CONSTANTS.kemer}</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Category