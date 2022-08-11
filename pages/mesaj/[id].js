import axios from "axios";
import Head from "next/head";
import Image from "next/future/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styles from '../../styles/MessagePage.module.css';
import { w3cwebsocket } from "websocket";
import jwt_decode from "jwt-decode";

function MessagePage({data, messages, goster, product, token}){
  var userID = jwt_decode(token).user_id
  const [magazaName] = useState(data ? data[1] : '');
  const [image] =useState(product.id ? product.images.split(",") : []);
  const [message, setMessage] = useState('');
  const [gosterP, setGosterP] = useState(goster);
  const [messageList, setMessageList] = useState(messages);
  const [client] = useState(() =>  new w3cwebsocket(process.env.NEXT_PUBLIC_AXIOS_CONF+'/ws/'+(userID > data[0] ? userID+""+data[0]: data[0]+""+userID)))
  
  useEffect(()=>{
    client.onopen = () => {console.log("connected")}
    client.onerror = function() {console.log('Connection Error')}
    client.onmessage = (message) => {
      var dataFromServer = JSON.parse(message.data);
      setMessageList(current => [...current, dataFromServer]);
    }
  },[])

  const unit = {
    1: "tl",
    2: "£",
    3: "$"
  }

  const submitMessage = async (event) => {
    event.preventDefault();
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
    await axios.post(process.env.NEXT_PUBLIC_AXIOS_CONF+"/messages/",groupData).then(response => {
      client.send(JSON.stringify(response.data.data));
      setMessage('');
      setGosterP(false);

    }).catch((error) => {
      console.error('Error:', error.response);
    });
  }
  return (
    <main className={styles.main}>
       <Head>
      <title>{data[1]}</title>
    </Head>
      <Link rel="prefetch" href={`/magaza/${data[0]}-${data[1]}`}>
          <a className={styles.OwnerTitle}>
      {magazaName}
        <Image alt="gönder" key="left-button" className={styles.productimage} src='/icons/right-arrow-white.svg' height='20' width='20' />
      </a>
      </Link>
      <div id="chatView" className={styles.chatView} ref={node => {if(node) node.scrollTop = node.scrollHeight }}>
      {Object.keys(messageList).map((e)=>{
        const imageArray = messageList[e].product.images.split(",")
        if(messageList[e].owner.id == data[0]){
          if(e>0 && messageList[e].product.id !== messageList[e-1].product.id){
            return <div key={e} className={styles.chatSatirLeft}>
          <div className={styles.chatDiv}>
            <div className={styles.productCardM}>
              <Image priority="true" alt="ayakkabı makinesi fotografı" key={messageList[e].id} className={styles.productimageM} src={imageArray[messageList[e].product.vitrin - 1]} height='100' width='140'/>
              <a className={styles.productTitleM}>{messageList[e].product.name}</a>
              <a className={styles.productPriceM}>{messageList[e].product.price} {unit[messageList[e].product.priceUnit]}</a>
            </div>
            <a className={styles.chatText}>{messageList[e].name}</a>
          </div>
        </div>
          }else if(e==0){
            return <div key={e} className={styles.chatSatirLeft}>
          <div className={styles.chatDiv}>
            <div className={styles.productCardM}>
              <Image priority="true" alt="ayakkabı makinesi fotografı" key={messageList[e].id} className={styles.productimageM} src={imageArray[messageList[e].product.vitrin - 1]} height='100' width='140'/>
              <a className={styles.productTitleM}>{messageList[e].product.name}</a>
              <a className={styles.productPriceM}>{messageList[e].product.price} {unit[messageList[e].product.priceUnit]}</a>
            </div>
            <a className={styles.chatText}>{messageList[e].name}</a>
          </div>
        </div>
        }else{
          return <div key={e} className={styles.chatSatirLeft}>
            <div className={styles.chatDivR}>
              <a className={styles.chatText}>{messageList[e].name}</a>
            </div>
          </div>
        }
          
        }else {
          return <div key={e} className={styles.chatSatirRight}>
            <div className={styles.chatDivR}>
              <a className={styles.chatText}>{messageList[e].name}</a>
            </div>
          </div>
        }
      })}
      </div>
      <div className={styles.chatWrite}>
        {gosterP && <div className={styles.productCard}>
              <Image src={image[product.vitrin-1]} key="mesaj-ilan" priority="true" alt='ayakkabi-makinesi-fotografi'  className={styles.productimage} height='100' width='140'/>
              <a className={styles.productTitle}>{product.name}</a>
              <a className={styles.productPrice}>{product.price} {unit[product.priceUnit]}</a>
    </div>}
        <div>
          <form onSubmit={submitMessage}>
            <input required type="text" className={styles.chatInput} id="mesaj" name="mesaj" placeholder="bla bla bla" value={message} onChange={(e) => setMessage(e.target.value)}   />
            <input type="image" src="/icons/right-arrow.svg" className={styles.writeButton} alt="Submit" width="48" height="48"/>
          </form>
          
        </div>
      
      </div>
     
    </main>
    )
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
        product,
        token
      },
    }
  } catch (error) {
    const messages = []
    const product = false
    const token= -1;
    return {
      props: {
        data: params,
        messages,
        goster: false,
        product,
        token
      },
    }
  }
  
}

export default MessagePage;