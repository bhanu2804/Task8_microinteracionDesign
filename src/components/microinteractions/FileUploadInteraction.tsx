import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Check, File } from "lucide-react";
import { Button } from "../ui/button";

type UploadState = "idle" | "uploading" | "success";

export function FileUploadInteraction() {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setState("uploading");
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState("success");
          // Reset after 2 seconds
          setTimeout(() => {
            setState("idle");
            setProgress(0);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Upload Zone */}
      <motion.div
        className="relative w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        style={{
          borderColor: state === "success" ? "#10b981" : state === "uploading" ? "#3b82f6" : "#cbd5e1",
          backgroundColor: state === "success" ? "#f0fdf4" : state === "uploading" ? "#eff6ff" : "#f8fafc",
        }}
        animate={{
          scale: state === "uploading" ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        onClick={state === "idle" ? handleUpload : undefined}
      >
        {/* Progress Bar */}
        <AnimatePresence>
          {state === "uploading" && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>

        {/* Icon Animation */}
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="w-12 h-12 text-slate-400 mb-2" />
            </motion.div>
          )}

          {state === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <File className="w-12 h-12 text-blue-500 mb-2" />
              </motion.div>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            >
              <motion.div
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-12 h-12 text-green-500 mb-2" strokeWidth={3} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm"
            style={{
              color: state === "success" ? "#059669" : state === "uploading" ? "#2563eb" : "#64748b",
            }}
          >
            {state === "idle" && "Click to upload file"}
            {state === "uploading" && `Uploading... ${progress}%`}
            {state === "success" && "Upload complete!"}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* State Indicator */}
      <div className="flex gap-2">
        {["idle", "uploading", "success"].map((s) => (
          <motion.div
            key={s}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: state === s ? "#3b82f6" : "#cbd5e1",
              scale: state === s ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
