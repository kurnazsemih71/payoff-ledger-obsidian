# Payoff Ledger ⚖️🎲

**Payoff Ledger** is an analytical decision-making and strategic accounting plugin for Obsidian. It bridges the gap between **game theory modeling** and **financial ledger analysis**, allowing you to calculate complex dilemmas, weigh institutional returns against friction costs, and balance financial budgets directly inside your vault.

Whether you are evaluating a career transition, modeling a business move, or breaking down project budgets and recurring expenses, Payoff Ledger gives you a presentation-grade, interactive matrix studio.

---

## ✨ Key Features

- **Strategic & Financial Ledger Studio:** Break down decisions into custom dimensions (Guaranteed Returns, Expected Action Value, Transition Costs, Budgets).
- **Multi-Currency & Floating-Point Support:** Native support for decimals (`1.35`, `450.50`) and currencies (`₺`, `$`, `€`, `£` or custom points). Ideal for invoices, project overheads, and financial scenarios.
- **Dynamic $N \times M$ Payoff Matrix:** Model multi-actor or multi-state scenarios (You vs. Market, Strategy A vs. B, Conservative vs. Aggressive).
- **Interactive Equilibrium Selector:** Click any cell in the payoff matrix to highlight target outcomes with custom glow feedback.
- **High-Contrast Isolated Theme:** Clean presentation cards built with deep petrol and slate accents, optimized for contrast and readability across all displays.
- **Non-Destructive Markdown Export:** Saves clean, human-readable summary notes without strikethroughs (`line-through`) or theme-breaking code blocks.

---

## 🚀 Installation

### Manual Installation
1. Locate your Obsidian vault directory.
2. Navigate to your plugins folder:
   ```bash
   <YourVault>/.obsidian/plugins/payoff-ledger/
   ```
3. Place `manifest.json`, `main.js`, and `styles.css` inside this folder.
4. In Obsidian, go to **Settings -> Community Plugins**, hit **Reload**, and enable **Payoff Ledger**.
5. Click the **Dice** icon in the ribbon to open the studio.

---

## 🛠 How to Use

1. **Define Scenario & Unit:** Set your decision/ledger title and select your currency or point scale from the dropdown.
2. **Add Categories & Items:**
   - Organize parameters into custom dimensions (e.g., *Fixed Cash Flow*, *Infrastructure Costs*, *Opportunity Value*).
   - Toggle metrics on/off to see dynamic total adjustments.
   - Edit weights with decimal precision (`+2.5`, `-1.25`).
3. **Analyze the Payoff Matrix:**
   - Add custom strategy rows and environmental columns as needed.
   - Click the optimal matrix cell to lock your strategic target.
4. **Save Ledger:** Click **Şablonu Kaydet** to export a clean Markdown report to your vault.

---

## 📄 Output Preview

When exported, Payoff Ledger generates a structured Markdown report:

```markdown
# SaaS Migration vs Legacy System

### 1. Guaranteed Infrastructure Returns
> **ADVANTAGES**
> ✔ Server Maintenance Savings `+450.50 $`
> ✔ Reduced Cognitive Load `+120 $`
> 
> **Total:** `+570.50 $`

---

### Payoff (Getiri) Matrisi
*Hücre formatı: (Senin Getirin , Dış Faktörün Getirisi)*

| Sen \ Çevre | Düşük Talep | Yüksek Büyüme |
| :--- | :---: | :---: |
| **Eski Düzen** | 8 , 8 | 7 , 3 |
| **Yeni Atılım** | 3 , 7 | **[ 9.5 , 8.2 ] ★** |
```

---

## 🗺 Roadmap

- [ ] Preset scenario packs (Freelance pricing, Investment risk, Career trade-offs).
- [ ] Automated Nash Equilibrium and Minimax suggestion engine.
- [ ] Obsidian Community Plugins directory submission.

---

## 📝 License

MIT License. Designed for strategic thinkers, developers, and vault architects.