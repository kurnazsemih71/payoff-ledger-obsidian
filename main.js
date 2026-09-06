const { Plugin, ItemView, Notice } = require('obsidian');

const VIEW_TYPE_GAME_THEORY = "game-theory-decision-engine";

// Menüde uzun ad, arayüzde sadece sembol
const CURRENCY_OPTIONS = [
  { label: "Döviz", symbol: "" },
  { label: "₺ - TL", symbol: "₺" },
  { label: "$ - Dolar", symbol: "$" },
  { label: "€ - Euro", symbol: "€" },
  { label: "£ - Pound", symbol: "£" }
];

const DEFAULT_STATE = {
  title: "Stratejik Karar ve Oyun Teorisi Analizi",
  unitSymbol: "",
  categories: [
    {
      id: "c1",
      title: "Büyük bir muhalefet partisi olmanın mevcut kurumsal getirileri",
      totalLabel: "Temel kurumsal getiri",
      isPositive: true,
      items: [
        { label: "Kamu finansmanı ve parti kaynakları", score: 2, enabled: true },
        { label: "Parlamento üyelikleri, personel ve komisyon imkânları", score: 1, enabled: true },
        { label: "Aday belirleme ve kendi parti örgütü üzerindeki kontrol", score: 1, enabled: true },
        { label: "Belediyeler ve yerel yönetim kaynakları", score: 1, enabled: true },
        { label: "Medya görünürlüğü, siyasi statü ve gündemde kalma", score: 1.35, enabled: true }
      ]
    },
    {
      id: "c2",
      title: "İktidara oynama stratejisinin potansiyel getirisi",
      totalLabel: "Beklenen siyasi getiri",
      isPositive: true,
      items: [
        { label: "İktidarı kazanma ihtimalinin beklenen siyasi getirisi", score: 5, enabled: true }
      ]
    },
    {
      id: "c3",
      title: "Diğer muhalefet partisi M'de kalırken tek başına İ stratejisine geçmenin maliyetleri",
      totalLabel: "Toplam maliyet",
      isPositive: false,
      items: [
        { label: "Mevcut liderlik ve parti içi güç dengelerini değiştirme riski", score: -2, enabled: true },
        { label: "Çekirdek seçmeni rahatsız edebilecek ideolojik yeniden konumlanma", score: -1, enabled: true },
        { label: "Yeni seçmen gruplarına ulaşmak için parti kimliğini genişletme", score: -1, enabled: true },
        { label: "Mevcut kadrolar yerine daha seçilebilir yeni adaylara alan açma", score: -1, enabled: true },
        { label: "Mevcut parti elitlerinin makam, adaylık ve örgütsel nüfuz kaybetme riski", score: -2, enabled: true }
      ]
    }
  ],
  strategies: ["M", "İ"],
  opponents: ["M", "İ"],
  selectedCell: "0-0"
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
    labels.createSpan({ text: cat.isPositive ? "AVANTAJ" : "DÖNÜŞÜM MALİYETİ" });
    labels.createSpan({ text: state.unitSymbol ? `DEĞER (${state.unitSymbol})` : "PUAN" });

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
        placeholder: "Yeni parametre...", 
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
      tInp.value = cat.totalLabel || "Toplam";
      tInp.onchange = (e) => { cat.totalLabel = e.target.value; onStateChange(); };
    } else {
      totalBar.createSpan({ text: cat.totalLabel || "Toplam", attr: { style: "font-weight:700; color:#fff; font-size:1.05rem;" } });
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
  mHead.createEl("h3", { text: "İki oyunculu tam payoff matrix", attr: { style: "margin:0; color:#fff; font-size:1.2rem;" } });
  mCard.createDiv({ text: "Her hücre: (Oyuncu 1'in getirisi, Oyuncu 2'nin getirisi)", attr: { style: "color:var(--ea-text-sub); font-size:0.85rem; margin-bottom:14px;" } });

  if (isInteractive) {
    const btnRow = mCard.createDiv({ attr: { style: "display:flex; gap:8px; margin-bottom:12px;" } });
    const rBtn = btnRow.createEl("button", { text: "+ Satır Ekle", attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:6px; cursor:pointer;" } });
    rBtn.onclick = () => { state.strategies.push(`Strateji ${state.strategies.length + 1}`); onStateChange(); };
    const cBtn = btnRow.createEl("button", { text: "+ Sütun Ekle", attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:6px; cursor:pointer;" } });
    cBtn.onclick = () => { state.opponents.push(`Durum ${state.opponents.length + 1}`); onStateChange(); };
  }

  const table = mCard.createEl("table", { cls: "ea-matrix-table" });
  const hRow = table.createEl("tr");
  hRow.createEl("th", { cls: "ea-matrix-th", text: "Oyuncu 1 \\ 2" });
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
  footer.innerHTML = `● <span style="color:var(--ea-green); font-weight:bold;">Oyuncu 1'in getirisi</span> &nbsp;&nbsp;&nbsp;&nbsp; ● <span style="color:var(--ea-blue); font-weight:bold;">Oyuncu 2'nin getirisi</span>`;
}

class GameTheoryView extends ItemView {
  constructor(leaf) {
    super(leaf);
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  getViewType() { return VIEW_TYPE_GAME_THEORY; }
  getDisplayText() { return "Oyun Teorisi Matrisi"; }
  getIcon() { return "dice"; }

  async onOpen() { this.render(); }

  render() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("ea-container-isolated");

    // 1. Satır: Başlık Tam Genişlik
    const titleRow = container.createDiv({ attr: { style: "margin-bottom:12px;" } });
    const tInp = titleRow.createEl("input", { cls: "ea-header-input" });
    tInp.value = this.state.title;
    tInp.oninput = (e) => { this.state.title = e.target.value; };

    // 2. Satır: Döviz Seçici + Butonlar
    const controlRow = container.createDiv({ attr: { style: "display:flex; gap:10px; margin-bottom:20px; align-items:center;" } });

    const unitSelect = controlRow.createEl("select", { cls: "ea-unit-select" });
    CURRENCY_OPTIONS.forEach(opt => {
      const optionEl = unitSelect.createEl("option", { text: opt.label, value: opt.symbol });
      if (opt.symbol === this.state.unitSymbol) optionEl.selected = true;
    });
    unitSelect.onchange = (e) => {
      this.state.unitSymbol = e.target.value;
      this.render();
    };

    const clearBtn = controlRow.createEl("button", { text: "Boş Tuval", attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:8px 14px; border-radius:8px; cursor:pointer;" } });
    clearBtn.onclick = () => {
      this.state.categories = [];
      this.state.strategies = ["A Planı", "B Planı"];
      this.state.opponents = ["Durum 1", "Durum 2"];
      this.state.selectedCell = "0-0";
      this.render();
    };

    const resetBtn = controlRow.createEl("button", { text: "Şablonu Yükle", attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:8px 14px; border-radius:8px; cursor:pointer;" } });
    resetBtn.onclick = () => {
      this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      this.render();
    };

    renderCardsDOM(container, this.state, true, () => this.render());

    // Yeni Kategori Kartı Butonu
    const addCatBtn = container.createEl("button", {
      text: "+ Yeni Kategori Kartı Ekle",
      attr: { style: "width:100%; padding:14px; border-radius:12px; background:transparent; border:1.5px dashed var(--ea-card-border); color:var(--ea-text-sub); cursor:pointer; margin-top:14px; font-weight:700;" }
    });
    addCatBtn.onclick = () => {
      this.state.categories.push({ id: "c_" + Date.now(), title: "Yeni Karar Boyutu", totalLabel: "Toplam", isPositive: true, items: [] });
      this.render();
    };

    // Şablonu Kaydet Butonu
    const saveBtn = container.createEl("button", {
      text: "Şablonu Kaydet",
      attr: { style: "width:100%; padding:14px; border-radius:12px; background:var(--ea-green); color:#000; font-weight:800; border:none; cursor:pointer; margin-top:20px; font-size:1rem;" }
    });
    saveBtn.onclick = () => this.saveDoc();
  }

  async saveDoc() {
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
> ${cat.isPositive ? '**AVANTAJLAR**' : '**DÖNÜŞÜM MALİYETLERİ**'}
${itemsList}
> 
> **${cat.totalLabel || 'Toplam'}:** \`${sign}\`
`;
    }).join('\n---\n\n');

    const tableHeader = `| Sen \\ Çevre | ` + this.state.opponents.join(' | ') + ' |';
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
unit: "${this.state.unitSymbol || 'Puan'}"
date: ${new Date().toISOString().split('T')[0]}
selected_cell: "${this.state.selectedCell}"
---

# ${this.state.title}

${categoriesMd}

---

### Payoff (Getiri) Matrisi
*Hücre formatı: (Senin Getirin , Dış Faktörün Getirisi)*
*Seçili Denge Noktası: **★** ile işaretlenmiştir.*

${tableHeader}
${tableDivider}
${tableRows}

> **Not:** Analizdeki getiri dengesi ve maliyetler Oyun Teorisi Motoru ile hesaplanmıştır.
`;

    const file = this.app.vault.getAbstractFileByPath(fileName);
    if (file) {
      await this.app.vault.modify(file, fullContent);
    } else {
      await this.app.vault.create(fileName, fullContent);
    }
    new Notice(`Şablon temiz ve birim eklenmiş olarak kaydedildi: ${fileName}`);
  }
}

module.exports = class GameTheoryPlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE_GAME_THEORY, (leaf) => new GameTheoryView(leaf));
    this.addRibbonIcon("dice", "Oyun Teorisi Karar Motoru", () => this.activateView());

    this.registerMarkdownCodeBlockProcessor("game-theory", (source, el, ctx) => {
      try {
        const state = JSON.parse(source);
        renderCardsDOM(el, state, false);
      } catch (e) {
        el.createEl("pre", { text: "Geçersiz Oyun Teorisi Verisi." });
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