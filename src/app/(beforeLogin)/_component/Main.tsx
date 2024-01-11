import Image from "next/image";
import Link from "next/link";

import styles from './main.module.css';
import zlogo from '../../../../public/zlogo.png';

export default function MainPage(){
  return (
    <>
      <div className={styles.left}>
        <Image src={zlogo} alt="logo"></Image>
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>회원가입</Link>
        <h3>이미 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>로그인</Link>
        {/* <Link href="/i/flow/login" className={styles.login}>로그인</Link> */}
      </div>
    </>
  )
}