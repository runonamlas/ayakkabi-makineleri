import Link from "next/link"
import CONSTANTS from "../constants.config"
import styles from '../styles/Category.module.css'

const Category = ({catSelect}) => {
  const categories = [
    { id: 0, name: CONSTANTS.ayakkabi, to: CONSTANTS.ayakkabiPath, select: catSelect==0? true : false },
    { id: 1, name: CONSTANTS.kesim, to: CONSTANTS.kesimPath, select: catSelect==1? true : false },
    { id: 2, name: CONSTANTS.taban, to: CONSTANTS.tabanPath, select: catSelect==2? true : false },
    { id: 3, name: CONSTANTS.kemer, to: CONSTANTS.kemerPath, select: catSelect==3? true : false }
  ]
  return (
    <div className={styles.categoryDiv}>
      <div className={styles.categoryHeadDiv}>
          <a className={styles.categoryHeadText}>kategoriler</a>
      </div>
      <ul className={styles.categoryButonsDiv}>
        {categories.map(cat => (
          <Link key={cat.id} href={cat.to}>
            <li key={cat.name} className={ cat.select? styles.categoryItemSelected : styles.categoryItem }>
                <a className={styles.catText }>{cat.name}</a>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Category