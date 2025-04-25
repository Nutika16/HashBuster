const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

//  Function to hash a password
function hashPassword(password, algorithm = "sha256") {
  return crypto.createHash(algorithm).update(password).digest("hex"); // Use crypto for other algorithms
}

//  Function to compare a password with a hash
function compareHash(password, hashedPassword, algorithm = "sha256") {
  return hashPassword(password, algorithm) === hashedPassword; // Compare hashes directly
}

//  Brute-force attack (Checks short passwords)
function bruteForceCrack(targetHash, algorithm = "sha256") {
  console.log(
    "Brute-force cracking started for:",
    targetHash,
    "using",
    algorithm
  );

  const charset = "abcdefghijklmnopqrstuvwxyz0123456789@";
  const maxLength = 5;

  const stack = [""]; // Start with an empty string

  while (stack.length > 0) {
    const current = stack.pop();

    // Skip if length exceeds maxLength
    if (current.length > maxLength) continue;

    // Generate hash and compare
    const generatedHash = hashPassword(current, algorithm);
    if (generatedHash === targetHash) {
      console.log(`Brute-force cracked: ${current}`);
      return current;
    }

    // Add next characters to the stack
    for (let i = 0; i < charset.length; i++) {
      stack.push(current + charset[i]);
    }
  }

  return "Password not found";
}

//  Dictionary attack (Checks words in dictionary file)
function dictionaryAttack(
  hash,
  algorithm = "sha256",
  dictionaryFile = "dictionary.txt"
) {
  const filePath = path.join(__dirname, dictionaryFile); // Get full path to dictionary file
  console.log("Looking for dictionary file at:", filePath);

  // Ensure dictionary file exists
  if (!fs.existsSync(filePath)) {
    console.error("Dictionary file NOT found at:", filePath);
    return "Error: Dictionary file missing";
  }

  try {
    // Read dictionary file with UTF-8 encoding
    const words = fs
      .readFileSync(filePath, { encoding: "utf8", flag: "r" })
      .split("\n");

    for (let password of words) {
      password = password.trim(); // Remove extra spaces and line breaks
      if (!password) continue; // Skip empty lines

      const hashedPassword = hashPassword(password, algorithm); // Hash the current password
      if (hashedPassword === hash) {
        console.log("Password found in dictionary:", password);
        return password; // Return the cracked password
      }
    }

    console.log("Password not found in dictionary");
    return "Password not found";
  } catch (error) {
    console.error("Error reading dictionary file:", error.message);
    return "Error: Unable to read dictionary file";
  }
}

//  Rainbow table attack (Fully implemented)
function rainbowTableAttack(
  hash,
  algorithm = "sha1", // or "md5"
  rainbowTableFile = "rainbow_table.txt"
) {
  const filePath = path.join(__dirname, rainbowTableFile);
  console.log("Looking for rainbow table file at:", filePath);

  if (!fs.existsSync(filePath)) {
    console.error("Rainbow table file NOT found at:", filePath);
    return "Error: Rainbow table file missing";
  }

  try {
    const table = fs
      .readFileSync(filePath, { encoding: "utf8", flag: "r" })
      .split("\n");

    for (let entry of table) {
      entry = entry.trim();
      if (!entry) continue;

      // Expected format: password | MD5: <md5> | SHA1: <sha1>
      const [passwordPart, md5Part, sha1Part, sha256Part] = entry
        .split("|")
        .map((part) => part.trim());

      const password = passwordPart;
      const md5Hash = md5Part?.split("MD5:")[1]?.trim();
      const sha1Hash = sha1Part?.split("SHA1:")[1]?.trim();
      const sha256Hash = sha256Part?.split("SHA256:")[1]?.trim();

      if (
        (algorithm.toLowerCase() === "md5" && hash === md5Hash) ||
        (algorithm.toLowerCase() === "sha1" && hash === sha1Hash) ||
        (algorithm.toLowerCase() === "sha256" && hash === sha256Hash)
      ) {
        console.log("Password found in rainbow table:", password);
        return password;
      }
    }

    console.log("Password not found in rainbow table");
    return "Password not found";
  } catch (error) {
    console.error("Error reading rainbow table file:", error.message);
    return "Error: Unable to read rainbow table file";
  }
}

//  Export functions
module.exports = {
  hashPassword,
  compareHash,
  bruteForceCrack,
  dictionaryAttack,
  rainbowTableAttack,
};
