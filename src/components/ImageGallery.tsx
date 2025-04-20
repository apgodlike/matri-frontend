"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function ImageGallery({ images, isOpen, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[80vh] p-0">
        <div className="relative w-full h-full">
          <Button
            variant="ghost"
            className="absolute right-2 top-2 z-50 bg-black/20 hover:bg-black/40"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-white" />
          </Button>

          {images.length > 0 && (
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </Button>
              <Button
                variant="ghost"
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm sm:text-base">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
