

export async function getPostRecommends() {
  const res = await fetch(`http://localhost:9090/api/postRecommends`, {
    next: {
      tags: ['posts', 'recommends'], // server의 cache를 refresh 하기 위한 Tag 키, revalidateTag('recommends');
    },
    // cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  // revalidatePath('/home'); // 특정 route의 접근시 cache를 refresh
  // revalidatePath('recommends'); // 특정 태그의 cache를 refresh
  return res.json();
}
