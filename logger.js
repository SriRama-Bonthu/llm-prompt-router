const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "logs", "route_log.jsonl");

// Ensure the logs directory exists
fs.mkdirSync(path.join(__dirname, "logs"), { recursive: true });

function logRoute(data) {
  const logEntry = JSON.stringify(data) + "\n";

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error("Logging error:", err);
    }
  });
}

module.exports = logRoute;