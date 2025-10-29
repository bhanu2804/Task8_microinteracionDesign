import { useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

export function ToggleInteraction() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Toggle Switch */}
      <div
        onClick={toggleSwitch}
        className="w-48 h-24 bg-slate-200 flex items-center rounded-full p-2 cursor-pointer relative"
        style={{
          justifyContent: isOn ? "flex-end" : "flex-start",
          backgroundColor: isOn ? "#3b82f6" : "#cbd5e1",
        }}
      >
        <motion.div
          className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center"
          layout
          transition={spring}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: isOn ? 360 : 0,
              scale: isOn ? [1, 1.2, 1] : [1, 0.9, 1],
            }}
            transition={{
              rotate: { duration: 0.5 },
              scale: { duration: 0.3 },
            }}
          >
            {isOn ? (
              <Moon className="w-10 h-10 text-blue-500" />
            ) : (
              <Sun className="w-10 h-10 text-amber-500" />
            )}
          </motion.div>
        </motion.div>

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
          <motion.div
            animate={{ opacity: isOn ? 0 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            animate={{ opacity: isOn ? 0.3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Mode Text */}
      <motion.div
        key={isOn ? "dark" : "light"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-slate-900">
          {isOn ? "Dark Mode" : "Light Mode"}
        </p>
        <p className="text-sm text-slate-500 mt-1">
          {isOn ? "Night theme activated" : "Day theme activated"}
        </p>
      </motion.div>

      {/* Background Effect */}
      <motion.div
        className="w-full h-32 rounded-lg overflow-hidden"
        animate={{
          backgroundColor: isOn ? "#1e293b" : "#f1f5f9",
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <motion.h4
            animate={{ color: isOn ? "#f1f5f9" : "#1e293b" }}
            transition={{ duration: 0.5 }}
          >
            Preview Area
          </motion.h4>
          <motion.p
            className="text-sm mt-2"
            animate={{ color: isOn ? "#cbd5e1" : "#64748b" }}
            transition={{ duration: 0.5 }}
          >
            The theme changes smoothly with the toggle state, demonstrating how micro-interactions can enhance user experience.
          </motion.p>
        </div>
      </motion.div>

      {/* Decorative Particles */}
      <div className="relative w-full h-16">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              backgroundColor: isOn ? "#3b82f6" : "#fbbf24",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
