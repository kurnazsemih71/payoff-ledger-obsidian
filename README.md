

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
