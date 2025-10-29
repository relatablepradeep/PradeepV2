import Link from "next/link";

export default function Nav() {
  return (
    <header className="hidden md:block border-0 shadow sticky top-0 z-50 p-6 text-black bg-gray-100  ">
      <main className="   justify-center flex 2xl:space-x-72 xl:space-x-72 lg:space-x-52 ">
        
       
        <div  className="   ">
          <Link className="lg:text-3xl    2xl:text-3xl md:text-xl font-bold" href="/">
            Pradeep
          </Link>
        </div>

        <nav className="flex xl:space-x-12 2xl:space-x-12 lg:space-x-8  font-light  lg:text-2xl  2xl:text-2xl">
          <Link href="/Home">Home</Link>
          <Link href="/Project">Project</Link>
          <Link href="/About">About me</Link>
          <Link href="/">Blog</Link>
        </nav>

        <div className="relative ">
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
