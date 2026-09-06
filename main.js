const { Plugin, ItemView, Notice } = require('obsidian');

const VIEW_TYPE_GAME_THEORY = "game-theory-decision-engine";

const TRANSLATIONS = {
  tr: {
    title: "Stratejik Değerleme ve Karar Matrisi",
    newCategory: "+ Yeni Kategori Kartı Ekle",
    saveBtn: "Şablonu Kaydet",
    savedNotice: "Şablon başarıyla kaydedildi:",
    clearBtn: "Boş Tuval",
    templateBtn: "Şablonu Yükle",
    unitLabel: "DEĞER",
    scoreLabel: "PUAN",
    advLabel: "STRATEJİK AVANTAJLAR",
    costLabel: "DÖNÜŞÜM VE RİSK MALİYETLERİ",
    newParamPlaceholder: "Yeni parametre...",
    totalDefault: "Toplam",
    matrixTitle: "İki Oyunculu Stratejik Getiri Matrisi",
    matrixSub: "Her hücre: (Senin Getirin , Dış Faktörün / Rakibin Getirisi)",
    addStrat: "+ Satır Ekle",
    addOpp: "+ Sütun Ekle",
    p1Legend: "Senin Net Getirin",
    p2Legend: "Dış Faktörün Getirisi",
    matrixFootnote: "Analizdeki getiri dengesi ve maliyetler Payoff Ledger Motoru ile hesaplanmıştır.",
    currencies: [
      { label: "Döviz", symbol: "" },
      { label: "₺ - TL", symbol: "₺" },
      { label: "$ - Dolar", symbol: "$" },
      { label: "€ - Euro", symbol: "€" },
      { label: "£ - Pound", symbol: "£" }
    ],
    defaultCategories: [
      {
        id: "c1",
        title: "Mevcut Yapıyı ve Nakit Akışını Korumanın Garantili Getirileri (Status Quo)",
        totalLabel: "Temel Güvence Getirisi",
        isPositive: true,
        items: [
          { label: "Öngörülebilir nakit akışı ve risksiz gelir güvencesi", score: 2.5, enabled: true },
          { label: "Düşük bilişsel stres, yerleşik rutinler ve operasyonel konfor", score: 1.5, enabled: true },
          { label: "Mevcut kaynaklar, müşteri tabanı ve pazar payı üzerindeki tam kontrol", score: 1.25, enabled: true },
          { label: "Sermaye kaybı veya başarısızlık baskısı taşımama avantajı", score: 1.1, enabled: true }
        ]
      },
      {
        id: "c2",
        title: "Büyük Atılım ve Yenilik Hamlesinin Beklenen Değeri (Expansion Upside)",
        totalLabel: "Beklenen Stratejik Getiri",
        isPositive: true,
        items: [
          { label: "Pazarda asimetrik büyüme ve çarpan etkisiyle ölçeklenme potansiyeli", score: 5.5, enabled: true },
          { label: "Sektörel otorite, marka değeri ve rekabet avantajı edinimi", score: 3.0, enabled: true },
          { label: "Yeni teknik yetkinlikler ve uzun vadeli finansal özgürlük", score: 2.5, enabled: true }
        ]
      },
      {
        id: "c3",
        title: "Dönüşüm Sürecinin Başlangıç Maliyetleri ve Riskleri (Transition Friction)",
        totalLabel: "Toplam Sürtünme Maliyeti",
        isPositive: false,
        items: [
          { label: "Doğrudan sermaye tahsisi, operasyonel harcamalar ve likidite riski", score: -2.5, enabled: true },
          { label: "Zaman fedakarlığı, yoğun çalışma temposu ve tükenmişlik baskısı", score: -2.0, enabled: true },
          { label: "Öğrenme eğrisi zorluğu ve geçiş sürecindeki verimsizlik sürtünmesi", score: -1.5, enabled: true },
          { label: "Pazarın beklenmeyen reaksiyonu veya geçici itibar kaybı riski", score: -1.0, enabled: true }
        ]
      }
    ],
    strategies: ["Mevcudu Koru (Status Quo)", "Büyük Atılım (Aggressive Move)"],
    opponents: ["Durgun Pazar (Passive)", "Büyüyen Pazar (Dynamic)"]
  },
  en: {
    title: "Strategic Valuation & Decision Matrix",
    newCategory: "+ Add New Dimension Card",
    saveBtn: "Save Ledger",
    savedNotice: "Ledger saved successfully:",
    clearBtn: "Blank Canvas",
    templateBtn: "Load Template",
    unitLabel: "VALUE",
    scoreLabel: "SCORE",
    advLabel: "STRATEGIC ADVANTAGES",
    costLabel: "TRANSITION & RISK COSTS",
    newParamPlaceholder: "New parameter...",
    totalDefault: "Total",
    matrixTitle: "Two-Player Strategic Payoff Matrix",
    matrixSub: "Each cell: (Your Payoff , External Factor / Competitor Payoff)",
    addStrat: "+ Add Row",
    addOpp: "+ Add Column",
    p1Legend: "Your Net Payoff",
    p2Legend: "External Factor Payoff",
    matrixFootnote: "Equilibrium balances and friction costs simulated via Payoff Ledger.",
    currencies: [
      { label: "Assets", symbol: "" },
      { label: "$ - USD", symbol: "$" },
      { label: "€ - EUR", symbol: "€" },
      { label: "£ - GBP", symbol: "£" },
      { label: "₺ - TRY", symbol: "₺" }
    ],
    defaultCategories: [
      {
        id: "c1",
        title: "Guaranteed Institutional Returns of Maintaining Status Quo",
        totalLabel: "Core Guaranteed Return",
        isPositive: true,
        items: [
          { label: "Predictable revenue streams and zero-risk cash preservation", score: 2.5, enabled: true },
          { label: "Low cognitive friction, established workflows, and routine comfort", score: 1.5, enabled: true },
          { label: "Complete governance over existing assets and user base", score: 1.25, enabled: true },
          { label: "Zero exposure to capital depletion or public failure", score: 1.1, enabled: true }
        ]
      },
      {
        id: "c2",
        title: "Expected Strategic Upside of Aggressive Expansion",
        totalLabel: "Expected Strategic Upside",
        isPositive: true,
        items: [
          { label: "Asymmetric market scalability and compounding financial upside", score: 5.5, enabled: true },
          { label: "Brand equity appreciation and high barrier-to-entry dominance", score: 3.0, enabled: true },
          { label: "Long-term technological independence and strategic leverage", score: 2.5, enabled: true }
        ]
      },
      {
        id: "c3",
        title: "Upfront Friction and Transformation Costs",
        totalLabel: "Total Friction Cost",
        isPositive: false,
        items: [
          { label: "Direct capital expenditure, liquidity lock-up, and financial exposure", score: -2.5, enabled: true },
          { label: "Severe time allocation, cognitive burnout, and personal sacrifice", score: -2.0, enabled: true },
          { label: "Steep learning curve and temporary operational disruption", score: -1.5, enabled: true },
          { label: "Market resistance, adverse macro shifts, and execution risk", score: -1.0, enabled: true }
        ]
      }
    ],
    strategies: ["Status Quo (Maintain)", "Strategic Expansion (Advance)"],
    opponents: ["Stagnant Market (Passive)", "Booming Market (Dynamic)"]
  }
};

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function cleanFloat(val) {
  return Math.round(val * 100) / 100;
}

