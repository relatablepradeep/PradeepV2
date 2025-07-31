import Link from "next/link"

export default function Nav() {

    return (

        <>

            <header className="border-0 shadow sticky top-0 z-50 text-black  bg-gray-100">

                <main className="flex  justify-evenly   ">

                    <div>

                        <Link className="text-3xl top-10 relative right-40 " href='/'>

                            Pradeep


                        </Link>



                    </div>


                    <div className="relative  space-x-36 top-10 font-extralight  text-2xl">

                        <Link href='/'>Home</Link>

                        <Link href='/'>Project</Link>

                        <Link href='/'>About me</Link>

                        <Link href='/'>Blog</Link>

                       



                    </div>

                    <button   className="font-blod border-2 text-2xl rounded-xl h-20 w-36 mt-6 mb-6 relative left-32">
                         <Link href='/'>Let's Chat</Link>
                    </button>










                </main>
            </header>



        </>
    )
}