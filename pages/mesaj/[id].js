import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import * as React from "react";
import Layout from "../../components/Layout";
import styles from '../../styles/MessagePage.module.css';

function MessagePage({data, messages, goster, product}){
  const [mounted, setMounted] = React.useState(false);
  const [buttonState, setButtonState] = React.useState(false);
  const [image, setImage] = React.useState([]);
  const [message, setMessage] = React.useState('')
  React.useEffect(() => {
    if(product.id){
      setImage(product.images.split(","))
    }
    setMounted(true)}, []);
  if (!mounted) return <Layout><main className={styles.main}></main></Layout>;
  const unit = {
    1: "tl",
    2: "£",
    3: "$"
  }

  const submitMessage = async (event) => {
    setButtonState(true);
    const cookies = parseCookies()
    const userID = parseInt(data[0])
    var groupData = {}
    if(messages.length>0){
      var productID = messages.at(-1).product.id
    }
    if(product){
      var productID = product.id
    }
    if(productID){
      groupData = {
      message, userID, productID
      }
    }else{
      groupData = {
        message, userID
      }
    }
    axios.defaults.headers.common['Authorization'] = cookies.OursiteJWT;
    await axios.post(process.env.NEXT_PUBLIC_AXIOS_CONF+"/messages",groupData).then(response => {
      setButtonState(false);
    }).catch((error) => {
      console.error('Error:', error.response);
    });
  }

  return (<Layout>
    <Head>
      <title>{data[1]}</title>
    </Head>
    <main className={styles.main}>
      <Link href={`/magaza/${data[1]}`}>
        <a>
          <div className={styles.OwnerTitle}>
        <a>{data[1]}</a>
        <Image className={styles.productimage} src='/icons/right-arrow-white.svg' height='20' width='20' />
      </div>
        </a>
      </Link>
      <div id="chatView" className={styles.chatView} ref={node => {if(node) node.scrollTop = node.scrollHeight }}>
      {messages.map(e=>{
        const imageArray = e.product.images.split(",")
        if(e.owner.id == data[0]){
          return <div className={styles.chatSatirLeft}>
          <div className={styles.chatDiv}>
            <div className={styles.productCardM}>
              <Image priority="true" key={e.id} className={styles.productimageM} src={imageArray[e.product.vitrin - 1]} height='100' width='140'/>
              <a className={styles.productTitleM}>{e.product.name}</a>
              <a className={styles.productPriceM}>{e.product.price} {unit[e.product.priceUnit]}</a>
            </div>
            <a className={styles.chatText}>{e.name}</a>
          </div>
        </div>
        }else {
          return <div className={styles.chatSatirRight}>
            <div className={styles.chatDivR}>
              <a className={styles.chatText}>{e.name}</a>
            </div>
          </div>
        }
      })}
      </div>
      <div className={styles.chatWrite}>
        {goster && <div className={styles.productCard}>
              <Image priority="true"  className={styles.productimage} src={image[product.vitrin - 1]} height='100' width='140'/>
              <a className={styles.productTitle}>{product.name}</a>
              <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
            </div>}
        <div>
          <form onSubmit={submitMessage}>
            <input required type="text" className={styles.chatInput} id="mesaj" name="mesaj" placeholder="bla bla bla" value={message} onChange={(e) => setMessage(e.target.value)}   />
            <input type="image" src="/icons/right-arrow.svg" className={styles.writeButton} alt="Submit" width="48" height="48" disabled={buttonState}/>
          </form>
          
        </div>
      
      </div>
     
    </main>
    
  </Layout>)
}

export const getServerSideProps = async (context) => {
  const params = context.params.id.split("-")
  try {
    const token=context.req.headers.cookie.split(";").find((c) => c.trim().startsWith("OursiteJWT")).split("=")[1];
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+`/messages/${params[0]}`)
    const messages = data.data
    var product =false
    messages.sort((a, b) => a.id - b.id);
    if(context.query.product){
      const { data } = await axios.get(process.env.NEXT_PUBLIC_AXIOS_CONF+`/products/${context.query.product}`)
      product = data.data
    }
    return {
      props: {
        data: params,
        messages,
        goster: context.query.product ? true : false,
        product
      },
    }
  } catch (error) {
    const messages = []
    const product = false
    return {
      props: {
        data: params,
        messages,
        goster: false,
        product
      },
    }
  }
  
}

export default MessagePage;