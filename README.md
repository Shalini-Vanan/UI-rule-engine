# UI Rule Engine

Dynamic form field visibility system driven by JSON config.
No hardcoded if/else — rules evaluated at runtime.

## Live Demo
[ui-rule-engine.vercel.app](https://ui-rule-engine.vercel.app)

## Problem
Complex forms with hardcoded visibility logic become 
unmaintainable at scale. Changing one condition risks 
breaking others.

## Solution
JSON rule config drives all field behavior at runtime —
visibility, disabled state, and mandatory status.

## Tech decisions
- **Zustand** over Redux — less boilerplate, sufficient scale
- **json-rules-engine** — battle tested, supports AND/OR conditions  
- **Custom useRuleEngine hook** — separates rule logic from UI
- **Pure ruleEngine.js** — no React dependency, fully testable

## Rules example
Select "Contract" → Contract Duration field appears  
Check "Remote" → Office Location hides  
Select "Freelance" → Salary field disables  

## Stack
React 18 · Zustand · json-rules-engine · Vite