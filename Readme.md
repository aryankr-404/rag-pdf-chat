# 📄🤖 RAG PDF Chat

A terminal-based Retrieval-Augmented Generation (RAG) application that allows you to chat with the contents of a PDF document. This project uses Google Generative AI for embeddings, Qdrant as a vector database, and supports interactive question-answering over PDF files.

## ✨ Features

- 📚 Loads and splits a PDF document into manageable chunks.
- 🧠 Generates embeddings for each chunk using Google Generative AI.
- 🗄️ Stores embeddings in a Qdrant vector database.
- 🔍 Retrieves relevant PDF content based on user queries.
- 🤖 Uses an LLM to answer questions with references to PDF page numbers.
- 💬 Interactive terminal chat interface.

## 🛠️ Requirements

- Node.js (v18+ recommended)
- Docker (for running Qdrant)
- Google Generative AI API Key

## 🚀 Installation

1. **Clone the repository**  
   ```sh
   git clone https://github.com/aryankr-404/rag-pdf-chat.git
   cd RAG_JS
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root directory:
   ```
   GOOGLE_API_KEY=your_google_api_key
   OPENAI_API_KEY=your_google_api_key
   QDRANT_URL=http://localhost:6333/dashboard
   ```

4. **Start Qdrant using Docker**  
   ```sh
   docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
   ```

5. **Add your PDF file**  
   📥 Place your PDF (e.g., `nodejs.pdf`) in the project root.

## 🏃 Usage

Run the application:

```sh
node rag.js
```

Follow the terminal prompts to ask questions about the PDF. Type `exit` to quit.

## ⚙️ How it Works

1. **PDF Loading:** 📄 Loads the specified PDF and splits it into chunks.
2. **Embedding:** 🧬 Generates vector embeddings for each chunk.
3. **Vector Storage:** 🗃️ Stores the embeddings in a Qdrant vector database.
4. **Retrieval:** 🔎 For each user query, retrieves the most relevant chunks from the PDF.
5. **Chat:** 🤖 Uses an LLM to answer the query, referencing the relevant PDF content and page numbers.


