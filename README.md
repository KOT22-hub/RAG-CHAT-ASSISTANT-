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

⚡ Features
-RAG-Powered Chat: Retrieves similar past conversations and augments AI responses with context.
-Vector Embeddings: Uses Ollama embeddings to encode user queries for semantic similarity search.
-Persistent Conversation History: All interactions are stored in Postgres for future reference.
-Frontend Enhancements: Markdown rendering, code formatting with copy-to-clipboard, and smooth typing animations.
-Fast Similarity Search: Uses pgvector + IVFFlat index for efficient retrieval.

🔮 Future Improvements
-User authentication and multi-user conversation histories.
-React or Next.js frontend for scalable UI.
-Real-time updates with WebSockets.
-Conversation summarization and ranking.
-Multi-language support with language-specific embeddings.

