// @ts-ignore
import { use } from 'react';

export const config = {
  dynamicParams: true,
};

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

async function fetchData(params: { id: string }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { next: { revalidate: 15 } },
  );
  const data = await res.json();
  return data;
}

export default function Page({
  params,
}: {
  params?: any;
  children?: React.ReactNode;
}) {
  const data = use(fetchData(params));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium text-zinc-200">{data.title}</h1>
      <p className="font-medium text-zinc-500">{data.body}</p>
    </div>
  );
}
