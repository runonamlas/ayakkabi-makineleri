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
          <h2>kategoriler</h2>
      </div>
      <div className={styles.categoryButonsDiv}>
        <Link prefetch={false} key="ayakkabi-makineleri" href={"/kategori"+CONSTANTS.ayakkabiPath}>
          <a className={ catSelect==0? styles.catTextSelected : styles.catText }>{CONSTANTS.ayakkabi}</a> 
        </Link>
        <Link prefetch={false} key="kesim-makineleri" href={"/kategori"+CONSTANTS.tabanPath}>
          <a className={ catSelect==1? styles.catTextSelected : styles.catText }>{CONSTANTS.taban}</a>
        </Link>
        <Link prefetch={false} key="taban-makineleri" href={"/kategori"+CONSTANTS.kesimPath}>
          <a className={ catSelect==2? styles.catTextSelected : styles.catText }>{CONSTANTS.kesim}</a>
        </Link>
        <Link prefetch={false} key="kemer-makineleri" href={"/kategori"+CONSTANTS.kemerPath}>
          <a className={ catSelect==3? styles.catTextSelected : styles.catText }>{CONSTANTS.kemer}</a>
        </Link>
      </div>
    </div>
  )
}

export default Category