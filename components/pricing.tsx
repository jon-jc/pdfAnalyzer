"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Quote,
  Search,
  FileText,
  Laptop,
  FileDown,
  Bell,
  LogIn,
  UserPlus,
  User,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Line,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  BarChart,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";

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

const chartData = [
  { date: "2023-01", citations: 120, downloads: 350, readers: 1200 },
  { date: "2023-02", citations: 150, downloads: 400, readers: 1350 },
  { date: "2023-03", citations: 200, downloads: 450, readers: 1500 },
  { date: "2023-04", citations: 180, downloads: 500, readers: 1650 },
  { date: "2023-05", citations: 250, downloads: 550, readers: 1800 },
  { date: "2023-06", citations: 300, downloads: 600, readers: 2000 },
  { date: "2023-07", citations: 350, downloads: 650, readers: 2200 },
  { date: "2023-08", citations: 400, downloads: 700, readers: 2400 },
  { date: "2023-09", citations: 450, downloads: 750, readers: 2600 },
  { date: "2023-10", citations: 500, downloads: 800, readers: 2800 },
  { date: "2023-11", citations: 550, downloads: 850, readers: 3000 },
  { date: "2023-12", citations: 600, downloads: 900, readers: 3200 },
];

export default function Pricing() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
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
                { name: "About", href: "/about" },
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
                  { name: "About", href: "/about" },
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
          <div className="container  mx-auto">
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

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Powerful Analytics at Your Fingertips
            </h2>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Research Impact Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="line" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  </TabsList>
                  <TabsContent value="line">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                              })
                            }
                          />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <RechartsTooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="citations"
                            stroke="hsl(var(--primary))"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="downloads"
                            stroke="hsl(var(--secondary))"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="readers"
                            stroke="hsl(var(--accent))"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="bar">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                              })
                            }
                          />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="citations" fill="hsl(var(--primary))" />
                          <Bar
                            dataKey="downloads"
                            fill="hsl(var(--secondary))"
                          />
                          <Bar dataKey="readers" fill="hsl(var(--accent))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
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
