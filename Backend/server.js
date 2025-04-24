const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  bruteForceCrack,
  dictionaryAttack,
  rainbowTableAttack,
} = require("./methods");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

//  Crack Password API (Saves Cracked Passwords in MongoDB)
app.post("/crack", async (req, res) => {
  try {
    const { hash, algorithm, method } = req.body;

    if (!hash || !algorithm || !method) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const supportedAlgorithms = ["md5", "sha1", "sha256"];
    if (!supportedAlgorithms.includes(algorithm)) {
      return res.status(400).json({
        error: "Invalid algorithm. Only MD5, SHA-1, and SHA-256 are supported.",
      });
    }

    console.log(`🔎 Cracking hash: ${hash} using method: ${method}`);

    let result;
    switch (method) {
      case "brute-force":
        result = bruteForceCrack(hash, algorithm);
        break;
      case "dictionary":
        result = dictionaryAttack(hash, algorithm);
        break;
      case "rainbow-table":
        result = rainbowTableAttack(hash, algorithm);
        break;
      default:
        return res.status(400).json({ error: "Invalid method" });
    }
    res.json({ success: result !== "Password not found", password: result });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
})

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
