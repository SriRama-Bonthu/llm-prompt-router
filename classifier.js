async function classify_intent(message) {

  const text = message.toLowerCase();

  if(text.includes("python") || text.includes("code") || text.includes("bug")){
    return {intent:"code", confidence:0.9}
  }

  if(text.includes("average") || text.includes("data") || text.includes("numbers")){
    return {intent:"data", confidence:0.85}
  }

  if(text.includes("rewrite") || text.includes("sentence") || text.includes("paragraph")){
    return {intent:"writing", confidence:0.9}
  }

  if(text.includes("career") || text.includes("job") || text.includes("interview")){
    return {intent:"career", confidence:0.9}
  }

  return {intent:"unclear", confidence:0.2}

}

module.exports = classify_intent