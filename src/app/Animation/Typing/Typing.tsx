'use client'
import { TypeAnimation } from 'react-type-animation';

const TEXTS = [
  'Frontend developer',
  'Backend developer',
  'Web 3 developer',
  'Vibe coder'
];

export default function Typing() {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '300px',       // enough for the longest phrase
        textAlign: 'left',
        fontFamily: 'monospace', // keeps spacing consistent
        overflow: 'hidden',
      }}
    >
      <TypeAnimation
        sequence={TEXTS.flatMap(text => [text, 1000])}
        style={{
          fontSize: '2em',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
        repeat={Infinity}
      />
    </div>
  );
}
