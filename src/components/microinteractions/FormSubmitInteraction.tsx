import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormState = "idle" | "loading" | "success";

export function FormSubmitInteraction() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setState("loading");

    // Simulate API call
    setTimeout(() => {
      setState("success");

      // Reset after 3 seconds
      setTimeout(() => {
        setState("idle");
        setEmail("");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Field */}
        <motion.div
          animate={{
            opacity: state === "success" ? 0.5 : 1,
            scale: state === "success" ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state !== "idle"}
            className="w-full"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div layout className="relative">
          <Button
            type="submit"
            disabled={state !== "idle" || !email}
            className="w-full relative overflow-hidden"
            style={{
              backgroundColor: state === "success" ? "#10b981" : undefined,
            }}
          >
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  Submit
                  <Send className="w-4 h-4" />
                </motion.span>
              )}

              {state === "loading" && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  Processing
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-4 h-4" />
                  </motion.div>
                </motion.span>
              )}

              {state === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2"
                >
                  Success!
                  <CheckCircle2 className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            {state === "loading" && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/30"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            )}
          </Button>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 overflow-hidden"
            >
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-green-700 text-sm"
              >
                Thank you! We've received your submission.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* State Timeline */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {["idle", "loading", "success"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{
                opacity: state === s ? 1 : 0.3,
              }}
            >
              <motion.div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs"
                animate={{
                  borderColor: state === s ? "#3b82f6" : "#cbd5e1",
                  backgroundColor: state === s ? "#eff6ff" : "transparent",
                  scale: state === s ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {i + 1}
              </motion.div>
              <span className="text-xs text-slate-600 capitalize">{s}</span>
            </motion.div>
            {i < 2 && (
              <motion.div
                className="w-8 h-0.5"
                animate={{
                  backgroundColor: ["loading", "success"].includes(state) && i === 0 ? "#3b82f6" : 
                                   state === "success" && i === 1 ? "#3b82f6" : "#cbd5e1",
                }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
