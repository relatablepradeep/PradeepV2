import Image from "next/image";
import Link from "next/link";

export default function Mob_Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t rounded-b-2xl border-gray-200 md:hidden">
      <ul className="flex justify-around items-center py-2">
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Link href="/" className="flex flex-col items-center">
            <Image src="/home.svg" alt="Home" width={24} height={24} />
            <span className="text-xs">Home</span>
          </Link>
        </li>

        {/* Projects */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Link href="/Projects" className="flex flex-col items-center">
            <Image src="/project-management.svg" alt="Projects" width={24} height={24} />
            <span className="text-xs">Projects</span>
          </Link>
        </li>

        {/* Contact */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Link href="/contact" className="flex flex-col items-center">
            <Image src="/conversation.svg" alt="Contact" width={24} height={24} />
            <span className="text-xs">Contact</span>
          </Link>
        </li>

        {/* Social */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Link href="/social" className="flex flex-col items-center">
            <Image src="/add-account.svg" alt="Social" width={24} height={24} />
            <span className="text-xs">Social</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
