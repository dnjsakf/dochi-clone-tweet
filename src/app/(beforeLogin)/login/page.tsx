/* Server Component Redirect */
// import { redirect } from "next/navigation";

// export default function Page(){
//   return redirect("/i/flow/login");
// }

/* Client Comnponent Redirect */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"
import MainPage from "../_component/Main";

export default function Page(){
  const router = useRouter();
  
  // 이전 히스토리를 대체하여 router.back() 호출 시, 이전 페이지로 이동
  useEffect(()=>{
    router.replace("/i/flow/login");
  }, []);

  // router.push 를 사용하면, /login 으로 이동

  return (
    <MainPage />
  );
}
