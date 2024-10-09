"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Search,
  FileText,
  BarChart,
  Laptop,
  FileDown,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Bell,
    title: "Mentions",
    description:
      "Get notified when you're cited, referenced, thanked, or acknowledged by an author",
  },
  {
    icon: FileDown,
    title: "PDF Packages",
    description:
      "Speed up your research by one-click downloading the best related papers to any paper on our site",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Search the full text and citations of over 47 million papers",
  },
  {
    icon: FileText,
    title: "Paper Summaries",
    description:
      "Understand papers faster with short summaries and 10 key takeaways",
  },
  {
    icon: Laptop,
    title: "Personal Website",
    description:
      "Launch your custom website to share with our community of 150M thinkers and learners",
  },
  {
    icon: BarChart,
    title: "Impact Tracking",
    description:
      "Review stats on how your work is being used and impacting the world",
  },
];

const testimonials = [
  {
    quote:
      "It's nice to know that one's work is being recognized around the world. Mentions can also lead to contacts with other scholars.",
    author: "Robert A. Rosenstone",
    title: "California Institute of Technology, History, Professor Emeritus",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I know more about who is using my ideas now than I ever have before, thanks to Mentions and Readers on Academia.",
    author: "Dennis Klass",
    title: "Webster University, Religious Studies, Emeritus",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I was thrilled to discover through Academia's Premium features my work is being utilized by scholars in a half dozen some countries.",
    author: "Orsat Ligorio",
    title: "University of Belgrade, Faculty of Philosophy, Classics",
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function Pricing() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Image
            src="/academialogo.png"
            alt="Academia Logo"
            width={150}
            height={40}
            className="dark:invert"
          />
          <nav className="hidden md:flex space-x-4">
            {["Home", "Research", "About", "Pricing"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
        </div>
      </header>

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100">
              Academia Premium
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
              The platform for research-driven people.
            </p>
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Try Premium for $1 <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Used by academics at 15,770 universities
            </h2>
            <div className="flex justify-center space-x-8">
              {[
                "University of Oxford",
                "University of California, Berkeley",
                "Universidad Nacional Autonoma De Mexico",
              ].map((uni) => (
                <div
                  key={uni}
                  className="w-32 h-32 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-sm text-center font-medium">{uni}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              The most powerful tools for research
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative"
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6">
                      <feature.icon className="w-12 h-12 mb-4 text-gray-700 dark:text-gray-300" />
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                  {hoveredFeature === index && (
                    <motion.div
                      className="absolute inset-0 bg-gray-900 dark:bg-gray-100 opacity-10 rounded-lg"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What our users are saying
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-600" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Help us expand the impact of research
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Academias mission is to make every scholarly and scientific paper
              available for free on the internet and to enhance academic
              discussion and collaboration. Support our mission by becoming a
              Premium member, and gain access to Academia Premiums tools to
              advance your career and research.
            </p>
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Become a Premium member <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Academia</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Topics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Journals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Mentions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Search Alerts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Copyright
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Academia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
