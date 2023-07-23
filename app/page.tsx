import Form from "@/components/form";
import { fetcher } from "@/utils/fetcher";
import Image from 'next/image';

export default async function Page() {
  const { data } = await fetcher.get<
    {
      id: number;
      name: string;
      email: string;
    }[]
  >("/list");

  return (
    <main className="flex min-h-screen justify-center space-x-4 items-center">
      <Form />
      <Image src="/vercel.svg" height={200} width={200} alt="vercel" />
      <div className="border ring-2 p-4">
        <ul role="list" className="divide-y divide-gray-100">
          {data.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex items-center gap-x-3">
                <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
