"use client";

import { useEffect } from "react";

type Props = {
  url: string;
};

const InstagramReel = ({ url }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="instagram-embed px-2 py-5 sm:p-5">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
      ></blockquote>
    </div>
  );
};

export default InstagramReel;
