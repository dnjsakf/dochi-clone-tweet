"use client";

import Post from "../../_component/Post";
import { InfiniteData, useInfiniteQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import {useInView} from "react-intersection-observer";
import Loading from "../loading";

export default function PostRecommends(){
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    // isError,
    // isLoading,
    // isPending,
  // } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
  // 상위의 Suspense 에 걸려있는 Fallback이 실행됨
  } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
  // const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'], // 해당 key를 가지고 있으면 아래 함수 실행해서 값을 호출
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 6000 ms 이후에 Fresh -> Stale로 전환, 기본값 0
    // staleTime: Infinity, // ES5 -> 무제한
    gcTime: 60 * 1000, // 가비지 콜렉트 시간, 기본값 5분, 5분 뒤에는 메모리에서 정리
    // 주의: gcTime >= staleTime 
    // staleTime: Cache 유지시간
    // gcTime: Memory 유지시간

    // Required Fields for useInfiniteQuery
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  const { ref, inView } = useInView({ // 화면에서 ref가 보이는 순간 
    threshold: 0, // 얼만큼 보여질 때,
    delay: 0, // 지연시간
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {
        data?.pages.map((page, i)=>(
          <Fragment key={i}>
            {
              page.map((post) => (
                <Post key={post.postId} post={post} />
              ))
            }
          </Fragment>
        ))
      }
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}


/**
 * 모든 데이터는 Fresh가 아니다, 이게 기본값이고 모든 데이터는 서버에서 가져와야됨
 * 상태값
 * - Inactive: 값을 사용하고 있는지 여부
 * - Fresh: 최신 데이터
 * - Stale: 기회가 되면 데이터를 가져와라
      new QueryClient({
        defaultOptions: {  // react-query 전역 설정
          queries: {
            // 아래의 경우 Stale 상태에서 다시 가져옴
            refetchOnWindowFocus: false, // 탭 전환해서 돌아올 경우,
            retryOnMount: true, // 컴포넌트가 Unmount -> Mount 되었을 때,
            refetchOnReconnect: false, // 인터넷 연결이 끊겼다가 다시 접속되는 순간,
            ...
          }
        }
      });
 * Actions
 * - Refetch: 데이터를 새로 조회
 * - Invalidate: 미사용 처리, Observer가 있으면 데이터를 새로 조회
 * - Reset: 초기데이터가 있는 경우에 해당 데이터로 되돌리기, 데이터가 없으면 다시 조회
 * - Remove: 데이터 삭제
 * - Trigger / Restore Loading: 데이터 Fetching 상태 확인
 * - Trigger / Restore Error: 데이터 Fetching 에러 상태 확인
 */