const pg = require('pg')
const {Pool} = pg
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "vectordb",
});

// Initialize database (create tables and extensions)
async function initializeDatabase(){
  try {
    // Enable pgvector extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
    console.log("pgvector extension enabled");

    // Create conversations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        response TEXT NOT NULL,
        embedding vector(768),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("conversations table created");

    // Create index for faster similarity search
    await pool.query(`
      CREATE INDEX IF NOT EXISTS embedding_index 
      ON conversations USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
    console.log("index created for faster search");

  } catch (error) {
    console.error("Error setting up database:", error);
  }
}

// Save conversation to database
async function saveConversation(prompt, response, embedding) {
  try {
    const query = `
      INSERT INTO conversations (prompt, response, embedding)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const result = await pool.query(query, [prompt, response, JSON.stringify(embedding)]);
    console.log("Conversation saved with id:", result.rows[0].id);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}

// Find similar conversations
async function findSimilarConversations(embedding, limit = 3) {
  try {
    const query = `
      SELECT id, prompt, response, embedding <=> $1 AS distance
      FROM conversations
      ORDER BY distance
      LIMIT $2;
    `;
    const result = await pool.query(query, [JSON.stringify(embedding), limit]);
    return result.rows;
  } catch (error) {
    console.error("Error finding similar conversations:", error);
  }
}

// Export functions and pool
module.exports = {
  pool,
  initializeDatabase,
  saveConversation,
  findSimilarConversations
};
