import Link from "next/link";

export default function Nav() {
  return (
    <header className="hidden md:block border-0 shadow sticky top-0 z-50 text-black bg-gray-100 w-full">
      <main className="flex items-center justify-between h-20 lg:h-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        
        {/* Left: Logo */}
        <div  className="relative lg:right-76">
          <Link className="text-2xl lg:text-3xl font-bold" href="/">
            Pradeep
          </Link>
        </div>

        {/* Center: Nav Links */}
        <nav className="flex space-x-6 lg:space-x-16 font-light text-lg lg:text-2xl">
          <Link href="/Home">Home</Link>
          <Link href="/Project">Project</Link>
          <Link href="/About">About me</Link>
          <Link href="/">Blog</Link>
        </nav>

        {/* Right: Button */}
        <div className="relative lg:left-64">
          <Link href="/">
            <button className="font-bold border-2  text-sm lg:text-lg rounded-xl px-4 py-2 lg:px-6 lg:py-3">
              Let&apos;s Chat
            </button>
          </Link>
        </div>

      </main>
    </header>
  );
}
