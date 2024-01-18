"use client";

import React, {useState} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({children}: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {  // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 탭 전환해서 돌아올 경우,
          retryOnMount: true, // 컴포넌트가 Unmount -> Mount 되었을 때,
          refetchOnReconnect: false, // 인터넷 연결이 끊겼다가 다시 접속되는 순간,
          retry: false, // 데이터 가져오다 실패하는 경우, false: error 페이지 호출
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local' }/>
    </QueryClientProvider>
  );
}

export default RQProvider;