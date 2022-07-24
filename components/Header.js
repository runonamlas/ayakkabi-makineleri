import axios from "axios"
import Image from "next/image"
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
    <ul className={styles.navUl}>
      {links.map(link => (
        <Link key={link.id} href={link.to}><a>
          <li key={link.name} className={ link.select? styles.menuItemSelected : styles.menuItem }>
            <div style={{ display: "flex", alignItems: "center"}}>
              <Image src={link.icon} alt={link.name} width="32" height="32" />
              <a className={styles.menuText }>{link.name}</a>
            </div>
          </li></a>
        </Link>
      ))}
    </ul>
  )
}

function Header  ({navSelect})  {
  const [products, setProducts] = useState();
  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setMounted(true)
  },[]);

  useEffect(() => {if(mounted){
    (async () => {
      const {data} = await axios.get('http://localhost:8080/api/products')
      const productsAPI = data.data
      /*productsAPI.map(p=> {
        var name = p.name.toLowerCase()
        var scorr = 0
      for (var a in name) {
        for (var k in searchText.toLowerCase()){
          if (p.name[a].toLowerCase() == searchText[k].toLowerCase()){
            kk.push(p)
            scorr+=1
          }
        }
      }
      console.log(scorr)
      
      for (var a in p.users.username.toLowerCase()) {
        for (var k in searchText.toLowerCase()){

          if (p.users.username[a].toLowerCase() == searchText[k].toLowerCase()){
            kk.push(p)
          }
        }
      }
      })*/
      let gg = productsAPI.filter(p => p.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || p.users.username.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
      let uniqueChars = [...new Set(gg)];
      setProducts(uniqueChars)
    })()
    
    
  }
    
   // 
  },[searchText]);
  if (!mounted) return <div className={styles.headerDiv}>
      <div className={styles.headerLogoDiv}>
          <a className={styles.logo}>ayakkabimakineleri.com</a>
          </div>
      <div className={styles.searchDiv}>
      </div>
    </div>;
  
  return (
    <div className={styles.headerDiv}>
      <div className={styles.headerLogoDiv}>
        <Link href='/'>
          <a className={styles.logo}>ayakkabimakineleri.com</a>
        </Link>
      </div>
      <div className={styles.searchDiv}>
        <div className={styles.searchInput}>
          <form noValidate role="search" >
          <input className={styles.searchBox} placeholder="ara" title='Search bar' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
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
                  <a className={styles.productTitle}>{product.name}</a>
                  <a className={styles.productOwner}>{nameConfig.replace(/\s+$/g, '')}</a>
                  <a className={styles.productAdress}>{product.users.address.split('%')[1]}</a>
                  <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
                </div>
              </div></a>
            </Link>
            }
          )}
        </div>}
        
      </div>
      <NavBar  navSelect={navSelect}/>
    </div>
  )
}

export default Header

