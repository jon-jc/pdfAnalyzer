"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alisdair",
    role: "Researcher",
    affiliation: "University of Highlands and Islands",
    image: "/avatar1.png",
    quote:
      "I go through all the articles in the bulk download, save the ones that are clearly going to be useful and discard the remainder. This saves loads of time but also points me in directions I might not otherwise have thought of looking.",
  },
  {
    name: "Trevor",
    role: "Researcher",
    affiliation: "University of Sydney",
    image: "/avatar1.png",
    quote:
      "The bulk downloads give me the chance to read more related articles as well as seeing what research is citing the article I am looking at. It also helps me rapidly expand my personal digital library of references.",
  },
  {
    name: "Steve",
    role: "Clinical Psychologist",
    affiliation: "Independent Researcher",
    image: "/avatar2.png",
    quote:
      "The value of Bulk Download is in providing a fairly comprehensive overview of almost any topic within a few minutes. It is a great way to get a sense of the literature on a topic and to identify key papers.",
  },
  {
    name: "Paul",
    role: "Electrical Engineer",
    affiliation: "Industry Professional",
    image: "/avatar3.png",
    quote:
      "Bulk download provides me limitless opportunities to access books and research materials which I cannot ordinarily access.",
  },
  {
    name: "Wojtek",
    role: "Researcher",
    affiliation: "University of Business and Administration in Gdynia",
    image: "/avatar1.png",
    quote:
      "Bulk Download helps me get papers from younger scholars. It also surfaces teaching texts that assist in the development of my own hand-out materials for my students.",
  },
];

export default function RealStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextTestimonial, 10000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  return (
    <section className="w-full py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100">
          Real stories from real people
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16"
            >
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-2xl font-bold">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-lg text-gray-300">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-gray-400">
                      {testimonials[currentIndex].affiliation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl relative">
                <Quote className="absolute top-4 left-4 h-12 w-12 text-gray-200 dark:text-gray-700 opacity-50" />
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-200 mb-8 leading-relaxed relative z-10">
                  {testimonials[currentIndex].quote}
                </blockquote>
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={64}
                      height={64}
                      className="rounded-full border-4 border-gray-500 dark:border-gray-400"
                    />
                    <div className="ml-4">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="text-gray-600 border-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:border-gray-400 dark:hover:bg-gray-700"
                  >
                    {isAutoPlaying ? "Pause" : "Play"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-sm border-0 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-sm border-0 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`mx-1 w-3 h-3 rounded-full p-0 transition-all duration-200 ${
                index === currentIndex
                  ? "bg-gray-600 hover:bg-gray-700 dark:bg-gray-400 dark:hover:bg-gray-300 scale-125"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to testimonial {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
