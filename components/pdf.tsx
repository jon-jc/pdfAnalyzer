"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  FileUp,
  X,
  FileText,
  Search,
  Zap,
  Download,
  Sun,
  Moon,
  Book,
  Brain,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface AnalysisResult {
  id: string;
  fileName: string;
  status: "queued" | "analyzing" | "completed" | "error";
  abstract?: string;
  topics?: string[];
  questions?: string[];
  keyFindings?: string[];
  researchGaps?: string[];
  futureDirections?: string[];
  methodologyCritique?: string;
  impactAnalysis?: string;
  wordCount?: number;
  pageCount?: number;
  citationCount?: number;
  error?: string;
}

interface NotificationMessage {
  id: string;
  title: string;
  description: string;
  type: "success" | "error";
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const Notification = ({
  message,
  onClose,
}: {
  message: NotificationMessage;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      message.type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`}
  >
    <div className="flex items-center">
      {message.type === "success" ? (
        <CheckCircle className="w-6 h-6 mr-2" />
      ) : (
        <AlertCircle className="w-6 h-6 mr-2" />
      )}
      <div>
        <h3 className="font-bold">{message.title}</h3>
        <p className="text-sm">{message.description}</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-white hover:text-gray-200"
      aria-label="Close notification"
    >
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function PDFAnalyzer() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addNotification = (notification: Omit<NotificationMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setResults((prevResults) => [
        ...prevResults,
        ...newFiles.map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          status: "queued" as const,
        })),
      ]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setResults((prevResults) => prevResults.filter((_, i) => i !== index));
  };

  const analyzeFile = async (file: File, resultIndex: number) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setResults((prevResults) =>
        prevResults.map((result, index) =>
          index === resultIndex ? { ...result, status: "analyzing" } : result
        )
      );

      const response = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults((prevResults) =>
        prevResults.map((result, index) =>
          index === resultIndex
            ? { ...result, ...data, status: "completed" }
            : result
        )
      );

      addNotification({
        title: "Analysis Complete",
        description: `Successfully analyzed ${file.name}.`,
        type: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      setResults((prevResults) =>
        prevResults.map((result, index) =>
          index === resultIndex
            ? { ...result, status: "error", error: "Analysis failed" }
            : result
        )
      );
      addNotification({
        title: "Analysis Failed",
        description: `There was an error analyzing ${file.name}. Please try again.`,
        type: "error",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      addNotification({
        title: "No files selected",
        description: "Please select at least one PDF file to analyze.",
        type: "error",
      });
      return;
    }

    for (let i = 0; i < files.length; i++) {
      await analyzeFile(files[i], i);
    }
  };

  const renderContent = (result: AnalysisResult) => (
    <Tabs defaultValue="abstract" className="w-full">
      <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
        <TabsTrigger value="abstract">Abstract</TabsTrigger>
        <TabsTrigger value="topics">Topics</TabsTrigger>
        <TabsTrigger value="keyFindings">Key Findings</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="more">More</TabsTrigger>
      </TabsList>
      <TabsContent value="abstract">
        <Card>
          <CardHeader>
            <CardTitle>Abstract</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{result.abstract}</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="topics">
        <Card>
          <CardHeader>
            <CardTitle>Main Topics</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(result.topics) && result.topics.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {result.topics.map((topic, index) => (
                    <Badge
                      key={index}
                      variant={
                        selectedTopic === topic ? "default" : "secondary"
                      }
                      className="text-sm py-1 px-2 cursor-pointer"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
                {selectedTopic && (
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Selected Topic: {selectedTopic}
                    </h4>
                    <p className="text-sm">
                      This topic is one of the main themes identified in the
                      paper. It represents a key area of focus or a significant
                      concept discussed in the research.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p>No topics available for this paper.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="keyFindings">
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {result.keyFindings?.map((finding, index) => (
                <li key={index} className="text-base leading-relaxed">
                  {finding}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="more">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="researchGaps">
            <AccordionTrigger>Research Gaps</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2">
                {result.researchGaps?.map((gap, index) => (
                  <li key={index} className="text-base leading-relaxed">
                    {gap}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="futureDirections">
            <AccordionTrigger>Future Directions</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-2">
                {result.futureDirections?.map((direction, index) => (
                  <li key={index} className="text-base leading-relaxed">
                    {direction}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="methodologyCritique">
            <AccordionTrigger>Methodology Critique</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {result.methodologyCritique}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="impactAnalysis">
            <AccordionTrigger>Impact Analysis</AccordionTrigger>
            <AccordionContent>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {result.impactAnalysis}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <motion.header
        style={{ opacity: headerOpacity }}
        className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 backdrop-blur-sm transition-colors duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/"
                alt="Logo"
                width={150}
                height={40}
                className="dark:invert transition-all duration-300 hover:opacity-80"
              />
            </Link>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Paper Analyzer
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
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
                    <Sun className="h-5  w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              Upload Papers
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6">
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Analyze Your Academic Papers
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Upload your Research Papers and our AI will provide
                  comprehensive insights
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PDF (MAX. 20MB)
                        </p>
                      </div>
                      <Input
                        id="dropzone-file"
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <AnimatePresence>
                    {files.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {files.map((file, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
                          >
                            <span className="text-sm truncate flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              {file.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Button
                    type="submit"
                    disabled={files.length === 0}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 text-white dark:text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Analyze PDFs
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6">
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Analysis Results
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  View comprehensive insights from your uploaded Papers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ScrollArea className="h-[600px] pr-4">
                  <AnimatePresence>
                    {results.map((result) => (
                      <motion.div
                        key={result.id}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={fadeInUp}
                        className="mb-6"
                      >
                        <Card className="w-full bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
                          <CardHeader className="bg-gray-100 dark:bg-gray-600 p-4">
                            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center">
                              <FileText className="mr-2 h-5 w-5" />
                              {result.fileName}
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300 flex items-center justify-between">
                              <span>
                                Status:{" "}
                                {result.status.charAt(0).toUpperCase() +
                                  result.status.slice(1)}
                              </span>
                              {result.status === "completed" && (
                                <div className="flex space-x-2">
                                  <Badge variant="secondary">
                                    {result.pageCount} pages
                                  </Badge>
                                  <Badge variant="secondary">
                                    {result.wordCount} words
                                  </Badge>
                                  <Badge variant="secondary">
                                    {result.citationCount} citations
                                  </Badge>
                                </div>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4">
                            {result.status === "queued" && (
                              <div className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                                <Search className="mr-2 h-4 w-4 animate-pulse" />
                                Waiting in queue...
                              </div>
                            )}
                            {result.status === "analyzing" && (
                              <div className="space-y-2">
                                <Progress
                                  value={Math.random() * 100}
                                  className="w-full"
                                />
                                <div className="text-sm flex items-center text-gray-600 dark:text-gray-300">
                                  <Zap className="mr-2 h-4 w-4 animate-spin" />
                                  Analyzing...
                                </div>
                              </div>
                            )}
                            {result.status === "completed" &&
                              renderContent(result)}
                            {result.status === "error" && (
                              <div className="text-sm text-red-500 flex items-center">
                                <X className="mr-2 h-4 w-4" />
                                {result.error}
                              </div>
                            )}
                          </CardContent>
                          {result.status === "completed" && (
                            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-600">
                              <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 text-white dark:text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                <Download className="mr-2 h-4 w-4" />
                                Download Full Analysis
                              </Button>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Book,
                title: "Upload Papers",
                description:
                  "Simply drag and drop or select your PDF files to get started.",
              },
              {
                icon: Brain,
                title: "AI Analysis",
                description:
                  "Our advanced AI processes and analyzes the content of your PDFs.",
              },
              {
                icon: Sparkles,
                title: "Comprehensive Insights",
                description:
                  "Receive in-depth analysis including abstract, topics, key findings, and more.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-gray-600 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
