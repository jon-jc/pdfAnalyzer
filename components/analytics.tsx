"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Home,
  MessageCircle,
  BarChart2,
  Upload,
  Grid,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const visitorData = {
  labels,
  datasets: [
    {
      label: "Profile Visitors",
      data: [
        1200, 1900, 3000, 5000, 4000, 3000, 2000, 3000, 4000, 3000, 2000, 1000,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Paper Views",
      data: [
        1000, 2000, 3000, 4000, 5000, 4000, 3000, 4000, 5000, 6000, 4000, 2000,
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const impactData = {
  labels: ["Citations", "Downloads", "Shares", "Mentions"],
  datasets: [
    {
      label: "Impact Metrics",
      data: [300, 1200, 500, 200],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const paperData = [
  {
    id: 1,
    title: "Machine Learning in Healthcare",
    views: 1200,
    downloads: 350,
    citations: 25,
  },
  {
    id: 2,
    title: "Climate Change: A Comprehensive Review",
    views: 980,
    downloads: 280,
    citations: 18,
  },
  {
    id: 3,
    title: "The Future of Quantum Computing",
    views: 1500,
    downloads: 420,
    citations: 30,
  },
  {
    id: 4,
    title: "Advancements in Renewable Energy",
    views: 850,
    downloads: 200,
    citations: 15,
  },
  {
    id: 5,
    title: "Artificial Intelligence Ethics",
    views: 1100,
    downloads: 310,
    citations: 22,
  },
];

const countryData = {
  labels: ["USA", "China", "UK", "Germany", "India", "Others"],
  datasets: [
    {
      data: [30, 20, 15, 10, 10, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="max-w-full h-auto dark:invert transition-all duration-300 hover:opacity-80 rounded-lg"
                />
              </Link>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {[
                    { name: "Home", icon: Home },
                    { name: "Mentions", icon: MessageCircle },
                    { name: "Analytics", icon: BarChart2 },
                    { name: "Upload", icon: Upload },
                    { name: "Tools", icon: Grid },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="default" className="mr-4">
                Try Premium for $1
              </Button>
              <div className="relative">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/avatar1.png" alt="Jonathan" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>Jonathan</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your academic impact and engagement
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile-visitors">Profile Visitors</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="papers">Papers</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="60">Last 60 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Total Views",
                  value: "23,542",
                  change: "+5.25%",
                  icon: Eye,
                },
                {
                  title: "Unique Visitors",
                  value: "1,342",
                  change: "+2.74%",
                  icon: Users,
                },
                {
                  title: "Papers Downloaded",
                  value: "4,721",
                  change: "+11.89%",
                  icon: Download,
                },
                {
                  title: "Citations",
                  value: "127",
                  change: "+3.25%",
                  icon: FileText,
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span
                        className={
                          item.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {item.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Visitor Trends</CardTitle>
                <CardDescription>
                  View your visitor and paper view trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Line options={chartOptions} data={visitorData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile-visitors">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Demographics</CardTitle>
                  <CardDescription>
                    Breakdown of your profile visitors by country
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Doughnut data={countryData} options={chartOptions} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Referrers</CardTitle>
                  <CardDescription>
                    Websites that bring the most traffic to your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead>Visitors</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { source: "Google Scholar", visitors: 532 },
                        { source: "ResearchGate", visitors: 245 },
                        { source: "University Website", visitors: 189 },
                        { source: "LinkedIn", visitors: 124 },
                        { source: "Twitter", visitors: 98 },
                      ].map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.source}</TableCell>
                          <TableCell>{item.visitors}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>
                    Overview of your academic influence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Bar options={chartOptions} data={impactData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Citation Network</CardTitle>
                  <CardDescription>
                    Visualize how your work is cited across disciplines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                    <p className="text-muted-foreground">
                      Citation network visualization goes here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="papers">
            <Card>
              <CardHeader>
                <CardTitle>Paper Analytics</CardTitle>
                <CardDescription>
                  Detailed statistics for your uploaded papers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Citations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paperData.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell>{paper.title}</TableCell>
                        <TableCell>{paper.views}</TableCell>
                        <TableCell>{paper.downloads}</TableCell>
                        <TableCell>{paper.citations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {visitorData.datasets[0].data.every((value) => value === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Card>
              <CardContent className="pt-6">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="No visitors"
                  className="mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  You havent had any visitors recently
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This page shows details about visitors to your papers over the
                  last {timeRange} days. To get more visitors, make sure youve
                  uploaded and tagged all your papers.
                </p>
                <Button>Upload a Paper</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
