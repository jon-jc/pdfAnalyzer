import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import pdf from "pdf-parse";
import { createHash } from "crypto";
import { LRUCache } from "lru-cache";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AnalysisResult {
  abstract: string;
  topics: string[];
  questions: string[];
  keyFindings: string[];
  researchGaps: string[];
  futureDirections: string[];
  methodologyCritique: string;
  impactAnalysis: string;
  wordCount: number;
  pageCount: number;
  citationCount: number;
}

const analysisCache = new LRUCache<string, AnalysisResult>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
});

async function extractTextFromPDF(
  buffer: ArrayBuffer
): Promise<{ text: string; pageCount: number }> {
  try {
    const data = await pdf(Buffer.from(buffer));
    return { text: data.text, pageCount: data.numpages };
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

async function generateAbstract(text: string): Promise<string> {
  const prompt = `As a leading expert in academic research, craft a compelling and comprehensive abstract for this paper. Your abstract should:

1. Clearly articulate the research question and its significance in the field
2. Succinctly describe the innovative methodology employed
3. Highlight the groundbreaking findings and their implications
4. Emphasize the paper's unique contributions to the academic discourse

Maintain a sophisticated academic tone while ensuring clarity and impact. Limit the abstract to 250-300 words.

Paper excerpt:
${text.slice(0, 5000)}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with unparalleled expertise in crafting academic abstracts, capable of distilling complex research into compelling summaries.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });
    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error generating abstract:", error);
    throw new Error("Failed to generate abstract");
  }
}

async function classifyTopics(text: string): Promise<string[]> {
  const prompt = `As a distinguished academic researcher, identify and categorize the primary themes of this scholarly work. Provide a list of 6-8 meticulously formatted tags that encapsulate the paper's core concepts, methodologies, and theoretical frameworks. Each tag should be 2-4 words, reflecting the depth and sophistication of the research. Employ precise academic terminology and maintain consistency in formatting.

Example format: 
Quantum Computing Algorithms, Neuroplasticity Mechanisms, Sustainable Urban Development

Ensure that each tag is unique and captures a distinct aspect of the research. If you cannot generate 6 unique tags, provide as many as you can without repetition.

Paper excerpt:
${text.slice(0, 5000)}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with exceptional skill in identifying and categorizing complex academic research topics. Your task is to generate precise, unique tags that accurately represent the core themes of the research.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    const rawTopics = response.choices[0].message.content || "";
    return formatTags(rawTopics);
  } catch (error) {
    console.error("Error classifying topics:", error);
    throw new Error("Failed to classify topics");
  }
}

function formatTags(rawTopics: string): string[] {
  const tags = rawTopics
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((tag) => {
      return tag.replace(
        /\w\S*/g,
        (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
      );
    })
    .filter((tag) => tag.split(" ").length >= 2 && tag.split(" ").length <= 4);

  // Remove duplicate tags
  const uniqueTags = Array.from(new Set(tags));

  // If we have less than 6 unique tags, add generic ones to reach the minimum
  while (uniqueTags.length < 6) {
    const genericTag = `Research Area ${uniqueTags.length + 1}`;
    if (!uniqueTags.includes(genericTag)) {
      uniqueTags.push(genericTag);
    }
  }

  return uniqueTags.slice(0, 8);
}

async function generateImpressiveQuestions(
  text: string,
  abstract: string,
  topics: string[]
): Promise<string[]> {
  const prompt = `As a leading academic in this field, generate 5 profound and thought-provoking questions that showcase the depth and implications of this research. Your questions should:

1. Challenge existing paradigms in light of the paper's findings
2. Explore potential interdisciplinary connections and applications
3. Probe the long-term societal and ethical implications of the research
4. Identify critical areas for future investigation
5. Highlight the paper's contribution to addressing global challenges

Consider:
- Abstract: ${abstract}
- Key topics: ${topics.join(", ")}
- Broader academic and societal context
- Emerging trends and future directions in the field

Craft questions that:
- Demonstrate a nuanced understanding of the research and its context
- Stimulate intellectual discourse and further research
- Reveal innovative perspectives and potential paradigm shifts
- Encourage critical thinking about the research's wider implications

Paper excerpt:
${text.slice(0, 4000)}

Present your questions in a numbered format, ensuring each is concise yet intellectually stimulating.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with the intellectual capacity of a world-renowned scholar, capable of generating profound questions that push the boundaries of academic inquiry.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });
    const content = response.choices[0].message.content || "";
    return content.split("\n").filter((line) => line.trim().length > 0);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions");
  }
}

async function extractKeyFindings(
  text: string,
  abstract: string
): Promise<string[]> {
  const prompt = `As an esteemed peer reviewer, extract and articulate the 4-6 most significant findings from this research paper. Each finding should be:

1. A concise, yet comprehensive statement of a major result or conclusion
2. Directly related to the research objectives and hypotheses
3. Supported by the data and analysis presented in the paper
4. Reflective of the paper's contribution to the field

Consider the broader context of the research area and highlight findings that:
- Challenge or confirm existing theories
- Introduce novel concepts or methodologies
- Have significant implications for future research or practical applications

Abstract:
${abstract}

Paper excerpt:
${text.slice(0, 5000)}

Present your analysis as a numbered list of key findings, ensuring each point is clear, impactful, and academically rigorous.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with the analytical prowess of a top-tier academic, capable of identifying and articulating the most impactful findings in scholarly research.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 400,
    });
    const content = response.choices[0].message.content || "";
    return content.split("\n").filter((line) => line.trim().length > 0);
  } catch (error) {
    console.error("Error extracting key findings:", error);
    throw new Error("Failed to extract key findings");
  }
}

