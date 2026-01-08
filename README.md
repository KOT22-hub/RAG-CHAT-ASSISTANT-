# RAG-CHAT-ASSISTANT-
RAG CHAT Assistant powered by Ollama with Vector Search !

A Retrival Augmentaed Generation (RAG) chat assistant that works by combining vector search with large language models to deliver context aware answers.
Built with Node.js, PostgreSQL + pgvector, Ollama LLMs, and a responsive frontend.

🛠 Tech Stack
| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| Backend        | Node.js, Express                                                  |
| AI             | Ollama (`gemma3:1b` for chat, `nomic-embed-text` for embeddings)  |
| Database       | PostgreSQL + `pgvector` using Docker                               |
| Frontend       | Vanilla JS, HTML, CSS (interactive chat, Markdown, responsive UI) |
| Deployment     | Docker-ready                                                      |
| Env Management | dotenv                                                            |

📐 Architecture Overview
User Input
   ↓
Frontend (Browser)
   ↓
POST /api/chat → Backend (Express)
   ↓
1️⃣ Generate embedding for prompt (Ollama)
2️⃣ Retrieve top N similar conversations (Postgres + pgvector)
3️⃣ Build context for AI model
4️⃣ Send prompt + context to Ollama chat
   ↓
Response returned to frontend
   ↓
Conversation saved to Postgres


