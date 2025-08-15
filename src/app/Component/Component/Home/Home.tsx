import Image from "next/image";

export default function Myhome() {
  return (
    <main className="bg-white block sm:hidden">
      {/* Background image */}
      <div className="relative w-full h-50">
        <Image
          src="/Home.jpg"
          alt="Home"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Foreground image with rounded corners */}
      <div className="border-2 absolute top-36 h-28 right-72 rounded-xl overflow-hidden">
        <Image
          src="/pradeep.jpg"
          alt="pradeep"
          width={100}
          height={80}
          className="object-cover object-top"
        />
      </div>

      <div className="flex mt-20 justify-between items-center px-4 ">
        <h1 className="font-medium text-black relative bottom-5 text-2xl left-1">Pradeep</h1>

        <div className="flex space-x-3 mb-10 ">
          <div className="border-2 border-black h-10 w-10 flex items-center justify-center rounded-xl bg-pink-100">
            <Image src="/conversation.svg" alt="conversation" width={24} height={24} />
          </div>

          <div className="border-2 border-black h-10 w-10 flex items-center justify-center rounded-xl bg-pink-500">
            <Image src="/email.svg" alt="email" width={24} height={24} />
          </div>
        </div>
      </div>
    </main>
  );
}
