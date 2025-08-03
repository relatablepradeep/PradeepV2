'use client'
import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Frontend devloper', 'Backend devloper', 'Web 3 devloper', 'Vibe coder'];

export default function Text(){
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <h1>
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h1>
  );
};