async function identifyResearchGaps(
  text: string,
  abstract: string,
  topics: string[]
): Promise<string[]> {
  const prompt = `As a leading researcher in the field, identify 3-4 significant research gaps or areas for future investigation based on this paper. Consider:

1. Limitations acknowledged in the current study
2. Unexplored aspects of the research question
3. Potential extensions of the methodology or theoretical framework
4. Interdisciplinary opportunities suggested by the findings

Abstract: ${abstract}
Key topics: ${topics.join(", ")}

Paper excerpt:
${text.slice(0, 4000)}

Present your analysis as a numbered list of research gaps, each with a brief explanation of its importance and potential impact on the field.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with the foresight of a visionary academic, adept at identifying promising avenues for future research.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 350,
    });
    const content = response.choices[0].message.content || "";
    return content.split("\n").filter((line) => line.trim().length > 0);
  } catch (error) {
    console.error("Error identifying research gaps:", error);
    throw new Error("Failed to identify research gaps");
  }
}

async function suggestFutureDirections(
  text: string,
  abstract: string,
  topics: string[],
  gaps: string[]
): Promise<string[]> {
  const prompt = `As a visionary in the field, propose 3-4 compelling future research directions based on this paper. Your suggestions should:

1. Address the identified research gaps: ${gaps.join("; ")}
2. Extend the current findings in innovative ways
3. Explore potential interdisciplinary collaborations
4. Consider emerging technologies or methodologies that could advance the research

Abstract: ${abstract}
Key topics: ${topics.join(", ")}

Paper excerpt:
${text.slice(0, 4000)}

Present your suggestions as a numbered list, each with a concise description of the proposed direction and its potential impact on the field.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with the innovative thinking of a pioneering researcher, capable of envisioning groundbreaking directions for future studies.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 350,
    });
    const content = response.choices[0].message.content || "";
    return content.split("\n").filter((line) => line.trim().length > 0);
  } catch (error) {
    console.error("Error suggesting future directions:", error);
    throw new Error("Failed to suggest future directions");
  }
}

async function critiqueMethods(
  text: string,
  abstract: string
): Promise<string> {
  const prompt = `As an expert methodologist, provide a balanced critique of the research methodology employed in this paper. Your analysis should:

1. Evaluate the appropriateness of the chosen methods for the research questions
2. Assess the strengths and limitations of the study design
3. Comment on the validity and reliability of the data collection and analysis techniques
4. Suggest potential improvements or alternative approaches

Abstract: ${abstract}

Paper excerpt:
${text.slice(0, 5000)}

Provide a concise yet comprehensive critique, highlighting both commendable aspects and areas for improvement.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with the methodological expertise of a seasoned researcher, capable of providing insightful and constructive critiques of research methods.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 400,
    });
    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error critiquing methodology:", error);
    throw new Error("Failed to critique methodology");
  }
}

async function analyzeImpact(
  text: string,
  abstract: string,
  topics: string[]
): Promise<string> {
  const prompt = `As a distinguished scholar, assess the potential impact of this research on the academic field and broader society. Your analysis should consider:

1. The novelty and significance of the findings
2. Potential applications in industry or policy
3. Implications for current theories or practices in the field
4. Possible societal, economic, or environmental impacts

Abstract: ${abstract}
Key topics: ${topics.join(", ")}

Paper excerpt:
${text.slice(0, 4000)}

Provide a concise yet comprehensive analysis of the research's potential short-term and long-term impacts.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI with the analytical acumen of a leading academic, capable of assessing the far-reaching implications of cutting-edge research.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });
    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error analyzing impact:", error);
    throw new Error("Failed to analyze impact");
  }
}

function getFileHash(buffer: ArrayBuffer): string {
  return createHash("md5").update(Buffer.from(buffer)).digest("hex");
}

function countCitations(text: string): number {
  const citationRegex = /$$\w+\s*(?:et al\.?)?,\s*\d{4}$$/g;
  const matches = text.match(citationRegex);
  return matches ? matches.length : 0;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileHash = getFileHash(buffer);

    const cachedResult = analysisCache.get(fileHash);
    if (cachedResult) {
      return NextResponse.json({ ...cachedResult, cached: true });
    }

    const { text, pageCount } = await extractTextFromPDF(buffer);
    const wordCount = text.split(/\s+/).length;
    const citationCount = countCitations(text);

    const [abstract, topics] = await Promise.all([
      generateAbstract(text),

      classifyTopics(text),
    ]);

    const [questions, keyFindings, researchGaps] = await Promise.all([
      generateImpressiveQuestions(text, abstract, topics),
      extractKeyFindings(text, abstract),
      identifyResearchGaps(text, abstract, topics),
    ]);

    const [futureDirections, methodologyCritique, impactAnalysis] =
      await Promise.all([
        suggestFutureDirections(text, abstract, topics, researchGaps),
        critiqueMethods(text, abstract),
        analyzeImpact(text, abstract, topics),
      ]);
    const result: AnalysisResult = {
      abstract,
      topics,
      questions,
      keyFindings,
      researchGaps,
      futureDirections,
      methodologyCritique,
      impactAnalysis,
      wordCount,
      pageCount,
      citationCount,
    };

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
