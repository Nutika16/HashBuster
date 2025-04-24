import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; 

export function AnimatedTitle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <h1 className="text-3xl font-bold text-white">HASHBUSTER</h1>;

  const title = "HASHBUSTER⚡";

  return (
    <h1 className="text-5xl font-bold relative">
      <span className="sr-only">HASHBUSTER</span>
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent opacity-70">
        {title}
      </span>
      <span className="relative">
        {title.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block drop-shadow-white/20 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
