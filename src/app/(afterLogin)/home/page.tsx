import style from './home.module.css';
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import PostForm from "./_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_component/PostRecommends';
import { getFollowingPosts } from './_lib/getFollowingPosts';
import TabDecider from './_component/TabDecider';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'recommends'], // 해당 key를 가지고 있으면 아래 함수 실행해서 값을 호출
    queryFn: getPostRecommends,
    // gcTime: 60*1000,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'following'], // 해당 key를 가지고 있으면 아래 함수 실행해서 값을 호출
    queryFn: getFollowingPosts,
    // gcTime: 60*1000,
  });

  const dehydrateState = dehydrate(queryClient);

  // queryClient.getQueryData(['posts', 'recommends']); // RQProvider 내에서 언제든 데이터 조회 가능
  // queryClient.setQueryData(['posts', 'recommends'],  ~~~); // RQProvider 내에서 언제든 데이터 수정

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}