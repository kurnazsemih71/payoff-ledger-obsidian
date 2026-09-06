# Payoff Ledger ⚖️🎲

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-blue?logo=obsidian&style=flat-square)](https://obsidian.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/kurnazsemih71/payoff-ledger-obsidian/pulls)

**Payoff Ledger** is an analytical decision-making and quantitative modeling plugin for Obsidian. It bridges the gap between **Game Theory payoff matrices** and **multi-currency ledger accounting**, allowing you to calculate complex trade-offs, weigh guaranteed baseline returns against friction costs, and balance financial budgets directly inside your vault.

---

## 📸 Visual Workflow & Interface

The split-view workflow enables quick configuration of ledger dimensions, parameters, and matrix models on the right, with non-destructive, theme-native Markdown notes compiled on the left.

![Payoff Ledger Split-View Workflow](preview.png)

---

## 💡 The Core Problem It Solves

Traditional decision tools evaluate options in static isolation (e.g., pros and cons). They fail to model systems where:

1. **Outcomes depend on external factors:** Market cycles, client reactions, competitor moves, or infrastructure limits.
2. **Status Quo carries hidden value:** The institutional inertia of maintaining current systems often outweighs raw speculative upside.
3. **Execution has friction:** Capital expenditure, cognitive burnout, and learning curves penalize initiatives before returns materialize.

**Payoff Ledger** organizes these variables into an interactive, quantifiable $N \times M$ matrix to identify viable options and equilibrium traps.

---

## 🎯 Practical Presets & Use Cases

Payoff Ledger includes ready-to-use scenario presets:

| Preset | Operational Domain | Modeled Balance |
| :--- | :--- | :--- |
| **🎲 Strategic Decision Matrix** | Strategy & Business | Status Quo Floor vs. Market Expansion Upside |
| **🔧 Tech Service & Repair** | Hardware & IT Services | Labor & Part Revenue vs. Consumables & Warranty Risk |
| **⚔️ Game Farm & Efficiency** | MMORPG / Gaming Economy | Loot & Drop Value vs. Potion, Automation & Time Depreciation |
| **🚗 Fuel & Mileage Tracking** | Travel & Logistics | Transport Utility vs. Fuel, Tolls & Maintenance Amortization |
| **💻 Hardware Purchase Filter** | Capital & Equipment | Workflow Acceleration vs. Cash Flow & Debt Exposure |

---

## ✨ Key Features

- **Dynamic Reactive Payoff Matrix:** Real-time aggregation where active positive items sum to green payoffs and negative friction items sum to red costs.
- **Optional Matrix Display (Toggle):** Matrix section can be hidden via top toolbar button (`🎲 Matrix: On/Off`) for plain financial ledger accounting.
- **Preset Engine:** One-click loading of scenario configurations (Tech Service, Gaming, Travel, Hardware, Strategy).
- **Auto-Expanding Numeric Inputs:** Pill badge inputs expand dynamically to accommodate large numbers (supports up to `999,999,999` with localized comma/dot formatting).
- **Expanded Strategy Rows:** Multi-line textareas for strategy labels with inline delete controls.
- **Editable Matrix Labels & Legends:** Direct inline editing for matrix explanatory text and quadrant legends.
- **Multi-Currency & Floating-Point Engine:** Full decimal support with selectable currency/unit symbols (`₺`, `$`, `€`, `£`, or raw points).
- **Multi-Language Architecture (i18n):** Instant toggle between English (EN) and Turkish (TR).
- **Clean Markdown Export:** Exports human-readable Markdown summaries with YAML metadata and no `line-through` strike-through artifacts.

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

## 📄 Output Preview

When exported, Payoff Ledger generates a clean Markdown report:

```markdown
# Tech Service & Hardware Repair Ledger

### 1. Service Revenues
> **INCOME / ADVANTAGE**
> ✔ Labor and diagnostic fee `+650 ₺`
> ✔ Hardware markup margin `+1,200 ₺`
> 
> **Total Revenue:** `+1,850 ₺`

---

### 2. Parts & Operational Costs
> **EXPENSE / COST**
> ✔ Replacement parts cost `-850 ₺`
> ✔ Bench testing electricity and time `-45 ₺`
> 
> **Total Cost:** `-895 ₺`
```

---

## 🤝 Contributing & Planned Enhancements

Payoff Ledger is open-source and open to contributions. Key roadmap areas include:

- [ ] **Automated Nash Equilibrium Solver:** Mathematical detection of Pure/Mixed Strategy Nash Equilibria and Minimax solutions.
- [ ] **TypeScript & Build Pipeline:** Migration of `main.js` to modular TypeScript (`src/`) with `esbuild`.
- [ ] **Interactive Codeblock Parser:** Live score adjustments directly within Markdown Reading View.
- [ ] **Dataview / Canvas Integration:** Queryable metadata outputs and visual Canvas node bridges.

---

## 📝 License

Distributed under the [MIT License](LICENSE). Maintained by the open-source community.