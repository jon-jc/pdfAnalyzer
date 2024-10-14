"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  FileText,
  Star,
  ChevronRight,
  Sun,
  Moon,
  User,
  Search,
  TrendingUp,
  BookOpen,
  Shield,
  LogIn,
  UserPlus,
  Menu,
  X,
  ArrowRight,
  Globe,
} from "lucide-react";
import RealStoriesSection from "./stories";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Landing() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const categories = [
    {
      name: "History",
      followers: "10.5M",
      papers: "825K",
      authors: "355K",
      subcategories: [
        { name: "Medieval History", papers: "92.9K" },
        { name: "Ancient History", papers: "88.7K" },
        { name: "Cultural History", papers: "60.3K" },
        { name: "Early Modern History", papers: "49.3K" },
      ],
    },
    {
      name: "Engineering",
      followers: "2.92M",
      papers: "3.73M",
      authors: "1.23M",
      subcategories: [
        { name: "Electrical and Electronic Engineering", papers: "507K" },
        { name: "Mechanical Engineering", papers: "873K" },
        { name: "Materials Engineering", papers: "780K" },
        { name: "Chemical Engineering", papers: "729K" },
      ],
    },
    {
      name: "Economics",
      followers: "5.12M",
      papers: "1M",
      authors: "359K",
      subcategories: [
        { name: "Applied Economics", papers: "388K" },
        { name: "Econometrics", papers: "120K" },
        { name: "Economic Development", papers: "49.8K" },
        { name: "Development Economics", papers: "47.4K" },
      ],
    },
    {
      name: "Psychology",
      followers: "4.45M",
      papers: "3.55M",
      authors: "1.09M",
      subcategories: [
        { name: "Social Psychology", papers: "131K" },
        { name: "Clinical Psychology", papers: "99.5K" },
        { name: "Cognitive Psychology", papers: "67.7K" },
        { name: "Developmental Psychology", papers: "81.8K" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 dark:bg-black/80 dark:border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/academialogo.png"
              alt="Academia.edu Logo"
              width={150}
              height={40}
              className="dark:invert transition-all duration-300 hover:opacity-80"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              {[
                { name: "Paper Analyzer(LLM)", href: "/pdf" },
                { name: "Research", href: "/research" },
                { name: "Pricing", href: "/pricing" },
              ].map((item) => (
                <TooltipProvider key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Learn more about {item.name.toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </nav>
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors duration-200"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme === "dark" ? "dark" : "light"}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Image
                    src="/avatar1.png"
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
                    <p className="text-xs leading-none text-muted-foreground">
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
                  <FileText className="mr-2 h-4 w-4" />
                  <span>My Papers</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Register</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden"
            >
              <nav className="flex flex-col space-y-2 p-4">
                {[
                  { name: "Paper Analyzer(LLM)", href: "/pdf" },
                  { name: "Research", href: "/research" },
                  { name: "Pricing", href: "/pricing" },
                ].map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors duration-200"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={staggerChildren}
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
            >
              <div className="flex flex-col justify-center space-y-4">
                <motion.div variants={fadeInUp} className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                    Unlock 55 Million Research Papers
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                    Join millions of researchers and academics in accessing a
                    vast library of scholarly work.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2"
                >
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="Search for papers, people, or research interests"
                      className="w-full pr-10 bg-white dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
                  </div>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors duration-200"
                  >
                    Search
                  </Button>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button
                    size="lg"
                    className="bg-gray-900  text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-gray-900 border-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
              <motion.div
                variants={fadeInUp}
                className="flex items-center justify-center"
              >
                <Card className="bg-white dark:bg-gray-900 transition-colors duration-200">
                  <CardContent className="p-6">
                    {[
                      {
                        icon: Users,
                        label: "Registered Users",
                        value: "273m+",
                      },
                      {
                        icon: FileText,
                        label: "Uploaded Papers",
                        value: "55m+",
                      },
                      {
                        icon: Star,
                        label: "Daily Recommendations",
                        value: "20m",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center space-x-4 ${
                          index > 0 ? "mt-4" : ""
                        }`}
                      >
                        <item.icon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.label}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <motion.section
          ref={ref}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={staggerChildren}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
            >
              Join 273 million academics and researchers
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: TrendingUp,
                  title: "Track your impact",
                  description:
                    "Share your work with other academics, grow your audience and track your impact on your field with our robust analytics.",
                },
                {
                  icon: BookOpen,
                  title: "Discover new research",
                  description:
                    "Get access to millions of research papers and stay informed with the important topics around the world.",
                },
                {
                  icon: FileText,
                  title: "Publish your work",
                  description:
                    "Publish your research with fast and rigorous service through Academia.edu journals. Get instant worldwide dissemination of your work.",
                },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeInUp}>
                  <Card className="bg-white dark:bg-gray-800 transition-colors duration-200 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <item.icon className="h-12 w-12 mb-4 text-gray-900 dark:text-gray-100" />
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                        {item.description}
                      </p>
                      <Button
                        variant="link"
                        className="text-gray-900 dark:text-gray-100 p-0 h-auto font-semibold"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                Unlock the most powerful tools with Academia Premium
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get access to advanced features and tools to supercharge your
                research and academic career.
              </p>
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-colors duration-200"
              >
                Sign Up and Upgrade to Premium
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 items-center lg:grid-cols-2 lg:gap-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-lg transform rotate-3 scale-105 opacity-20 dark:opacity-40"></div>
                <Image
                  src="/academialogo.png"
                  width={200}
                  height={200}
                  alt="Academia.edu research tools interface"
                  className="relative rounded-lg shadow-xl dark:bg-gray-800 transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Work faster and smarter with advanced research discovery tools
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Search the full text and citations of our millions of papers.
                  Download groups of related papers to jumpstart your research.
                  Save time with detailed summaries and search alerts.
                </p>
                <ul className="grid gap-2">
                  {[
                    "Advanced Search",
                    "PDF Packages of 37 papers",
                    "Summaries and Search Alerts",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <Shield className="mr-2 h-4 w-4 text-gray-900 dark:text-gray-100" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 items-center lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Share your work, track your impact, and grow your audience
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Get notified when other academics mention you or cite your
                  papers. Track your impact with in-depth analytics and network
                  with members of your field.
                </p>
                <ul className="grid gap-2">
                  {[
                    "Mentions and Citations Tracking",
                    "Advanced Analytics",
                    "Publishing Tools",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <Shield className="mr-2 h-4 w-4 text-gray-900 dark:text-gray-100" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg transform -rotate-3 scale-105 opacity-20 dark:opacity-40"></div>
                <Image
                  src="/academialogo.png"
                  width={200}
                  height={200}
                  alt="Academia.edu analytics and publishing interface"
                  className="relative rounded-lg shadow-xl dark:bg-gray-800 transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Explore our top research interests
            </h2>
            <div className="mt-8">
              <Tabs defaultValue={categories[0].name} className="w-full">
                <TabsList className="w-full justify-start mb-4 flex-wrap">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.name}
                      value={category.name}
                      className="flex-1 text-gray-700 dark:text-gray-300 data-[state=active]:bg-gray-900 data-[state=active]:text-white dark:data-[state=active]:bg-gray-100 dark:data-[state=active]:text-gray-900"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {categories.map((category) => (
                  <TabsContent key={category.name} value={category.name}>
                    <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {category.followers} Followers • {category.papers}{" "}
                              Papers • {category.authors} Authors
                            </p>
                          </div>
                          <div className="flex -space-x-2 mt-2 sm:mt-0">
                            {[...Array(5)].map((_, i) => (
                              <Image
                                key={i}
                                src={`/avatar1.png`}
                                width={20}
                                height={20}
                                alt={`User ${i + 1}`}
                                className="rounded-full border-2 border-white dark:border-gray-800"
                              />
                            ))}
                          </div>
                        </div>
                        <ScrollArea className="h-[200px]">
                          <div className="grid gap-4 sm:grid-cols-2">
                            {category.subcategories.map((subcategory) => (
                              <div
                                key={subcategory.name}
                                className="flex justify-between items-center"
                              >
                                <span className="text-gray-700 dark:text-gray-300">
                                  {subcategory.name}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {subcategory.papers} papers
                                </span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="text-gray-900 border-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Show more
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <RealStoriesSection />
        </section>
      </main>
      <footer className="border-t bg-white dark:bg-black dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Image
                src="/academialogo.png"
                alt="Academia.edu Logo"
                width={150}
                height={40}
                className="dark:invert mb-4"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © THIS IS FOR DEMONSTRATION PURPOSES ONLY.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "/features" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Academia Premium", href: "/pricing" },
                  { name: "Institutions", href: "/" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Blog", href: "/blog" },
                  { name: "Support", href: "/support" },
                  { name: "Documentation", href: "/" },
                  { name: "API", href: "/" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/" },
                  { name: "Careers", href: "/" },
                  { name: "Press", href: "/" },
                  { name: "Contact", href: "/" },
                ],
              },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold text-gray-900 dark:text-white  mb-3">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {[
                { icon: Globe, label: "Language", href: "/language" },
                { icon: Shield, label: "Privacy", href: "/privacy" },
                { icon: FileText, label: "Terms", href: "/terms" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  <span className="sr-only">{item.label}</span>
                  <item.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
            <div className="flex space-x-6">
              {[
                { name: "Facebook", href: "https://facebook.com" },
                { name: "Twitter", href: "https://twitter.com" },
                { name: "LinkedIn", href: "https://linkedin.com" },
                { name: "GitHub", href: "https://github.com" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
