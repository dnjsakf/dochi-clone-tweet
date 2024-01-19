import style from './home.module.css';
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import PostForm from "./_component/PostForm";
// import Post from "@/app/(afterLogin)/_component/Post";
// import { QueryClient, dehydrate } from '@tanstack/react-query';
// import { revalidatePath, revalidateTag } from 'next/cache';
// import { getPostRecommends } from './_lib/getPostRecommends';
// import PostRecommends from './_component/PostRecommends';
// import { getFollowingPosts } from './_lib/getFollowingPosts';
// import TabDecider from './_component/TabDecider';
import { Suspense } from 'react';
import Loading from "@/app/(afterLogin)/home/loading";
import TabDeciderSuspense from './_component/TabDeciderSuspense';

export default async function Home() {
  // const queryClient = new QueryClient();

  // SSR로 먼저 그려져야되므로 콘텐츠가 그려지는 부분은 Suspense 에서 처리
  // SSR로 처리되기 때문에 로딩창이 보이지 않음, 로딩이 필요한 경우, 인피니티 사용X
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ['posts', 'recommends'], // 해당 key를 가지고 있으면 아래 함수 실행해서 값을 호출
  //   queryFn: getPostRecommends,
  //   // gcTime: 60*1000,
  //   initialPageParam: 0,
  // });
  // await queryClient.prefetchQuery({
  //   queryKey: ['posts', 'following'], // 해당 key를 가지고 있으면 아래 함수 실행해서 값을 호출
  //   queryFn: getFollowingPosts,
  //   // gcTime: 60*1000,
  // });

  // const dehydrateState = dehydrate(queryClient);

  // queryClient.getQueryData(['posts', 'recommends']); // RQProvider 내에서 언제든 데이터 조회 가능
  // queryClient.setQueryData(['posts', 'recommends'],  ~~~); // RQProvider 내에서 언제든 데이터 수정

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  )
}