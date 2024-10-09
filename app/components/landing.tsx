"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function Landing() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/academia-logo-8Uu0rWPKbDjcwZQJMtGtGXMGwZBZFe.png"
              alt="Academia.edu Logo"
              width={150}
              height={40}
              className="dark:invert"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="ghost" size="sm">
                Research
              </Button>
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
            </nav>
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button variant="default" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user-avatar-uYh5YLGm7qPNHXx9CZrDLGhRrDDJzc.png"
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
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-2 p-4">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="ghost" size="sm">
                Research
              </Button>
              <Button variant="ghost" size="sm">
                Pricing
              </Button>
              <Button variant="ghost" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button variant="default" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Download 55 million PDFs for free
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Join millions of researchers and academics in accessing a
                    vast library of scholarly work.
                  </p>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="Search for papers, people, or research interests"
                      className="w-full pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  </div>
                  <Button size="lg" className="w-full sm:w-auto">
                    Search
                  </Button>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Sign Up</Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Users className="h-6 w-6" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Registered Users
                        </p>
                        <p className="text-2xl font-bold">273m+</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                      <FileText className="h-6 w-6" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Uploaded Papers
                        </p>
                        <p className="text-2xl font-bold">55m+</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                      <Star className="h-6 w-6" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Daily Recommendations
                        </p>
                        <p className="text-2xl font-bold">20m</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Join 273 million academics and researchers
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Track your impact</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Share your work with other academics, grow your audience and
                    track your impact on your field with our robust analytics.
                  </p>
                  <Button variant="link">Track your impact</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Discover new research
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Get access to millions of research papers and stay informed
                    with the important topics around the world.
                  </p>
                  <Button variant="link">Discover new research</Button>
                </CardContent>
              </Card>
              <Card className="sm:col-span-2 lg:col-span-1">
                <CardContent className="p-6">
                  <FileText className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Publish your work</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Publish your research with fast and rigorous service through
                    Academia.edu journals. Get instant worldwide dissemination
                    of your work.
                  </p>
                  <Button variant="link">Publish your work</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unlock the most powerful tools with Academia Premium
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get access to advanced features and tools to supercharge your
                research and academic career.
              </p>
              <Button size="lg">Sign Up and Upgrade to Premium</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100  dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 items-center lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/research-tools-interface-Wd7jSHGDEDpDjRBNNE5Ib4Iy9Aqm1Q.png"
                width={600}
                height={400}
                alt="Academia.edu research tools interface"
                className="mx-auto lg:mx-0 rounded-lg shadow-xl"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Work faster and smarter with advanced research discovery tools
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Search the full text and citations of our millions of papers.
                  Download groups of related papers to jumpstart your research.
                  Save time with detailed summaries and search alerts.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center">
                    <Shield className="mr-2  h-4 w-4" />
                    <span>Advanced Search</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>PDF Packages of 37 papers</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Summaries and Search Alerts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 items-center lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Share your work, track your impact, and grow your audience
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Get notified when other academics mention you or cite your
                  papers. Track your impact with in-depth analytics and network
                  with members of your field.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Mentions and Citations Tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Publishing Tools</span>
                  </li>
                </ul>
              </div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/analytics-publishing-interface-0eMM5gkTWU7Xsq8I5TwSOADTTkGEVQ.png"
                width={600}
                height={400}
                alt="Academia.edu analytics and publishing interface"
                className="mx-auto lg:mx-0 rounded-lg shadow-xl order-first lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Explore our top research interests
            </h2>
            <div className="mt-8">
              <Tabs defaultValue={categories[0].name} className="w-full">
                <TabsList className="w-full justify-start mb-4 flex-wrap">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.name}
                      value={category.name}
                      className="flex-1"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {categories.map((category) => (
                  <TabsContent key={category.name} value={category.name}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {category.followers} Followers • {category.papers}{" "}
                              Papers • {category.authors} Authors
                            </p>
                          </div>
                          <div className="flex -space-x-2 mt-2 sm:mt-0">
                            {[...Array(5)].map((_, i) => (
                              <Image
                                key={i}
                                src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user-avatar-${
                                  i + 1
                                }-${
                                  ["aB", "cD", "eF", "gH", "iJ"][i]
                                }123456789.png`}
                                width={32}
                                height={32}
                                alt={`User ${i + 1}`}
                                className="rounded-full border-2 border-background"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {category.subcategories.map((subcategory) => (
                            <div
                              key={subcategory.name}
                              className="flex justify-between items-center"
                            >
                              <span>{subcategory.name}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {subcategory.papers} papers
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">
                Show more
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/academia-logo-small-8Uu0rWPKbDjcwZQJMtGtGXMGwZBZFe.png"
              alt="Academia.edu Logo"
              width={100}
              height={20}
              className="dark:invert"
            />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 Academia.edu. All rights reserved.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
              <span className="sr-only">Community</span>
            </Button>
            <Button variant="ghost" size="icon">
              <FileText className="h-4 w-4" />
              <span className="sr-only">Papers</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
