"use client";

import {ReactNode} from "react";
import style from './layout.module.css';
import Link from "next/link";
import Image from "next/image";
import ZLogo from '../../../public/zlogo.png';
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";

import SearchSection from "./_component/SearchSection";
import TrendSection from "./_component/TrendSection";
import FollowSection from "./_component/FollowSection";

type Props = {
  children: ReactNode,
  modal: ReactNode
}

export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={ZLogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={style.postButton}>게시하기</Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <SearchSection />
            <TrendSection />
            <FollowSection />
          </section>
        </div>
      </div>
      { modal }
    </div>
  )
}