const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 11434;

import { createOpenAI, type openai } from "@ai-sdk/openai";
import { generateText,  } from "ai";

const groq = createOpenAI({
	baseURL: "https://api.groq.com/openai/v1",
	apiKey: process.env.GROQ_API_KEY,
});

export const llama = groq("llama3-8b-8192");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Specific handler for /api/chat POST requests
app.post('/api/chat', async (req, res) => {
  const { model, messages, tools } = req.body;

  console.log(messages);
  const response = await generateText({
    messages: messages,
    tools: tools,
    model: llama,
  });

  // console.log('Response:', response);
  
  res.json({
    model: model,
    created_at: new Date().toISOString(),
    message: {
      role: "assistant",
      content: response.text
    },
    done: true
  });
});

// Catch-all route handler for other requests
app.all('*', (req, res) => {
  res.json({
    message: 'Ollama mock server received your request',
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
    query: req.query
  });
});

app.listen(port, () => {
  console.log(`Ollama mock server running at http://localhost:${port}`);
});