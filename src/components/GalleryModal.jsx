import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

/**
 * Animated full-screen gallery modal
 */
export function GalleryModal({ images, onClose }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Wrap around index
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 4000); // 4 seconds per image

    return () => clearInterval(timer);
  }, [isPlaying, page]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setIsPlaying(false);
        paginate(1);
      } else if (e.key === "ArrowLeft") {
        setIsPlaying(false);
        paginate(-1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md"
    >
      {/* Background click area to close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Controls Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:p-10 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] pointer-events-auto">
          Fashion Explore — {imageIndex + 1} / {images.length}
        </div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-white"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span className="hidden md:inline">{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-white"
          >
            <span className="hidden md:inline">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Area */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 md:p-20 z-10 pointer-events-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
                setIsPlaying(false);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
                setIsPlaying(false);
              }
            }}
            className="absolute max-h-[85vh] max-w-[90vw] object-contain pointer-events-auto cursor-grab active:cursor-grabbing"
            alt={`Gallery image ${imageIndex + 1}`}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 z-40 flex items-center px-4 md:px-10">
        <button
          onClick={() => {
            setIsPlaying(false);
            paginate(-1);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-40 flex items-center px-4 md:px-10">
        <button
          onClick={() => {
            setIsPlaying(false);
            paginate(1);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2 z-50">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsPlaying(false);
              setPage([idx, idx > imageIndex ? 1 : -1]);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === imageIndex ? "w-8 bg-[var(--gold)]" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
