import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import dotenv from "dotenv";
import PromptSync from "prompt-sync";

dotenv.config();

const input = PromptSync(); 
const apiKey = process.env.GOOGLE_API_KEY;

const pdfPath = "./nodejs.pdf";
const loader = new PDFLoader(pdfPath);
const docs = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const split_docs = await textSplitter.splitDocuments(docs);

// console.log(docs.length); 
// console.log(split_docs.length); 

// <<<<<<<<---------Initalizing the vector embedding model-------->>>>>>>
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: apiKey,
  modelName: "embedding-001",
});

// <<<<<<<<<-------- Storing the vectors into the vector DB--------->>>>>>>
const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL,
  collectionName: "rag-pdf-chat",
});
await vectorStore.addDocuments(split_docs);
console.log("Injestion done");

// Retriver Model
const retriver = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL,
  collectionName: "rag-pdf-chat",
});

const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Chat system
// while(true){
//   const userPrompt = input("> ");
//   if(userPrompt === "exit"){
//       break;
//   }

//   const relevant_chunks = await retriver.similaritySearch(userPrompt);
//   const relevant_chunk_text = relevant_chunks.map(chunk => chunk.pageContent).join(". ");  
//   const pages_Numbers = relevant_chunks.map(chunk => chunk.metadata.loc.pageNumber);  
//   // console.log(relevant_chunk_text);

//   const systemPrompt = `
//     You are a helpful AI assistant with expertise in answering questions related to a PDF document provided by the user.
//     The relevant content from the PDF is included below. Use this content as context to answer the user's questions.
//     You are bound to answer only those questions which are related to the pdf document given by user.
//     You may also use your own intellegence to enhance the answer according to the question. 
//     You also need provide the page numbers of the references in the pdf, where the content has be taken from.

//     Page numbers : ${pages_Numbers}
//     Relevant chunks : ${relevant_chunk_text}

//     Rules:
//     - Give the output in 2 steps. Step 1 is scan and step 2 is output. Strictly follow this output format.
//     - Follow the Output JSON Format.
//     - Always perform one step at a time and wait for next input
//     - Carefully analyse the user query and answer in detail
    
//     Output JSON Format:
//     {{
//         "step": "string",
//         "content": "string",
//     }}

//     Example:
//     User Query: What is node.js?
//     Output: {{ "step": "scan", "content": "Scanning document..." }}
//     Output: {{ "step": "output", "content": "Node.js is a runtime environment that allows developers to execute JavaScript code outside of a web browser" }}
//   `;
  
  
//   const messages = [
//     {role : "system", content : systemPrompt},
//     {role : "user", content : userPrompt}
//   ]

//   while(true){
//     const response = await openai.chat.completions.create({
//       model: "gemini-2.0-flash",
//       response_format:{"type": "json_object"},
//       messages: messages,
//     });

//     const jsonResponse = JSON.parse(response.choices[0].message.content);
//     const stringResponse = JSON.stringify(jsonResponse);
//     messages.push({ role: "assistant", content: stringResponse});

//     if(jsonResponse.step === 'scan'){
//       console.log(`🧠: ${jsonResponse.content}`);
//       continue;
//     }

//     if(jsonResponse.step === 'output'){
//       console.log(`🤖: ${jsonResponse.content}`);
//       break;
//     }
//   }
  
// }






  
