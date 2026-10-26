"use client";

import { useRef, useState, type ReactNode } from "react";

export default function ImageLightbox({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  const open = (e: React.MouseEvent) => {
    if (!(e.target instanceof HTMLImageElement)) return;
    setImage({ src: e.target.dataset.full || e.target.currentSrc || e.target.src, alt: e.target.alt });
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div onClick={open} className="[&_img]:cursor-zoom-in">
        {children}
      </div>
      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        onClose={() => setImage(null)}
        className="m-auto max-w-none max-h-none w-screen h-screen bg-transparent p-4 sm:p-8 backdrop:bg-black/85 backdrop:backdrop-blur-sm cursor-zoom-out"
      >
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain"
          />
        )}
      </dialog>
    </>
  );
}
