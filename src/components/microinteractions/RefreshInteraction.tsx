import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Check } from "lucide-react";
import { Button } from "../ui/button";

type RefreshState = "idle" | "refreshing" | "complete";

export function RefreshInteraction() {
  const [state, setState] = useState<RefreshState>("idle");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleRefresh = () => {
    setState("refreshing");

    // Simulate refresh
    setTimeout(() => {
      setState("complete");
      setLastUpdate(new Date());

      // Reset to idle
      setTimeout(() => {
        setState("idle");
      }, 1500);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Refresh Button */}
      <motion.div className="relative">
        <Button
          onClick={handleRefresh}
          disabled={state !== "idle"}
          variant="outline"
          className="relative w-32 h-32 rounded-full p-0 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {(state === "idle" || state === "refreshing") && (
              <motion.div
                key="refresh"
                initial={{ rotate: 0, scale: 1 }}
                animate={{
                  rotate: state === "refreshing" ? 360 : 0,
                  scale: state === "refreshing" ? 1.1 : 1,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  rotate: {
                    duration: state === "refreshing" ? 1 : 0,
                    repeat: state === "refreshing" ? Infinity : 0,
                    ease: "linear",
                  },
                  scale: { duration: 0.2 },
                }}
              >
                <RefreshCw className="w-12 h-12 text-blue-500" />
              </motion.div>
            )}

            {state === "complete" && (
              <motion.div
                key="complete"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <Check className="w-12 h-12 text-green-500" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Circular Progress */}
        {state === "refreshing" && (
          <svg
            className="absolute inset-0 -rotate-90"
            width="100%"
            height="100%"
            viewBox="0 0 128 128"
          >
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        )}

        {/* Success Ring */}
        <AnimatePresence>
          {state === "complete" && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-500"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Status Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <p className="text-slate-900">
            {state === "idle" && "Pull to refresh"}
            {state === "refreshing" && "Refreshing..."}
            {state === "complete" && "Updated!"}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Content Cards with Stagger Animation */}
      <div className="w-full space-y-2 mt-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`${state}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: state === "complete" ? i * 0.1 : 0,
              duration: 0.3,
            }}
            className="h-12 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg flex items-center px-4"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 mr-3" />
            <div className="text-sm text-slate-600">Content item {i}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
