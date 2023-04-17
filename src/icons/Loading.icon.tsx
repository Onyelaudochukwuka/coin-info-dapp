import React, { type FC, useRef } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";

interface ILoading{
    className?: string;
}

const Loading: FC<ILoading> = ({ className }) => {
  const player = useRef(null);
  return (
    <Player
      ref={player}
      autoplay
      loop
      controls={false}
      src="/loader.json"
      // eslint-disable-next-line no-unneeded-ternary
      className={className ? className : "w-24 h-24"}
    />
  );
};
export default Loading;