function formatScore(score, symbol) {
  const sign = score >= 0 ? `+${score}` : `${score}`;
  return symbol ? `${sign} ${symbol}` : sign;
}

function renderCardsDOM(container, state, isInteractive = false, onStateChange = null) {
  const t = TRANSLATIONS[state.lang || 'tr'];
  const root = container.createDiv({ cls: "ea-container-isolated" });

  if (!isInteractive) {
    root.createEl("h1", { text: state.title, attr: { style: "margin-top:0; color:#fff; font-size:1.6rem; font-weight:800; margin-bottom:24px;" } });
  }

  // 1. Kategoriler
  state.categories.forEach((cat, idx) => {
    const card = root.createDiv({ cls: "ea-card" });
    const header = card.createDiv({ cls: "ea-card-header" });
    header.createSpan({ cls: "ea-step-badge", text: `${idx + 1}` });

    if (isInteractive) {
      const taTitle = header.createEl("textarea", { cls: "ea-title-area", rows: 1 });
      taTitle.value = cat.title;
      setTimeout(() => autoResize(taTitle), 10);
      taTitle.oninput = () => autoResize(taTitle);
      taTitle.onchange = (e) => { cat.title = e.target.value; onStateChange(); };

      const del = header.createEl("button", { cls: "ea-btn-action btn-del", text: "×" });
      del.onclick = () => {
        state.categories = state.categories.filter(c => c.id !== cat.id);
        onStateChange();
      };
    } else {
      header.createEl("h3", { text: cat.title, attr: { style: "margin:0; color:#fff; font-size:1.15rem; font-weight:700; flex:1; line-height:1.4;" } });
    }

    // Başlık Şeridi
    const labels = card.createDiv({ cls: "ea-col-labels" });
    labels.createSpan({ text: cat.isPositive ? t.advLabel : t.costLabel });
    labels.createSpan({ text: state.unitSymbol ? `${t.unitLabel} (${state.unitSymbol})` : t.scoreLabel });

    // Maddeler Listesi
    const list = card.createDiv();
    cat.items.forEach((item, itemIdx) => {
      const row = list.createDiv({ cls: "ea-row" });

      if (isInteractive) {
        const check = row.createEl("input", { cls: "ea-checkbox", type: "checkbox" });
        check.checked = item.enabled;
        check.onchange = (e) => { item.enabled = e.target.checked; onStateChange(); };

        const ta = row.createEl("textarea", { cls: "ea-text-area", rows: 1 });
        ta.value = item.label;
        setTimeout(() => autoResize(ta), 10);
        ta.oninput = () => autoResize(ta);
        ta.onchange = (e) => { item.label = e.target.value; onStateChange(); };

        const scr = row.createEl("input", { 
          cls: `ea-pill ${cat.isPositive ? 'ea-pill-green' : 'ea-pill-red'}`, 
          attr: { type: "number", step: "any" } 
        });
        scr.value = item.score;
        scr.onchange = (e) => { 
          item.score = parseFloat(e.target.value) || 0; 
          onStateChange(); 
        };

        const del = row.createEl("button", { cls: "ea-btn-action btn-del", text: "×" });
        del.onclick = () => { cat.items.splice(itemIdx, 1); onStateChange(); };
      } else {
        const span = row.createEl("div", { 
          text: item.label, 
          attr: { style: "flex:1; color:#fff; font-size:0.95rem; line-height:1.4; word-break:break-word;" } 
        });
        const pill = row.createSpan({ cls: `ea-pill ${cat.isPositive ? 'ea-pill-green' : 'ea-pill-red'}` });
        pill.setText(formatScore(item.score, state.unitSymbol));
      }
    });

    if (isInteractive) {
      const addRow = card.createDiv({ attr: { style: "display:flex; gap:10px; margin-top:12px;" } });
      const txt = addRow.createEl("input", { 
        placeholder: t.newParamPlaceholder, 
        attr: { style: "flex:1; background:#0d1117; border:1px solid var(--ea-card-border); color:#fff; padding:8px 12px; border-radius:8px;" } 
      });
      const scr = addRow.createEl("input", { 
        type: "number", 
        step: "any",
        value: cat.isPositive ? 1 : -1, 
        attr: { style: "width:65px; background:#0d1117; border:1px solid var(--ea-card-border); color:#fff; padding:8px; border-radius:8px; text-align:center;" } 
      });
      const btn = addRow.createEl("button", { 
        cls: "ea-btn-action",
        text: "+", 
        attr: { style: "width:36px; height:36px; font-size:1.2rem;" } 
      });
      btn.onclick = () => {
        if (txt.value.trim()) {
          cat.items.push({ label: txt.value.trim(), score: parseFloat(scr.value) || 0, enabled: true });
          onStateChange();
        }
      };
    }

    // Alt Toplam Barı
    const rawTotal = cat.items.filter(i => i.enabled).reduce((a, b) => a + (parseFloat(b.score) || 0), 0);
    const total = cleanFloat(rawTotal);
    const totalBar = card.createDiv({ cls: "ea-total-bar" });

    if (isInteractive) {
      const tInp = totalBar.createEl("input", { 
        attr: { style: "font-size:1.05rem; font-weight:700; background:transparent; border:1px solid transparent; color:#fff; border-radius:6px; padding:4px;" } 
      });
      tInp.value = cat.totalLabel || t.totalDefault;
      tInp.onchange = (e) => { cat.totalLabel = e.target.value; onStateChange(); };
    } else {
      totalBar.createSpan({ text: cat.totalLabel || t.totalDefault, attr: { style: "font-weight:700; color:#fff; font-size:1.05rem;" } });
    }

    const tPill = totalBar.createSpan({ 
      cls: `ea-total-pill ${cat.isPositive ? 'ea-pill-green' : 'ea-pill-red'}` 
    });
    tPill.setText(formatScore(total, state.unitSymbol));
  });

  // 2. Matris Kartı
  const mCard = root.createDiv({ cls: "ea-card" });
  const mHead = mCard.createDiv({ attr: { style: "display:flex; align-items:center; gap:10px; margin-bottom:6px;" } });
  mHead.createSpan({ attr: { style: "width:4px; height:22px; background:var(--ea-green); border-radius:2px;" } });
  mHead.createEl("h3", { text: t.matrixTitle, attr: { style: "margin:0; color:#fff; font-size:1.2rem;" } });
  mCard.createDiv({ text: t.matrixSub, attr: { style: "color:var(--ea-text-sub); font-size:0.85rem; margin-bottom:14px;" } });

  if (isInteractive) {
    const btnRow = mCard.createDiv({ attr: { style: "display:flex; gap:8px; margin-bottom:12px;" } });
    const rBtn = btnRow.createEl("button", { text: t.addStrat, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:6px; cursor:pointer;" } });
    rBtn.onclick = () => { state.strategies.push(`S${state.strategies.length + 1}`); onStateChange(); };
    const cBtn = btnRow.createEl("button", { text: t.addOpp, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:6px; cursor:pointer;" } });
    cBtn.onclick = () => { state.opponents.push(`O${state.opponents.length + 1}`); onStateChange(); };
  }

  const table = mCard.createEl("table", { cls: "ea-matrix-table" });
  const hRow = table.createEl("tr");
  hRow.createEl("th", { cls: "ea-matrix-th", text: "1 \\ 2" });
  state.opponents.forEach((opp, cIdx) => {
    const th = hRow.createEl("th", { cls: "ea-matrix-th" });
    if (isInteractive) {
      const inp = th.createEl("input", { attr: { style: "text-align:center; font-size:0.95rem; font-weight:700; background:transparent; border:1px solid transparent; color:#8b949e; width:80px; border-radius:4px;" } });
      inp.value = opp;
      inp.onchange = (e) => { state.opponents[cIdx] = e.target.value; };
      if (state.opponents.length > 1) {
        const del = th.createSpan({ text: " ×", attr: { style: "cursor:pointer; color:var(--ea-red); font-weight:bold;" } });
        del.onclick = () => { state.opponents.splice(cIdx, 1); onStateChange(); };
      }
    } else {
      th.setText(opp);
    }
  });

  state.strategies.forEach((strat, rIdx) => {
    const row = table.createEl("tr");
    const sth = row.createEl("th", { cls: "ea-matrix-th", attr: { style: "text-align:left;" } });
    if (isInteractive) {
      const inp = sth.createEl("input", { attr: { style: "font-size:0.95rem; font-weight:700; background:transparent; border:1px solid transparent; color:#8b949e; width:80px; border-radius:4px;" } });
      inp.value = strat;
      inp.onchange = (e) => { state.strategies[rIdx] = e.target.value; };
      if (state.strategies.length > 1) {
        const del = sth.createSpan({ text: " ×", attr: { style: "cursor:pointer; color:var(--ea-red); font-weight:bold;" } });
        del.onclick = () => { state.strategies.splice(rIdx, 1); onStateChange(); };
      }
    } else {
      sth.setText(strat);
    }

    state.opponents.forEach((opp, cIdx) => {
      const key = `${rIdx}-${cIdx}`;
      let p1 = (rIdx === 0 && cIdx === 0) ? 8 : (rIdx === 0 ? 7 : (cIdx === 0 ? 3 : 5));
      let p2 = (rIdx === 0 && cIdx === 0) ? 8 : (rIdx === 0 ? 3 : (cIdx === 0 ? 7 : 5));

      const td = row.createEl("td", { cls: "ea-matrix-cell" });
      if (state.selectedCell === key) td.addClass("selected-nash");
      td.innerHTML = `<span style="color:var(--ea-green);">${p1}</span> , <span style="color:var(--ea-blue);">${p2}</span>`;

      if (isInteractive) {
        td.onclick = () => {
          state.selectedCell = key;
          mCard.querySelectorAll(".ea-matrix-cell").forEach(c => c.removeClass("selected-nash"));
          td.addClass("selected-nash");
        };
      }
    });
  });

  const footer = mCard.createDiv({ attr: { style: "margin-top:14px; text-align:center; font-size:0.85rem; color:var(--ea-text-sub);" } });
  footer.innerHTML = `● <span style="color:var(--ea-green); font-weight:bold;">${t.p1Legend}</span> &nbsp;&nbsp;&nbsp;&nbsp; ● <span style="color:var(--ea-blue); font-weight:bold;">${t.p2Legend}</span>`;
}

class GameTheoryView extends ItemView {
  constructor(leaf) {
    super(leaf);
    this.state = this.loadInitialState('tr');
  }

  loadInitialState(lang) {
    const t = TRANSLATIONS[lang];
    return {
      lang: lang,
      title: t.title,
      unitSymbol: "",
      categories: JSON.parse(JSON.stringify(t.defaultCategories)),
      strategies: [...t.strategies],
      opponents: [...t.opponents],
      selectedCell: "0-0"
    };
  }

  getViewType() { return VIEW_TYPE_GAME_THEORY; }
  getDisplayText() { return "Payoff Ledger"; }
  getIcon() { return "dice"; }

  async onOpen() { this.render(); }

  render() {
    const t = TRANSLATIONS[this.state.lang || 'tr'];
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("ea-container-isolated");

    // 1. Satır: Başlık Tam Genişlik
    const titleRow = container.createDiv({ attr: { style: "margin-bottom:12px;" } });
    const tInp = titleRow.createEl("input", { cls: "ea-header-input" });
    tInp.value = this.state.title;
    tInp.oninput = (e) => { this.state.title = e.target.value; };

    // 2. Satır: Dil Seçici + Döviz Seçici + Butonlar
    const controlRow = container.createDiv({ attr: { style: "display:flex; gap:10px; margin-bottom:20px; align-items:center; flex-wrap:wrap;" } });

    // Dil Seçici (TR / EN)
    const langSelect = controlRow.createEl("select", { cls: "ea-unit-select" });
    [ { label: "🇹🇷 TR", val: "tr" }, { label: "🇬🇧 EN", val: "en" } ].forEach(opt => {
      const el = langSelect.createEl("option", { text: opt.label, value: opt.val });
      if (opt.val === this.state.lang) el.selected = true;
    });
    langSelect.onchange = (e) => {
      const newLang = e.target.value;
      this.state = this.loadInitialState(newLang);
      this.render();
    };

    // Para Birimi Dropdown
    const unitSelect = controlRow.createEl("select", { cls: "ea-unit-select" });
    t.currencies.forEach(opt => {
      const optionEl = unitSelect.createEl("option", { text: opt.label, value: opt.symbol });
      if (opt.symbol === this.state.unitSymbol) optionEl.selected = true;
    });
    unitSelect.onchange = (e) => {
      this.state.unitSymbol = e.target.value;
      this.render();
    };

    const clearBtn = controlRow.createEl("button", { text: t.clearBtn, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:8px 14px; border-radius:8px; cursor:pointer;" } });
    clearBtn.onclick = () => {
      this.state.categories = [];
      this.state.strategies = ["A", "B"];
      this.state.opponents = ["1", "2"];
      this.state.selectedCell = "0-0";
      this.render();
    };

    const resetBtn = controlRow.createEl("button", { text: t.templateBtn, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:8px 14px; border-radius:8px; cursor:pointer;" } });
    resetBtn.onclick = () => {
      this.state = this.loadInitialState(this.state.lang);
      this.render();
    };

    renderCardsDOM(container, this.state, true, () => this.render());

    // Yeni Kategori Kartı Butonu
    const addCatBtn = container.createEl("button", {
      text: t.newCategory,
      attr: { style: "width:100%; padding:14px; border-radius:12px; background:transparent; border:1.5px dashed var(--ea-card-border); color:var(--ea-text-sub); cursor:pointer; margin-top:14px; font-weight:700;" }
    });
    addCatBtn.onclick = () => {
      this.state.categories.push({ id: "c_" + Date.now(), title: "Yeni Boyut / Dimension", totalLabel: t.totalDefault, isPositive: true, items: [] });
      this.render();
    };

    // Şablonu Kaydet Butonu
    const saveBtn = container.createEl("button", {
      text: t.saveBtn,
      attr: { style: "width:100%; padding:14px; border-radius:12px; background:var(--ea-green); color:#000; font-weight:800; border:none; cursor:pointer; margin-top:20px; font-size:1rem;" }
    });
    saveBtn.onclick = () => this.saveDoc();
  }

  async saveDoc() {
    const t = TRANSLATIONS[this.state.lang || 'tr'];
    const fileName = `${this.state.title.replace(/[/\\?%*:|"<>]/g, '-')}.md`;

    const categoriesMd = this.state.categories.map((cat, idx) => {
      const activeItems = cat.items.filter(i => i.enabled);
      const rawTotal = activeItems.reduce((a, b) => a + (parseFloat(b.score) || 0), 0);
      const total = cleanFloat(rawTotal);
      const sign = formatScore(total, this.state.unitSymbol);

      const itemsList = activeItems.map(i => {
        const val = parseFloat(i.score) || 0;
        const itemSign = formatScore(val, this.state.unitSymbol);
        return `> ✔ ${i.label} \`${itemSign}\``;
      }).join('\n');

      return `### ${idx + 1}. ${cat.title}
> ${cat.isPositive ? `**${t.advLabel}**` : `**${t.costLabel}**`}
${itemsList}
> 
> **${cat.totalLabel || t.totalDefault}:** \`${sign}\`
`;
    }).join('\n---\n\n');

    const tableHeader = `| 1 \\ 2 | ` + this.state.opponents.join(' | ') + ' |';
    const tableDivider = `| :--- | ` + this.state.opponents.map(() => ':---:').join(' | ') + ' |';
    
    const tableRows = this.state.strategies.map((strat, rIdx) => {
      const rowCells = this.state.opponents.map((opp, cIdx) => {
        const key = `${rIdx}-${cIdx}`;
        const isSelected = (this.state.selectedCell === key);
        let p1 = (rIdx === 0 && cIdx === 0) ? 8 : (rIdx === 0 ? 7 : (cIdx === 0 ? 3 : 5));
        let p2 = (rIdx === 0 && cIdx === 0) ? 8 : (rIdx === 0 ? 3 : (cIdx === 0 ? 7 : 5));
        
        return isSelected ? `**[ ${p1} , ${p2} ] ★**` : `${p1} , ${p2}`;
      }).join(' | ');

      return `| **${strat}** | ${rowCells} |`;
    }).join('\n');

    const fullContent = `---
type: game-theory-analysis
title: "${this.state.title}"
unit: "${this.state.unitSymbol || 'Score'}"
lang: "${this.state.lang}"
date: ${new Date().toISOString().split('T')[0]}
selected_cell: "${this.state.selectedCell}"
---

# ${this.state.title}

${categoriesMd}

---

### ${t.matrixTitle}
*Format: (Player 1 , Player 2)*
*★ = Selected Equilibrium*

${tableHeader}
${tableDivider}
${tableRows}

> **Note:** ${t.matrixFootnote}
`;

    const file = this.app.vault.getAbstractFileByPath(fileName);
    if (file) {
      await this.app.vault.modify(file, fullContent);
    } else {
      await this.app.vault.create(fileName, fullContent);
    }
    new Notice(`${t.savedNotice} ${fileName}`);
  }
}

module.exports = class GameTheoryPlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_GAME_THEORY, (leaf) => new GameTheoryView(leaf));
    this.addRibbonIcon("dice", "Payoff Ledger", () => this.activateView());

    this.registerMarkdownCodeBlockProcessor("game-theory", (source, el, ctx) => {
      try {
        const state = JSON.parse(source);
        renderCardsDOM(el, state, false);
      } catch (e) {
        el.createEl("pre", { text: "Geçersiz Payoff Ledger verisi." });
      }
    });
  }

  async activateView() {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_GAME_THEORY)[0];
    if (!leaf) {
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE_GAME_THEORY, active: true });
    }
    workspace.revealLeaf(leaf);
  }
};
