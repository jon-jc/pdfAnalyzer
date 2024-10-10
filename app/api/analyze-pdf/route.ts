import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import pdf from "pdf-parse";
import { createHash } from "crypto";
import { LRUCache } from "lru-cache";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AnalysisResult {
  abstract: string;
  topic: string;
  questions: string;
  wordCount: number;
  pageCount: number;
}

// Create a cache for analysis results
const analysisCache = new LRUCache<string, AnalysisResult>({
  max: 100, // Store up to 100 results
  ttl: 1000 * 60 * 60 * 24, // Cache for 24 hours
});

const extractTextFromPDF = async (
  buffer: ArrayBuffer
): Promise<{ text: string; pageCount: number }> => {
  const data = await pdf(Buffer.from(buffer));
  return { text: data.text, pageCount: data.numpages };
};

const generateAbstract = async (text: string): Promise<string> => {
  const prompt = `Generate a concise abstract for the following academic paper:\n\n${text.slice(
    0,
    4000
  )}`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant tasked with generating academic paper abstracts.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });
  return response.choices[0].message.content || "";
};

const classifyTopic = async (text: string): Promise<string> => {
  const prompt = `Identify the main topic or topics of this academic paper:\n\n${text.slice(
    0,
    4000
  )}`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant tasked with identifying the main topics of academic papers.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 100,
  });
  return response.choices[0].message.content || "";
};

const generateImpressiveQuestions = async (
  text: string,
  abstract: string,
  topic: string
): Promise<string> => {
  const prompt = `Based on this academic paper, generate 5 insightful and impressive questions that would demonstrate the value of this AI-powered analysis tool. Consider the following aspects:

1. The paper's abstract: ${abstract}
2. The main topic(s): ${topic}
3. Potential implications for Academia.edu or the broader academic community
4. Connections to current trends in AI and machine learning
5. Possible applications or extensions of the research

Here's an excerpt from the paper to provide context:

${text.slice(0, 3000)}

Please formulate questions that:
- Showcase deep understanding of the paper's content
- Highlight potential applications or implications of the research
- Demonstrate the AI's ability to draw connections across different papers or fields
- Identify innovative angles or extensions of the research
- Reveal insights that might not be immediately obvious to a human reader

Generate the questions in a numbered list format.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content:
          "You are an advanced AI assistant tasked with generating insightful and impressive questions about academic papers. Your goal is to demonstrate the power of AI in analyzing and deriving value from academic research.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
  return response.choices[0].message.content || "";
};

const getFileHash = (buffer: ArrayBuffer): string => {
  return createHash("md5").update(Buffer.from(buffer)).digest("hex");
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileHash = getFileHash(buffer);

    // Check cache for existing analysis
    const cachedResult = analysisCache.get(fileHash);
    if (cachedResult) {
      return NextResponse.json({ ...cachedResult, cached: true });
    }

    const { text, pageCount } = await extractTextFromPDF(buffer);
    const wordCount = text.split(/\s+/).length;

    const [abstract, topic, questions] = await Promise.all([
      generateAbstract(text),
      classifyTopic(text),
      generateImpressiveQuestions(text, "", ""), // Pass empty strings for now, will be updated later
    ]);

    const result: AnalysisResult = {
      abstract,
      topic,
      questions,
      wordCount,
      pageCount,
    };

    // Update cache
    analysisCache.set(fileHash, result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    return NextResponse.json(
      { error: "Error analyzing PDF: " + (error as Error).message },
      { status: 500 }
    );
  }
}
