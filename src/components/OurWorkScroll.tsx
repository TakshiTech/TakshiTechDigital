"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const items = [
  { title: "Promotional Video", image: "/works/ayush.jpg" },
  { title: "PR Repositioning", image: "/works/saaki.jpg" },
  { title: "Digital Marketing", image: "/works/haldirams.jpg" },
  { title: "Digital Marketing", image: "/works/lyra.jpg" },
  { title: "Website Development", image: "/works/olamoney.jpg" },
  { title: "Promotional Video", image: "/works/yolo.jpg" },
];

const OurWorkScroll = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <section className="w-full bg-black text-white py-10 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-6">OUR WORK</h2>
      <div className="flex justify-center gap-2 flex-wrap mb-6">
        <button className="border px-4 py-1 rounded-full">All</button>
        <button className="border px-4 py-1 rounded-full">VIDEOS</button>
        <button className="border px-4 py-1 rounded-full">PR</button>
        <button className="border px-4 py-1 rounded-full">UI/UX</button>
        <button className="border px-4 py-1 rounded-full">3D</button>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 w-max"
          animate={controls}
          ref={containerRef}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] max-w-[250px] bg-white text-black rounded-2xl shadow-lg overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={250}
                height={300}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4 text-lg font-semibold">{item.title}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurWorkScroll;
