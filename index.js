// @ts-nocheck
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const {Ollama} = require('ollama');
const {initializeDatabase,saveConversation,findSimilarConversations} = require('./DB');
const dotenv = require('dotenv');
dotenv.config();

const ollama = new Ollama({host:'http://127.0.0.1:11434'})
const PORT = process.env.PORT 

app.listen(PORT,()=>{
  initializeDatabase();
  console.log(`Server running on port ${PORT}`);
})
app.post('/api/chat',async(req,res)=>{
  const {prompt}=req.body;
  try{
    // Generate embedding first
    const batch = await ollama.embed({
      model:'nomic-embed-text',
      input:[
        prompt
      ]
    })
    console.log("Embedding vector length:", batch.embeddings[0].length);
    
    // Find similar past conversations
    const similarConversations = await findSimilarConversations(batch.embeddings[0], 3);
    console.log("Similar conversations found:", similarConversations);

    // Build context from similar conversations
    const context = similarConversations.length > 0 
      ? `Similar past conversations:\n${similarConversations.map(c => `Q: ${c.prompt}\nA: ${c.response}`).join('\n\n')}`
      : '';

    // Now ask Ollama with context
    const response = await ollama.chat({
      model:'gemma3:1b',
      messages:[
          ...(context ? [{role:'system',content:context}] : []),
        {role:'user',content:prompt}
      ]
    })
    
    res.json({answer:response.message.content});
    await saveConversation(prompt,response.message.content,batch.embeddings[0]);
  
  }
  catch(error){
    console.error("Error communicating with Ollama API:", error);
    res.status(500).json({error:'Error communicating with Ollama API'});

  }


})

