import Image from "next/image"
import Link from "next/link"
import CONSTANTS from "../constants.config"
import styles from '../styles/Header.module.css'

const NavBar = ({navSelect}) => {
  const links = [
    { id: 0, name: CONSTANTS.home, to: CONSTANTS.homePath, select: navSelect==0? true : false, icon: navSelect==0 ? CONSTANTS.homeIconBg : CONSTANTS.homeIcon },
    { id: 1, name: CONSTANTS.add, to: CONSTANTS.addPath, select: navSelect==1? true : false, icon: navSelect==1 ? CONSTANTS.addIconBg : CONSTANTS.addIcon },
    { id: 2, name: CONSTANTS.account, to: CONSTANTS.accountPath, select: navSelect==2? true : false, icon: navSelect==2 ? CONSTANTS.accountIconBg : CONSTANTS.accountIcon }
  ]
  return (
    <ul className={styles.navUl}>
      {links.map(link => (
        <Link key={link.id} href={link.to}>
          <li key={link.name} className={ link.select? styles.menuItemSelected : styles.menuItem }>
            <div style={{ display: "flex", alignItems: "center"}}>
              <Image src={link.icon} alt={link.name} width="32" height="32" />
              <a className={styles.menuText }>{link.name}</a>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}

const Header = ({navSelect}) => {
  return (
    <div className={styles.headerDiv}>
      <div className={styles.headerLogoDiv}>
        <Link href='/'>
          <a className={styles.logo}>ayakkabimakineleri.com</a>
        </Link>
      </div>
      <div className={styles.searchDiv}>
        <form noValidate action="" role="search">
          <input className={styles.searchBox} placeholder="ara" title='Search bar'/>
        </form>
        
        <Image src={CONSTANTS.searchIconPath} className={styles.searchIcon} alt="arama butonu" width="32" height="32" />
      </div>
      <NavBar  navSelect={navSelect}/>
    </div>
  )
}

export default Header