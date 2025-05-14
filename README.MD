# HashBuster Password Cracking Tool

**HashBuster** is a web-based password hash cracking tool that helps identify weak or commonly used passwords. Designed for ethical security assessments, it provides an intuitive interface for cracking hashes using dictionary-based attacks.

---

## 🔐 Features

- **Multi-Hash Algorithm Support**: Supports popular hash types like **MD5**, **SHA-1**, **SHA-256**, and more.
- **Web-Based UI**: Clean and easy-to-use interface built using Node.js and Express.
- **Custom Wordlists**: Upload your own wordlist to perform dictionary attacks.
- **Real-Time Cracking**: View progress and matched results dynamically during the cracking process.

---

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nutika0975/HashBuster_Password_Cracking_tool.git
   cd HashBuster_Password_Cracking_tool
2. Install Dependencies
npm install

3. Start the Application
npm run dev

4. Access the Tool
Open your browser and go to:
http://localhost:3000

## 🧠 Wordlist Requirement
The tool uses a dictionary-based attack and requires a wordlist file named:
rockyou.txt

### ⚠️ Important:
The rockyou.txt file is not included in this repository due to its large size.

You can download it from trusted sources such as:

SecLists on GitHub

Kali Linux users: located at /usr/share/wordlists/rockyou.txt

After downloading, place rockyou.txt in the root directory of this project.

## 🚀 Future Scope
✅ GPU Acceleration: Leverage GPU power using CUDA/OpenCL for faster hash cracking.

✅ Additional Hashing Algorithms: Add support for bcrypt, NTLM, SHA-512, and more.

✅ Cloud/Distributed Cracking: Enable multi-machine or cloud-based distributed cracking.

✅ Session Management: Save progress and resume cracking sessions later.

✅ Logging and Reporting: Structured output/report generation for cracked hashes.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request with your improvements or new features.

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for more information.

## ⚠️ Disclaimer
This tool is intended strictly for educational purposes and authorized security testing only.
Unauthorized use is illegal and unethical. Always obtain proper permission before testing any system.

