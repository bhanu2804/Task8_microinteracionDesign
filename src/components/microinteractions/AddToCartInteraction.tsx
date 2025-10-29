import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Check, Plus } from "lucide-react";
import { Button } from "../ui/button";

type CartState = "idle" | "adding" | "success";

export function AddToCartInteraction() {
  const [state, setState] = useState<CartState>("idle");
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    setState("adding");

    // Simulate adding to cart
    setTimeout(() => {
      setState("success");
      setCount((prev) => prev + 1);

      // Reset to idle
      setTimeout(() => {
        setState("idle");
      }, 1500);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Product Card */}
      <motion.div
        className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 relative overflow-hidden"
        animate={{
          scale: state === "adding" ? 0.98 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Product Image Placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-blue-400" />
        </div>

        {/* Product Info */}
        <h4 className="text-slate-900 mb-1">Premium Product</h4>
        <p className="text-slate-600 text-sm mb-4">$49.99</p>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={state !== "idle"}
          className="w-full relative overflow-hidden"
          style={{
            backgroundColor:
              state === "success" ? "#10b981" : state === "adding" ? "#3b82f6" : undefined,
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
                <Plus className="w-4 h-4" />
                Add to Cart
              </motion.span>
            )}

            {state === "adding" && (
              <motion.span
                key="adding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                Adding
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </motion.div>
              </motion.span>
            )}

            {state === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Added!
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {/* Flying Cart Animation */}
        <AnimatePresence>
          {state === "adding" && (
            <motion.div
              className="absolute"
              initial={{ x: "50%", y: "80%", scale: 1, opacity: 1 }}
              animate={{
                x: "80%",
                y: "-20%",
                scale: 0.3,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <ShoppingCart className="w-8 h-8 text-blue-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cart Counter */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <motion.div
            className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center"
            animate={{
              scale: state === "success" ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <ShoppingCart className="w-8 h-8 text-white" />
            
            {/* Counter Badge */}
            <AnimatePresence>
              {count > 0 && (
                <motion.div
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                >
                  {count}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Ripple Effect */}
          <AnimatePresence>
            {state === "success" && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-500"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </div>

        <div>
          <p className="text-slate-900">Cart Items</p>
          <motion.p
            key={count}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm text-slate-600"
          >
            {count} {count === 1 ? "item" : "items"}
          </motion.p>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center overflow-hidden"
          >
            <p className="text-green-700 text-sm">
              Item successfully added to your cart!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
