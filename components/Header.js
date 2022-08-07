import axios from "axios"
import Image from "next/future/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CONSTANTS from "../constants.config"
import styles from '../styles/Header.module.css'

const NavBar = () => {
  const [navSelect, setNavSelect] = useState(-1);
  const router = useRouter();
  useEffect(() => {
    switch (router.asPath){
      case '/':
        setNavSelect(0)
        break; 
      case '/ilan-ver':
        setNavSelect(1)
        break;
      case '/hesabim':
        setNavSelect(2)
        break;
      default:
        setNavSelect(-1)
    }
  },[router.asPath]);
  const links = [
    { id: 0, name: CONSTANTS.home, to: CONSTANTS.homePath, select: navSelect==0? true : false, icon: navSelect==0 ? CONSTANTS.homeIconBg : CONSTANTS.homeIcon },
    { id: 1, name: CONSTANTS.add, to: CONSTANTS.addPath, select: navSelect==1? true : false, icon: navSelect==1 ? CONSTANTS.addIconBg : CONSTANTS.addIcon },
    { id: 2, name: CONSTANTS.account, to: CONSTANTS.accountPath, select: navSelect==2? true : false, icon: navSelect==2 ? CONSTANTS.accountIconBg : CONSTANTS.accountIcon }
  ]
  return (
    <nav className={styles.navParent}>
      {links.map(link => (
            <Link prefetch={false} key={link.id} href={link.to}><a className={link.select? styles.menuTextSelected : styles.menuText }>
                <Image src={link.icon} alt={link.name} width="32" height="32" priority="true"/> &nbsp;
                {link.name}
            </a></Link>
      ))}
    </nav>
   
  )
}

function Header()  {
  const [products, setProducts] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchShow, setSearchShow] = useState(false);
  const [productsApi, setProductsApi] = useState([]);
  useEffect(() => {
    if(searchText.length>0){
      (async () => {
      var productsApiVar = productsApi
      if(productsApi.length < 1){
        const {data} = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+'/products/')
        productsApiVar = data.data
        setProductsApi(data.data)
      }
      let gg = productsApiVar.filter(p => p.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || p.users.username.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      let uniqueChars = [...new Set(gg)];
      setProducts(uniqueChars)
    })()
    }
  },[searchText]);

  const searchClick =  () => {
    if(searchShow){
       setSearchText('')
      setSearchShow(!searchShow)
    }
  }
  
  return (
    <header className={styles.headerDiv}>
        <Link prefetch={false} href='/'>
          <a className={styles.logo}>ayakkabimakineleri.com</a>
        </Link>
      <div className={searchShow ? styles.mobileSearchDiv : styles.searchDiv}>
        <div className={searchShow ? styles.mobileSearchInput : styles.searchInput}>
          <form noValidate role="search" className={searchShow ? styles.mobileSearchForm : undefined} >
          <input className={searchShow ? styles.mobileSearchBox : styles.searchBox} placeholder="ara" title='Search bar' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
          <Image className={styles.searchIcon} onClick={() => searchClick()} src={searchShow ? CONSTANTS.cancelIconPath : CONSTANTS.searchIconPath} alt="search-icon" width="22" height="22" />
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


            return <Link prefetch={false} key={product.id} href={`/ilan/${product.id}-${name}`}><a onClick={()=>searchClick()}>
              <div className={styles.productCard}>
                <div className={styles.productLeft}>
                  <Image priority="true" alt="ayakkabı makinesi" className={styles.productimage} src={imageArray[product.vitrin-1]} height='80' width='100' layout='responsive'/>
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
      <NavBar/>
    </header>
  )
}

export default Header

