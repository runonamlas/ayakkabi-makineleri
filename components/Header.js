import axios from "axios"
import Image from "next/future/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import CONSTANTS from "../constants.config"
import styles from '../styles/Header.module.css'

const NavBar = ({navSelect}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const links = [
    { id: 0, name: CONSTANTS.home, to: CONSTANTS.homePath, select: navSelect==0? true : false, icon: navSelect==0 ? CONSTANTS.homeIconBg : CONSTANTS.homeIcon },
    { id: 1, name: CONSTANTS.add, to: CONSTANTS.addPath, select: navSelect==1? true : false, icon: navSelect==1 ? CONSTANTS.addIconBg : CONSTANTS.addIcon },
    { id: 2, name: CONSTANTS.account, to: CONSTANTS.accountPath, select: navSelect==2? true : false, icon: navSelect==2 ? CONSTANTS.accountIconBg : CONSTANTS.accountIcon }
  ]
  return (
    <nav className={styles.navParent}>
       <ul className={styles.navUl}>
      {links.map(link => (
          <li key={link.name} className={ link.select? styles.menuItemSelected : styles.menuItem }>
            <Link key={link.id} href={link.to}><a className={styles.menuText }>
              <div className={styles.navDiv}>
                <Image src={link.icon} alt={link.name} width="32" height="32" priority="true"/> &nbsp;
                {link.name}
                </div>
            </a></Link>
          </li>
      ))}
    </ul>
    </nav>
   
  )
}

function Header  ({navSelect})  {
  const [products, setProducts] = useState();
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products/')
      const productsAPI = data.data
      let gg = productsAPI.filter(p => p.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || p.users.username.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      let uniqueChars = [...new Set(gg)];
      setProducts(uniqueChars)
    })()
  },[searchText]);
  
  return (
    <header className={styles.headerDiv}>
        <Link href='/'>
          <a className={styles.logo}>ayakkabimakineleri.com</a>
        </Link>
      <div className={styles.searchDiv}>
        <div className={styles.searchInput}>
          <form noValidate role="search" >
          <input className={styles.searchBox} placeholder="ara" title='Search bar' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
          <Image className={styles.searchIcon} src={CONSTANTS.searchIconPath} alt="search-icon" width="22" height="22" />
          </form>
        </div>
        {(searchText && products) && <div className={styles.searchSpace}>
        { products.map(product => {
            const imageArray = product.images.split(",")
            const unit = {
              1 : "tl",
              2 : "£",
              3 : "$"
            }
            const name = product.name.replace(/ /g, '-')

            const nameArray = product.users.username.split("-")
            var nameConfig = ''
            nameArray.forEach(e=>{
              const nameParse = e.charAt(0).toUpperCase()+ e.slice(1) + " "
              nameConfig += nameParse
            })


            return <Link key={product.id} href={`/ilan/${product.id}-${name}`}><a>
              <div className={styles.productCard}>
                <div className={styles.productLeft}>
                  <Image priority="true" className={styles.productimage} src={imageArray[product.vitrin-1]} height='80' width='100' layout='responsive'/>
                </div>
                <div className={styles.productRight}>
                  <p className={styles.productTitle}>{product.name}</p>
                  <p className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</p>
                  <p className={styles.productAdress}>{product.users.address.split('%')[1]}</p>
                  <p className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</p>
                </div>
              </div></a>
            </Link>
            }
          )}
        </div>}
      </div>
      <NavBar  navSelect={navSelect}/>
    </header>
  )
}

export default Header

