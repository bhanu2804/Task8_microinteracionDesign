import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

export function LikeButtonInteraction() {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<{ id: number; angle: number }[]>([]);

  const handleLike = () => {
    if (!isLiked) {
      // Create particles for burst effect
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        angle: (360 / 8) * i,
      }));
      setParticles(newParticles);

      // Clear particles after animation
      setTimeout(() => setParticles([]), 600);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-red-400"
              initial={{
                x: "-50%",
                y: "-50%",
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: `calc(-50% + ${Math.cos((particle.angle * Math.PI) / 180) * 40}px)`,
                y: `calc(-50% + ${Math.sin((particle.angle * Math.PI) / 180) * 40}px)`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Like Button */}
        <motion.button
          onClick={handleLike}
          className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              scale: isLiked ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className="w-12 h-12 transition-colors"
              fill={isLiked ? "#ef4444" : "none"}
              stroke={isLiked ? "#ef4444" : "#64748b"}
              strokeWidth={2}
            />
          </motion.div>

          {/* Circular ring animation */}
          <AnimatePresence>
            {isLiked && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Counter */}
      <div className="text-center">
        <motion.div
          key={isLiked ? "liked" : "unliked"}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-slate-900"
        >
          {isLiked ? "1,234" : "1,233"}
        </motion.div>
        <p className="text-sm text-slate-600">likes</p>
      </div>

      {/* Message */}
      <AnimatePresence>
        {isLiked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-red-500"
          >
            You liked this!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
