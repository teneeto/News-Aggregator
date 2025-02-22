import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
        <HomeIcon className="w-6 h-6" />
        <span>News Aggregator</span>
      </Link>
    </nav>
  );
};

export default Navbar;
