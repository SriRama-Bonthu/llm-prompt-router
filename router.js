const prompts = require("./prompts")

async function route_and_respond(message, intentObj){

  const intent = intentObj.intent

  if(intent === "unclear"){
    return "Could you clarify your request? Are you asking about coding, data analysis, writing help, or career advice?"
  }

  const systemPrompt = prompts[intent]

  return `Persona Selected: ${intent.toUpperCase()} EXPERT

System Prompt Used:
${systemPrompt}

User Message:
${message}

Response:
This request was routed to the ${intent} expert based on intent classification.`

}

module.exports = route_and_respond