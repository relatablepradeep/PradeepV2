import Image from "next/image";

export default function Mob_Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t rounded-b-2xl border-gray-200 md:hidden">
      <ul className="flex justify-around items-center py-2">
        {/* Home */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Image src="/home.svg" alt="Home" width={24} height={24} />
          <span className="text-xs">Home</span>
        </li>

        {/* Projects */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Image src="/project-management.svg" alt="Projects" width={24} height={24} />
          <span className="text-xs">Projects</span>
        </li>

        {/* Contact */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Image src="/conversation.svg" alt="Contact" width={24} height={24} />
          <span className="text-xs">Contact</span>
        </li>

        {/* Social */}
        <li className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition">
          <Image src="/add-account.svg" alt="Social" width={24} height={24} />
          <span className="text-xs">Social</span>
        </li>
      </ul>
    </nav>
  );
}
