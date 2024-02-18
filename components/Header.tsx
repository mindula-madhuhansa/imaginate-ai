import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 sticky top-0 bg-white z-50 shadow-md">
      {/* Left Div */}
      <div className="flex space-x-2 items-center">
        <Image
          src="https://links.papareact.com/4t3"
          alt="logo"
          width={40}
          height={40}
        />

        <div>
          <h1 className="text-lg font-bold">
            Imaginate <span className="text-blue-600">AI</span>
          </h1>
          <h2 className="text-xs">
            Powered by DALL·E 2, ChatGPT and Microsoft Azure!
          </h2>
        </div>
      </div>

      {/* Right Div */}
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link
          href="https://imaginate-ten.vercel.app/"
          className="font-light px-2 text-right"
        >
          My Portfolio
        </Link>
        <Link
          href="https://github.com/mindula-madhuhansa/imaginate-ai"
          className="font-light px-2"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
}

export default Header;
