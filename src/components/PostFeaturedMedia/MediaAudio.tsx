import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import ButtonPlayMusicPlayer from "@/components/ButtonPlayMusicPlayer";

export interface MediaAudioProps {
  post: PostDataType;
}

const MediaAudio: FC<MediaAudioProps> = ({ post }) => {
  return (
    <>
      <ButtonPlayMusicPlayer
        className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center"
        post={post as any}
      />
    </>
  );
};

export default MediaAudio;
