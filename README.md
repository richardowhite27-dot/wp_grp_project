# JA Threads | Digital Commerce Solutions
### CIT2011: Web Programming – IA2 Project Submission

---

## 📋 Project Overview
**JA Threads** is a premium e-commerce architecture developed to showcase a native JavaScript implementation of a retail ecosystem. The platform integrates secure authentication, dynamic product rendering, and a persistent shopping cart utilizing browser-based storage. The project focuses on Jamaican culture through high-quality apparel while demonstrating proficiency in front-end logic and state management.

---

## 👥 Development Team
| Name | Student ID 
| :--- | :--- | :--- 
| **Richardo White** | 2103123 
| **Donnyl Williams** | 2307274 
| **Michalia Williams** | 2405331 

---

## 🛠 Technical Architecture, Frameworks & Tools
This application is engineered using a "Vanilla" philosophy, prioritizing high performance and zero external dependencies to demonstrate mastery of core web standards and native browser capabilities.

### Core Development Frameworks & Languages
* **HTML5 (Living Standard):** Utilized for semantic document structuring, ensuring accessibility and search engine optimization (SEO) readiness.
* **CSS3 (Cascading Style Sheets):** Implemented custom Flexbox grid systems, media queries for responsiveness, and CSS transitions for interactive UI elements.
* **JavaScript (ECMAScript 2022+):** The primary engine for the application. Utilized advanced logic patterns including:
    * **Functional Programming:** Higher-order functions (`filter`, `find`, `map`, `splice`) for data management.
    * **Event-Driven Architecture:** Asynchronous event listeners for DOM manipulation and user interaction.

### Native Browser APIs & Integration Tools
* **Web Storage API (LocalStorage):** Serves as the persistence layer to simulate an ACID-compliant database environment for storing user credentials, cart state, and order history.
* **JSON Data Structure:** Used for serializing and deserializing complex objects to ensure data integrity during storage.
* **BOM (Browser Object Model):** Utilized for intelligent URI routing, location-based redirects, and session persistence across multiple tabs/windows.
* **RegExp (Regular Expressions):** Integrated for server-side-style input validation (e.g., TRN and Email format verification).

### Productivity, Debugging & Deployment Tools
* **Visual Studio Code (IDE):** The primary integrated development environment used for source code authoring and refactoring.
* **Chrome DevTools (V8 Engine Debugger):** Used extensively for real-time DOM auditing, LocalStorage state monitoring, and performance profiling.
* **Live Server (Node.js based):** Utilized to host a local development server to test relative path resolution and cross-origin navigation.
* **Adobe Illustrator / Canva:** Employed for the creation of high-fidelity vector assets and the "JA Threads" visual identity.

---

## Execution Instructions
To initialize the project environment:
1.  **Extract** the repository folder to your local machine.
2.  **Verify** the directory structure:
    * **Root:** `index.html`, `script.js`, `style.css`, `README.md`
    * **Sub-directories:** `codes/` (Application logic/pages), `Assets/` (Image repository).
3.  **Launch:** Open `index.html` in a modern browser. It is highly recommended to use the **Live Server** extension in VS Code to ensure relative paths resolve correctly.

---

## Administrative Access & Security
For academic review, the following protocols are established:
* **Test TRN:** `000-000-000`
* **Password Policy:** Minimum 8 characters.
* **Registration:** Mandatory age verification (18+) via DOB calculation logic.
* **Brute Force Protection:** The system monitors `loginAttempts`. After **3 consecutive failures**, the UI triggers a redirect to `locked.html`.

---

## System Functionalities
* **Session State Management:** Secure persistence of the `currentUser` object across the entire application lifecycle.
* **Cart Logic Engine:** Real-time calculation of 15% GCT (Tax) and dynamic subtotals.
* **Administrative Reporting:** Execution of `ShowUserFrequency()` in the console or dashboard to analyze demographic data.
* **Transaction Engine:** Generates unique, timestamped Invoices (e.g., `INV-171283...`) stored within the user's historical profile.

---

## Contact Information
**Lead Developer:** Richardo White  
**Institution:** University of Technology, Jamaica  
