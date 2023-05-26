import { addItem } from "@/database";
import { revalidateTag } from "next/cache";

export const runtime = "edge";

export default async function Home() {
  const res = await fetch(`${process.env.API_URL}/api/list`, {
    next: { tags: ["list"] },
  });
  const items = (await res.json()) as string[];

  const saveForm = async (data: FormData) => {
    "use server";

    addItem(data.get("company") as string);
    revalidateTag("list");
  };

  return (
    <main className="flex min-h-screen justify-center space-x-4 items-center">
      <form action={saveForm} className="border ring-2 p-4">
        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Company
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="company"
              id="company"
              autoComplete="organization"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <div className="border ring-2 p-4">
        <ul role="list" className="divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item} className="py-4">
              <div className="flex items-center gap-x-3">
                <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-900">
                  {item}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
