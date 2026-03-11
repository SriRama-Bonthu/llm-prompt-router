# LLM Prompt Router

A small Node.js and Express API that classifies a user prompt by intent and routes it to a matching expert persona.

## Overview

This project accepts a user message, detects the likely intent using simple keyword rules, selects a matching persona prompt, and returns a structured response showing how the message was routed.

Current supported intents:
- `code`
- `data`
- `writing`
- `career`
- `unclear`

The application also logs each routing decision to `logs/route_log.jsonl`.

## Tech Stack

- Node.js
- Express
- dotenv
- OpenAI SDK installed for future extension

## Project Structure

```text
.
├── classifier.js      # Intent classification using keyword rules
├── logger.js          # Request logging to JSONL
├── openaiClient.js    # OpenAI client setup
├── prompts.js         # Persona system prompts
├── router.js          # Persona selection and final response assembly
├── server.js          # Express server and API routes
├── logs/
│   └── route_log.jsonl
└── package.json
```

## How It Works

1. A client sends a `POST /ask` request with a `message` field.
2. The message is classified into one of the supported intents.
3. The matching persona prompt is selected from `prompts.js`.
4. A routed response is returned to the client.
5. The interaction is appended to `logs/route_log.jsonl`.

## API Endpoints

### `GET /`
Returns a simple API status and usage description.

Example response:

```json
{
  "name": "LLM Prompt Router API",
  "status": "ok",
  "usage": {
    "method": "POST",
    "endpoint": "/ask",
    "body": {
      "message": "Your prompt text"
    }
  }
}
```

### `POST /ask`
Classifies the prompt and returns the routed response.

Request body:

```json
{
  "message": "Help me debug this Python code"
}
```

Example response:

```json
{
  "intent": "code",
  "confidence": 0.9,
  "response": "Persona Selected: CODE EXPERT\n\nSystem Prompt Used:\n..."
}
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```env
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

Note: the current implementation does not call the OpenAI API during request handling, but the client configuration is already included for future use.

### 3. Start the server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## Test the API

### PowerShell

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/ | ConvertTo-Json -Depth 4

Invoke-RestMethod -Method Post -Uri http://localhost:3000/ask -ContentType "application/json" -Body '{"message":"Help me debug this Python code"}' | ConvertTo-Json -Depth 5

Invoke-RestMethod -Method Post -Uri http://localhost:3000/ask -ContentType "application/json" -Body '{"message":"Find average and anomalies in this data"}' | ConvertTo-Json -Depth 5
```

### curl

```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"message":"Help me debug this Python code"}'
```

## Intent Rules

The current classifier uses keyword matching:

- `code`: words like `python`, `code`, `bug`
- `data`: words like `average`, `data`, `numbers`
- `writing`: words like `rewrite`, `sentence`, `paragraph`
- `career`: words like `career`, `job`, `interview`
- otherwise `unclear`

## Logging

Each successful request is written as one JSON line to:

```text
logs/route_log.jsonl
```

Each log entry includes:
- detected intent
- confidence score
- original user message
- final routed response

## Demo Flow

A simple demo sequence for this project:

1. Open `http://localhost:3000` in the browser to show the API landing response.
2. Send a `POST /ask` request from PowerShell or Postman.
3. Show the returned `intent`, `confidence`, and routed persona response.
4. Open `logs/route_log.jsonl` to show that the request was logged.

## Future Improvements

- Replace keyword matching with model-based intent classification
- Generate real persona responses using the OpenAI client
- Add tests for classifier and routing behavior
- Add validation and better error handling
- Add a small frontend for interactive demos
