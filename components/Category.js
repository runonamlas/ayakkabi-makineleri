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
          <a className={styles.categoryHeadText}>kategoriler</a>
      </div>
      <ul className={styles.categoryButonsDiv}>
      <Link key="ayakkabi-makineleri" href={CONSTANTS.ayakkabiPath} ><a>
            <li key="ayakkabi-makineleri" className={ catSelect==0? styles.categoryItemSelected : styles.categoryItem }>
                <a className={styles.catText }>{CONSTANTS.ayakkabi}</a>
            </li></a>
          </Link>
          <Link key="kesim-makineleri" href={CONSTANTS.kesimPath}><a>
            <li key="kesim-makineleri" className={ catSelect==1? styles.categoryItemSelected : styles.categoryItem }>
                <a className={styles.catText }>{CONSTANTS.kesim}</a>
            </li></a>
          </Link>
          <Link key="taban-makineleri" href={CONSTANTS.tabanPath} ><a>
            <li key="taban-makineleri" className={ catSelect==2? styles.categoryItemSelected : styles.categoryItem }>
                <a className={styles.catText }>{CONSTANTS.taban}</a>
            </li></a>
          </Link>
          <Link key="kemer-makineleri" href={CONSTANTS.kemerPath}><a>
            <li key="kemer-makineleri" className={ catSelect==3? styles.categoryItemSelected : styles.categoryItem }>
                <a className={styles.catText }>{CONSTANTS.kemer}</a>
            </li></a>
          </Link>
      </ul>
    </div>
  )
}

export default Category