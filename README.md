# Payoff Ledger ⚖️🎲

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-blue?logo=obsidian&style=flat-square)](https://obsidian.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/kurnazsemih71/payoff-ledger-obsidian/pulls)

**Payoff Ledger** is an analytical decision-making and strategic accounting plugin for Obsidian. It bridges the gap between **game theory modeling** and **financial ledger analysis**, allowing you to calculate complex trade-offs, weigh guaranteed baseline returns against friction costs, and balance financial budgets directly inside your vault.

Whether you are evaluating a career pivot, modeling business expansion, or balancing recurring overheads and project budgets, Payoff Ledger provides a presentation-ready, high-contrast interactive matrix studio.

---

## 📸 Visual Workflow & Interface

The screenshot below demonstrates the core split-pane workflow: configure parameters, live scores, and weights in the interactive studio on the right, and compile non-destructive, human-readable Markdown notes directly into your vault on the left.

![Payoff Ledger Split-View Workflow](preview.png)

### What You See:
- **Left (Markdown Reading View):** The compiled, theme-native ledger report with clean badges, preserved formatting, and zero `line-through` artifacts.
- **Right (Active Decision Studio):** The isolated, dark-mode canvas featuring dynamic parameter toggles, decimal precision controls, and real-time category balance summation.

---

## 💡 The Core Problem It Solves

Traditional task managers and decision tools evaluate choices in isolation (e.g., simple pro/con lists). They fail to model systems where:

1. **Outcomes depend on external factors:** Competitor moves, market liquidity, client actions, or macroeconomic shifts.
2. **Status Quo carries hidden value:** The institutional return of doing nothing often outweighs the raw upside of change.
3. **Execution has non-linear friction:** Cognitive load, operational overhead, and transition friction penalize action before returns materialize.

**Payoff Ledger** formalizes these dynamics into a quantifiable, visual matrix ($N \times M$), providing a deterministic view of whether an initiative is mathematically viable or an equilibrium trap.

---

## 🎯 Practical Use Cases

| Domain | What You Model | Output Metric |
| :--- | :--- | :--- |
| **SaaS & Engineering** | Refactoring legacy code vs. Shipping new features under uncertain scale | Transition Friction vs. Compounding Upside |
| **Career & Business** | Salaried stability vs. Bootstrapping a product under market volatility | Status Quo Floor vs. Asymmetric ROI |
| **Financial Operations** | Capital expenditure allocation vs. Holding cash during inflationary cycles | Net Return per Scenario (in ₺, $, €, £) |
| **Resource Planning** | Internal team allocation vs. Outsourcing across tight deadlines | Capacity Stress vs. Quality Delta |

---

## ✨ Key Features

- **Strategic & Financial Ledger Studio:** Dissect decisions into modular dimensions (*Guaranteed Base Returns*, *Expected Expansion Upside*, *Transition & Risk Friction*).
- **Multi-Language Support (i18n):** Native, instant toggle between English (EN) and Turkish (TR).
- **Multi-Currency & Floating-Point Engine:** Built-in support for decimals (`1.35`, `450.50`) and assets/currencies (`₺`, `$`, `€`, `£` or raw points). Perfect for budgets, project roadmaps, and scenario valuation.
- **Dynamic $N \times M$ Payoff Matrix:** Model multi-actor or environmental conditions (e.g., You vs. Market, Passive vs. Aggressive).
- **Interactive Equilibrium Selector:** Click any cell in the payoff matrix to manually lock target strategic equilibriums with active glow feedback.
- **Theme-Agnostic, Presentation UI:** Deep slate/petrol dark aesthetic optimized for high contrast, responsive text wrapping, and zero clutter across any monitor.
- **Clean Markdown Export:** Exports human-readable Markdown summaries directly into your vault without strikethroughs (`line-through`) or theme-breaking DOM bugs.

---

## 🚀 Installation

### Manual Installation
1. Locate your Obsidian vault directory.
2. Navigate to:
   ```bash
   <YourVault>/.obsidian/plugins/payoff-ledger/
   ```
3. Copy `manifest.json`, `main.js`, and `styles.css` into this directory.
4. In Obsidian, open **Settings -> Community Plugins**, click **Reload**, and toggle **Payoff Ledger** on.
5. Click the **Dice** icon in the ribbon or use the command palette to launch the studio.

---

## 🛠 How to Use

1. **Define Context:** Name your scenario, pick your base currency/points, and toggle your preferred language (TR/EN).
2. **Weigh Parameters:**
   - Toggle metrics to observe real-time balance shifts.
   - Fine-tune scores with decimal precision (`+2.5`, `-1.25`).
   - Add custom parameters dynamically on the fly.
3. **Analyze Payoff Matrix:**
   - Add custom strategy rows and environmental columns.
   - Click to lock the optimal equilibrium quadrant.
4. **Save Ledger:** Click **Save Ledger / Şablonu Kaydet** to compile a clean Markdown report in your vault root.

---

## 📄 Output Preview

When exported, Payoff Ledger generates a structured Markdown report:

```markdown
# Strategic Valuation & Decision Matrix

### 1. Guaranteed Institutional Returns of Maintaining Status Quo
> **STRATEGIC ADVANTAGES**
> ✔ Predictable revenue streams and zero-risk cash preservation `+2.5 $`
> ✔ Low cognitive friction, established workflows, and routine comfort `+1.5 $`
> 
> **Core Guaranteed Return:** `+4 $`

---

### Two-Player Strategic Payoff Matrix
*Format: (Player 1 , Player 2) | ★ = Selected Equilibrium*

| 1 \ 2 | Stagnant Market (Passive) | Booming Market (Dynamic) |
| :--- | :---: | :---: |
| **Status Quo (Maintain)** | 8 , 8 | 7 , 3 |
| **Strategic Expansion (Advance)** | 3 , 7 | **[ 5.5 , 5.0 ] ★** |
```

---

## 🤝 Contributing & Planned Enhancements

Payoff Ledger is open-source, functionally decoupled, and ready for modular expansion. We welcome focused pull requests in the following technical domains:

### 🎯 Help Wanted / Open Roadmap:
- [ ] **Automated Nash Equilibrium Solver:** Mathematical engine to automatically detect and highlight Pure/Mixed Strategy Nash Equilibria and Minimax solutions across arbitrary $N \times M$ grids.
- [ ] **TypeScript & Build Pipeline:** Migrate `main.js` to modular TypeScript (`src/`) powered by `esbuild`.
- [ ] **Domain Presets:** Curated, loadable parameter packs (e.g., Cloud Architecture Migration, Financial Hedging, Freelance Pricing).
- [ ] **Interactive Codeblock Parser:** Enable dynamic score tweaking directly within Markdown Reading View without opening the ribbon tab.
- [ ] **Canvas / Obsidian Dataview Integration:** Expose matrix outputs as queryable Dataview fields and Obsidian Canvas nodes.
- [ ] **Obsidian Community Plugins Submission:** Prepare repository structure and CI/CD releases for official inclusion in the Obsidian Community Plugins directory.

### How to Contribute:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add Nash equilibrium solver'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

Feel free to open an **[Issue](https://github.com/kurnazsemih71/payoff-ledger-obsidian/issues)** for feature requests, math/logic discussions, or bug reports!

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

Built with curiosity by [Semih Kurnaz](https://github.com/kurnazsemih71). Inspired by game theory and strategic decision-making dynamics.
