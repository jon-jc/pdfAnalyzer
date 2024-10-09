"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  TrendingUp,
  Zap,
  ChevronRight,
  Star,
  Brain,
  Sparkles,
  Cpu,
  Sun,
  Moon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
              Academia.edu
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-400" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    width={32}
                    height={32}
                    alt="User avatar"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Papers</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-50 to-[#f9f9f9] dark:from-blue-900 dark:to-[#1a1a1a]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white font-serif">
                Unlock the World of
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}
                  Academic Research
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
                Join 273+ million academics and researchers in sharing and
                discovering groundbreaking work
              </p>
              <div className="flex justify-center items-center mb-8">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                  height={100}
                  alt="Academia.edu AI Logo"
                  className="rounded-full shadow-lg"
                />
              </div>
              <div className="max-w-2xl mx-auto">
                <form className="flex">
                  <Input
                    type="search"
                    placeholder="Search 55 million papers with AI-powered insights..."
                    className="rounded-l-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 flex-grow"
                  />
                  <Button
                    type="submit"
                    className="rounded-r-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    AI Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white font-serif">
              AI-Powered Academic Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-serif">
                  Intelligent Research Assistant
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI analyzes millions of papers to provide personalized
                  research recommendations and insights.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-serif">
                  Advanced Natural Language Search
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use natural language queries to find relevant papers across
                  disciplines with unparalleled accuracy.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <Cpu className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-serif">
                  Automated Literature Review
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate comprehensive literature reviews with AI-powered
                  summarization and citation analysis.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="AI-powered Academia.edu dashboard"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-serif">
                  AI-Enhanced Tools for Researchers
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      AI-driven citation analysis and impact prediction
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Automated paper summarization and key findings extraction
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Intelligent collaboration suggestions based on research
                      interests
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      AI-powered research trend forecasting and gap analysis
                    </span>
                  </li>
                </ul>
                <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
                  Explore AI Features
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white font-serif">
              Real Stories from Our AI-Empowered Users
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="User avatar"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-serif">
                      Dr. Sarah Johnson
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Professor of Biology, Stanford University
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "The AI-powered research assistant on Academia.edu has
                  revolutionized how I approach literature reviews. It's saved
                  me countless hours and uncovered connections I might have
                  missed."
                </p>
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="User avatar"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-serif">
                      Prof. Michael Chen
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Department of Computer Science, MIT
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "The AI-driven citation analysis has given me unprecedented
                  insights into the impact of my work. It's like having a
                  personal research strategist."
                </p>
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />

                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    width={60}
                    height={60}
                    alt="User avatar"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-serif">
                      Dr. Emily Rodriguez
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Postdoctoral Researcher, Oxford University
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "As an early-career researcher, the AI-powered collaboration
                  suggestions have been invaluable. I've connected with peers I
                  never would have found otherwise."
                </p>
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white font-serif">
              Join the AI-Powered Academic Revolution
            </h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              Experience the future of research with our cutting-edge AI tools.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign Up for Free
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white font-serif">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white font-serif">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white font-serif">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Copyright
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white font-serif">
                Connect
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Academia.edu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
