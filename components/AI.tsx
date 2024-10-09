"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
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
import { Progress } from "@/components/ui/progress";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Brain,
  ChevronDown,
  Download,
  FileText,
  Users,
  Cpu,
  CpuIcon,
  DatabaseIcon,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
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

const modelPerformanceData = {
  labels,
  datasets: [
    {
      label: "BERT",
      data: [
        0.82, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "GPT-3",
      data: [
        0.85, 0.87, 0.88, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98,
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const computeResourcesData = {
  labels: ["GPU Usage", "CPU Usage", "Memory", "Storage", "Network"],
  datasets: [
    {
      label: "Resource Utilization",
      data: [85, 65, 75, 60, 70],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
  ],
};

const paperData = [
  {
    id: 1,
    title: "Attention Is All You Need",
    citations: 52000,
    downloads: 150000,
    impact: 9.8,
  },
  {
    id: 2,
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    citations: 48000,
    downloads: 130000,
    impact: 9.5,
  },
  {
    id: 3,
    title: "GPT-3: Language Models are Few-Shot Learners",
    citations: 12000,
    downloads: 80000,
    impact: 9.2,
  },
  {
    id: 4,
    title: "Deep Residual Learning for Image Recognition",
    citations: 90000,
    downloads: 200000,
    impact: 9.9,
  },
  {
    id: 5,
    title: "Generative Adversarial Networks",
    citations: 50000,
    downloads: 140000,
    impact: 9.7,
  },
];

export default function AIDashboard() {
  const [timeRange, setTimeRange] = useState("30");
  const [modelComplexity, setModelComplexity] = useState(50);
  const [useQuantization, setUseQuantization] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <Image
                  src="/academialogo.png"
                  alt="Academia.edu Logo"
                  width={150}
                  height={40}
                  className="dark:invert transition-all duration-300 hover:opacity-80"
                />
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {[
                    { name: "Dashboard", icon: Brain },
                    { name: "Models", icon: Cpu },
                    { name: "Datasets", icon: DatabaseIcon },
                    { name: "Publications", icon: FileText },
                    { name: "Collaborations", icon: Users },
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
                Try GPT-4 Access
              </Button>
              <div className="relative">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/ai-researcher-avatar.png" alt="Dr. AI" />
                    <AvatarFallback>DA</AvatarFallback>
                  </Avatar>
                  <span>Dr. AI</span>
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
            AI Research Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor your AI models, research impact, and compute resources
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="model-performance">
              Model Performance
            </TabsTrigger>
            <TabsTrigger value="compute-resources">
              Compute Resources
            </TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
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
                  title: "Active Models",
                  value: "24",
                  change: "+3",
                  icon: Brain,
                },
                {
                  title: "Compute Hours",
                  value: "1,342",
                  change: "+12%",
                  icon: Cpu,
                },
                {
                  title: "Dataset Size",
                  value: "1.2 PB",
                  change: "+5%",
                  icon: CpuIcon,
                },
                {
                  title: "Publications",
                  value: "127",
                  change: "+8",
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
                <CardTitle>Model Performance Trends</CardTitle>
                <CardDescription>
                  Compare performance across different AI models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Line options={chartOptions} data={modelPerformanceData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="model-performance">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Model Complexity</CardTitle>
                  <CardDescription>
                    Adjust the complexity of your AI model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Slider
                    value={[modelComplexity]}
                    onValueChange={(value) => setModelComplexity(value[0])}
                    max={100}
                    step={1}
                  />
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Current complexity: {modelComplexity}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quantization</CardTitle>
                  <CardDescription>
                    Toggle model quantization for improved efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={useQuantization}
                      onCheckedChange={setUseQuantization}
                    />
                    <span>Use Quantization</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {useQuantization
                      ? "Quantization is enabled, potentially reducing model size and inference time."
                      : "Quantization is disabled. Enable to optimize model performance."}
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Model Comparison</CardTitle>
                <CardDescription>
                  Performance metrics across different models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Latency</TableHead>
                      <TableHead>Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        model: "BERT-base",
                        accuracy: "89%",
                        latency: "45ms",
                        size: "440MB",
                      },
                      {
                        model: "GPT-3",
                        accuracy: "96%",
                        latency: "120ms",
                        size: "175GB",
                      },
                      {
                        model: "T5-small",
                        accuracy: "87%",
                        latency: "30ms",
                        size: "240MB",
                      },
                      {
                        model: "RoBERTa-large",
                        accuracy: "92%",
                        latency: "78ms",
                        size: "1.3GB",
                      },
                    ].map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.model}</TableCell>
                        <TableCell>{item.accuracy}</TableCell>
                        <TableCell>{item.latency}</TableCell>
                        <TableCell>{item.size}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compute-resources">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                  <CardDescription>
                    Current usage of compute resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Radar data={computeResourcesData} options={chartOptions} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Compute Efficiency</CardTitle>
                  <CardDescription>
                    Metrics on resource utilization efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "GPU Utilization", value: 85 },
                      { label: "Memory Efficiency", value: 72 },
                      { label: "Power Usage Effectiveness", value: 68 },
                      { label: "Job Queue  Efficiency", value: 91 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-36 text-sm font-medium">
                          {item.label}
                        </div>
                        <div className="w-full">
                          <Progress value={item.value} className="h-2" />
                        </div>
                        <div className="w-12 text-right text-sm font-medium">
                          {item.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="publications">
            <Card>
              <CardHeader>
                <CardTitle>Research Impact</CardTitle>
                <CardDescription>
                  Key metrics for your AI research publications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Citations</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Impact Factor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paperData.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell>{paper.title}</TableCell>
                        <TableCell>
                          {paper.citations.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {paper.downloads.toLocaleString()}
                        </TableCell>
                        <TableCell>{paper.impact.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {modelPerformanceData.datasets[0].data.every(
          (value) => value === 0
        ) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Card>
              <CardContent className="pt-6">
                <Image
                  src="/ai-model-placeholder.svg"
                  alt="No model data"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No model performance data available
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start training your AI models to see performance metrics over
                  the last {timeRange} days.
                </p>
                <Button>Train a New Model</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
