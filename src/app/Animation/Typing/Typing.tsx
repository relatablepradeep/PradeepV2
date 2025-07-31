'use client'
import TypewriterComponent from "typewriter-effect";


export default function Typing() {
  return (
    <div className="text-black">
      <TypewriterComponent
        onInit={(typewriter) => {
          typewriter
            .typeString('hi i am pradeep!')
            .pauseFor(1000)
            .deleteAll()
            .typeString('Another one')
            .pauseFor(1000)
            .deleteAll()
            .start();
        }}
        options={{ loop: true }}
      />
    </div>
  );
}