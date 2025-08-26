import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-0 shadow sticky top-0 z-50 text-black bg-gray-100 hidden md:block h-28">
      <main className="flex justify-evenly">
        <div>
          <Link className="text-3xl top-10 relative lg:right-25" href="/">
            Pradeep
          </Link>
        </div>

        <div className="relative space-x-36 top-10 font-extralight text-2xl">

          
          <Link href="/Home">Home</Link>
          <Link href="/Project">Project</Link>
          <Link href="/About">About me</Link>
          <Link href="/">Blog</Link>


        </div>

        <button className="font-bold border-2 lg:text-xl rounded-xl h-20 w-36 mt-5 mb-3 relative left-28">
          <Link href="/">Let&apos;s Chat</Link>
        </button>
      </main>
    </header>
  );
}
