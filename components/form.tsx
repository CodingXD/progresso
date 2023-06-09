"use client";

import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const Form = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formProps = Object.fromEntries(formData);

        await fetcher.post("/list", formProps);

        startTransition(() => router.refresh());
      }}
      className="border ring-2 p-4"
    >
      <div className="sm:col-span-2">
        <label
          htmlFor="item"
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          Item
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="item"
            id="item"
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
  );
};

export default Form;
