// app/auth/signin/page.tsx

import Header from "@/app/components/Header";
import { signIn, providerMap } from "@/auth";

export default async function SignInPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="https://lookaside.fbsbx.com/elementpath/media/?media_id=865993581009758&version=1785457325"
          alt="instagram-image"
        />
        <div>
          {providerMap.map((provider) => (
            <div key={provider.id} className="flex flex-col items-center">
              <img
                className="w-32 object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi5OK_1lUZBWtbWYCOA0xEXlmo8wx2ibaGpo_J7mpk94QAi7Z2WtEBZIw&s=10"
                alt=""
              />
              <p className="text-sm italic my-10 text-center">
                This app is created for learning purposes
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn(provider.id, { redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                >
                  Sign in with {provider.name}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
