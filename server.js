const express = require("express");
const classify_intent = require("./classifier");
const route_and_respond = require("./router");
const logRoute = require("./logger");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "LLM Prompt Router API",
    status: "ok",
    usage: {
      method: "POST",
      endpoint: "/ask",
      body: {
        message: "Your prompt text"
      }
    }
  });
});

app.post("/ask", async (req, res) => {

  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const intentResult = await classify_intent(message);

  const finalResponse = await route_and_respond(message, intentResult);

  logRoute({
    intent: intentResult.intent,
    confidence: intentResult.confidence,
    user_message: message,
    final_response: finalResponse
  });

  res.json({
    intent: intentResult.intent,
    confidence: intentResult.confidence,
    response: finalResponse
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});