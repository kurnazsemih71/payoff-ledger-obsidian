const { Plugin, ItemView, Notice } = require('obsidian');

const VIEW_TYPE_GAME_THEORY = "game-theory-decision-engine";

const TRANSLATIONS = {
  tr: {
    langLabel: "🇹🇷 TR",
    newCategory: "+ Yeni Boyut / Kalem Ekle",
    saveBtn: "Defteri Kaydet (Markdown)",
    savedNotice: "Bilanço başarıyla kaydedildi:",
    clearBtn: "Boş Tuval",
    templateBtn: "Şablonu Yükle",
    advLabel: "GELİR / AVANTAJ",
    costLabel: "GİDER / MALİYET",
    unitLabel: "DEĞER",
    newParamPlaceholder: "Yeni parametre / kalem...",
    totalDefault: "Toplam",
    matrixTitle: "Stratejik Getiri Matrisi (Payoff Matrix)",
    matrixSub: "Her hücre: (Toplam Fayda / Artı Getiri , Toplam Maliyet / Risk)",
    addStrat: "+ Satır Ekle",
    addOpp: "+ Sütun Ekle",
    p1Legend: "Toplam Fayda / Artı Getiri",
    p2Legend: "Toplam Maliyet / Risk",
    matrixFootnote: "Analiz ve bilanço Payoff Ledger ile hesaplanıp simüle edilmiştir.",
    matrixOn: "🎲 Matris: Açık",
    matrixOff: "🎲 Matris: Kapalı",
    presetOptions: [
      { key: "strategy", name: "🎲 Stratejik Karar Matrisi" },
      { key: "repair", name: "🔧 Teknik Servis & Onarım" },
      { key: "farm", name: "⚔️ Oyun Slot & Farm Hesabı" },
      { key: "vehicle", name: "🚗 Taşıt, Yakıt & KM Hesabı" },
      { key: "hardware", name: "💻 Donanım Satın Alma Süzgeci" }
    ],
    currencies: [
      { label: "Puan", symbol: "" },
      { label: "₺ - TL", symbol: "₺" },
      { label: "$ - Dolar", symbol: "$" },
      { label: "€ - Euro", symbol: "€" },
      { label: "£ - Pound", symbol: "£" }
    ],
    presets: {
      strategy: {
        title: "Stratejik Değerleme ve Karar Matrisi",
        unitSymbol: "",
        showMatrix: true,
        matrixSub: "Her hücre: (Toplam Fayda / Artı Getiri , Toplam Maliyet / Risk)",
        p1Legend: "Toplam Fayda / Artı Getiri",
        p2Legend: "Toplam Maliyet / Risk",
        categories: [
          { id: "c1", title: "Mevcut Yapıyı Korumak (Status Quo)", totalLabel: "Temel Güvence Getirisi", isPositive: true, customAdvLabel: "GELİR / AVANTAJ", customValLabel: "DEĞER", items: [
            { label: "Öngörülebilir nakit akışı ve risksiz gelir", score: 2.5, enabled: true },
            { label: "Düşük bilişsel stres ve operasyonel konfor", score: 1.5, enabled: true }
          ]},
          { id: "c2", title: "Büyük Atılım ve Büyüme Hamlesi", totalLabel: "Beklenen Stratejik Getiri", isPositive: true, customAdvLabel: "STRATEJİK GETİRİ", customValLabel: "DEĞER", items: [
            { label: "Pazarda asimetrik ölçeklenme potansiyeli", score: 5.5, enabled: true }
          ]},
          { id: "c3", title: "Dönüşüm Sürtünmesi ve Geçiş Maliyeti", totalLabel: "Toplam Sürtünme Maliyeti", isPositive: false, customAdvLabel: "GİDER / MALİYET", customValLabel: "DEĞER", items: [
            { label: "Sermaye tahsisi ve doğrudan harcama", score: -2.5, enabled: true },
            { label: "Zaman fedakarlığı ve yüksek efor", score: -2.0, enabled: true }
          ]}
        ],
        strategies: ["Mevcudu Koru", "Atılıma Geç"], opponents: ["Durgun Pazar", "Dinamik Pazar"], selectedCell: "0-0"
      },
      repair: {
        title: "Teknik Servis & Donanım Onarım Bilanço Analizi",
        unitSymbol: "₺",
        showMatrix: false,
        matrixSub: "Her hücre: (Servis Geliri , Servis Gideri)",
        p1Legend: "Toplam Servis Geliri",
        p2Legend: "Toplam Servis Maliyeti",
        categories: [
          { id: "c1", title: "Alınan Hizmet & Servis Gelirleri", totalLabel: "Toplam Servis Cirosu", isPositive: true, customAdvLabel: "GELİR / KAZANÇ", customValLabel: "TUTAR (₺)", items: [
            { label: "İşçilik ve arıza tespit bedeli", score: 650, enabled: true },
            { label: "Takılan donanım / parça satış kârı", score: 1200, enabled: true }
          ]},
          { id: "c2", title: "Parça, Sarf Malzeme ve Operasyonel Giderler", totalLabel: "Toplam Onarım Maliyeti", isPositive: false, customAdvLabel: "GİDER / MALİYET", customValLabel: "TUTAR (₺)", items: [
            { label: "Tedarik edilen yedek parça maliyeti", score: -850, enabled: true },
            { label: "Stres testi ve işçilik süresi", score: -45, enabled: true }
          ]}
        ],
        strategies: ["Onarım Yap", "İptal Et"], opponents: ["Onay", "İptal"], selectedCell: "0-0"
      },
      farm: {
        title: "MMORPG Slot Farm & Verimlilik Defteri",
        unitSymbol: "$",
        showMatrix: false,
        matrixSub: "Her hücre: (Brüt Loot Geliri , Farm Masrafı)",
        p1Legend: "Toplam Drop & Loot",
        p2Legend: "Sarfiyat & Bot Masrafı",
        categories: [
          { id: "c1", title: "Kazanılan Drop, Loot & Etkinlik Gelirleri", totalLabel: "Toplam Brüt Slot Getirisi", isPositive: true, customAdvLabel: "LOOT / KAZANÇ", customValLabel: "DEĞER ($)", items: [
            { label: "Slot NPC çöp satışı nakit getirisi", score: 14.50, enabled: true },
            { label: "Elde edilen değerli eşya satışları", score: 28.00, enabled: true }
          ]},
          { id: "c2", title: "Sarfiyat, Otomasyon & Sürtünme Giderleri", totalLabel: "Toplam Farm Maliyeti", isPositive: false, customAdvLabel: "EXPENSE / COST", customValLabel: "VALUE ($)", items: [
            { label: "HP / MP iksir (pot) sarfiyatı", score: -6.20, enabled: true },
            { label: "Otomasyon, bot ve amortisman", score: -4.50, enabled: true }
          ]}
        ],
        strategies: ["Slotta Kal", "Slotu Bırak"], opponents: ["Rahat Slot", "KS Var"], selectedCell: "0-0"
      },
      vehicle: {
        title: "Taşıt, Akaryakıt & Yol Maliyeti Takibi",
        unitSymbol: "₺",
        showMatrix: false,
        matrixSub: "Her hücre: (Ulaşım Değeri , Yol Masrafı)",
        p1Legend: "Ulaşım Değeri & Tasarruf",
        p2Legend: "Yakıt & Yol Gideri",
        categories: [
          { id: "c1", title: "Seyahatin Sağladığı Doğrudan Değer", totalLabel: "Toplam Ulaşım Faydası", isPositive: true, customAdvLabel: "TASARRUF / FAYDA", customValLabel: "TUTAR (₺)", items: [
            { label: "Alternatif taksi / bilet tasarrufu", score: 850, enabled: true }
          ]},
          { id: "c2", title: "Yakıt ve Yol Giderleri", totalLabel: "Reel Seyahat Gideri", isPositive: false, customAdvLabel: "YAKIT / MASRAF", customValLabel: "TUTAR (₺)", items: [
            { label: "İstasyondan alınan yakıt tutarı", score: -1450, enabled: true },
            { label: "Otoyol ve köprü geçiş ücretleri", score: -185, enabled: true }
          ]}
        ],
        strategies: ["Kendi Aracınla Git", "Toplu Taşıma"], opponents: ["Akıcı", "Yoğun"], selectedCell: "0-0"
      },
      hardware: {
        title: "Donanım / Ekipman Satın Alma Süzgeci",
        unitSymbol: "",
        showMatrix: true,
        matrixSub: "Her hücre: (Sağlanan Fayda Skoru , Maliyet & Risk Skoru)",
        p1Legend: "Sağlanan Net Fayda",
        p2Legend: "Maliyet & Finansal Risk",
        categories: [
          { id: "c1", title: "Satın Almanın Sağlayacağı Doğrudan Faydalar", totalLabel: "Temel Fayda Skoru", isPositive: true, customAdvLabel: "FAYDA / DEĞER", customValLabel: "SKOR", items: [
            { label: "İş akışında net zaman tasarrufu", score: 3.5, enabled: true },
            { label: "Yüksek 2. el piyasası ve değer koruma", score: 1.5, enabled: true }
          ]},
          { id: "c2", title: "Maliyet, Taksit Yükü & Fırsat Kayıpları", totalLabel: "Maliyet ve Risk Skoru", isPositive: false, customAdvLabel: "RİSK / BORÇ", customValLabel: "SKOR", items: [
            { label: "Taksit yükünün nakit akışını sıkıştırması", score: -3.0, enabled: true },
            { label: "Acil durum fonundan harcama riski", score: -2.5, enabled: true }
          ]}
        ],
        strategies: ["Satın Al", "Bekle"], opponents: ["Fiyat Artışı Riski", "İndirim Dönemi"], selectedCell: "0-0"
      }
    }
  },
  en: {
    langLabel: "🇬🇧 EN",
    newCategory: "+ Add New Ledger Group",
    saveBtn: "Save Ledger (Markdown)",
    savedNotice: "Ledger saved successfully:",
    clearBtn: "Blank Canvas",
    templateBtn: "Load Template",
    advLabel: "INCOME / ADVANTAGE",
    costLabel: "EXPENSE / COST",
    unitLabel: "VALUE",
    newParamPlaceholder: "New item...",
    totalDefault: "Total",
    matrixTitle: "Strategic Payoff Matrix",
    matrixSub: "Each cell: (Total Benefit / Positive Upside , Total Friction / Risk)",
    addStrat: "+ Add Row",
    addOpp: "+ Add Column",
    p1Legend: "Total Benefit / Upside",
    p2Legend: "Total Friction / Risk",
    matrixFootnote: "Equilibrium balances and friction costs simulated via Payoff Ledger.",
    matrixOn: "🎲 Matrix: On",
    matrixOff: "🎲 Matrix: Off",
    presetOptions: [
      { key: "strategy", name: "🎲 Strategic Decision Matrix" },
      { key: "repair", name: "🔧 Tech Service & Repair" },
      { key: "farm", name: "⚔️ Game Farm & Efficiency" },
      { key: "vehicle", name: "🚗 Fuel & Mileage Tracking" },
      { key: "hardware", name: "💻 Hardware Purchase Filter" }
    ],
    currencies: [
      { label: "Points", symbol: "" },
      { label: "$ - USD", symbol: "$" },
      { label: "€ - EUR", symbol: "€" },
      { label: "£ - GBP", symbol: "£" },
      { label: "₺ - TRY", symbol: "₺" }
    ],
    presets: {
      strategy: {
        title: "Strategic Valuation & Decision Matrix",
        unitSymbol: "",
        showMatrix: true,
        matrixSub: "Each cell: (Total Upside , Total Friction)",
        p1Legend: "Total Benefit / Upside",
        p2Legend: "Total Friction / Risk",
        categories: [
          { id: "c1", title: "Maintaining Status Quo", totalLabel: "Core Guaranteed Return", isPositive: true, customAdvLabel: "INCOME / ADVANTAGE", customValLabel: "VALUE", items: [
            { label: "Predictable revenue and zero-risk cash", score: 2.5, enabled: true },
            { label: "Low cognitive friction and comfort", score: 1.5, enabled: true }
          ]},
          { id: "c2", title: "Aggressive Expansion", totalLabel: "Expected Strategic Upside", isPositive: true, customAdvLabel: "STRATEGIC UPSIDE", customValLabel: "VALUE", items: [
            { label: "Asymmetric market scalability", score: 5.5, enabled: true }
          ]},
          { id: "c3", title: "Transition Friction", totalLabel: "Total Friction Cost", isPositive: false, customAdvLabel: "EXPENSE / COST", customValLabel: "VALUE", items: [
            { label: "Capital expenditure and financial exposure", score: -2.5, enabled: true },
            { label: "Severe time allocation and burnout", score: -2.0, enabled: true }
          ]}
        ],
        strategies: ["Maintain", "Advance"], opponents: ["Passive", "Dynamic"], selectedCell: "0-0"
      },
      repair: {
        title: "Tech Service & Hardware Repair Ledger",
        unitSymbol: "$",
        showMatrix: false,
        matrixSub: "Each cell: (Service Revenue , Service Cost)",
        p1Legend: "Service Revenue",
        p2Legend: "Service Cost",
        categories: [
          { id: "c1", title: "Service Revenues", totalLabel: "Total Revenue", isPositive: true, customAdvLabel: "INCOME / ADVANTAGE", customValLabel: "VALUE ($)", items: [
            { label: "Labor and diagnostic fee", score: 150, enabled: true },
            { label: "Hardware markup margin", score: 200, enabled: true }
          ]},
          { id: "c2", title: "Parts & Operational Costs", totalLabel: "Total Cost", isPositive: false, customAdvLabel: "EXPENSE / COST", customValLabel: "VALUE ($)", items: [
            { label: "Replacement parts cost", score: -120, enabled: true },
            { label: "Bench testing electricity and time", score: -25, enabled: true }
          ]}
        ],
        strategies: ["Repair", "Cancel"], opponents: ["Approved", "Declined"], selectedCell: "0-0"
      },
      farm: {
        title: "MMORPG Slot Farm Efficiency",
        unitSymbol: "$",
        showMatrix: false,
        matrixSub: "Each cell: (Gross Drop Yield , Farm Expense)",
        p1Legend: "Gross Drop Yield",
        p2Legend: "Farm Expense",
        categories: [
          { id: "c1", title: "Loot & Event Revenues", totalLabel: "Gross Slot Revenue", isPositive: true, customAdvLabel: "LOOT / REVENUE", customValLabel: "VALUE ($)", items: [
            { label: "Trash loot cash yield", score: 14.50, enabled: true },
            { label: "High-value drops and upgrades", score: 28.00, enabled: true }
          ]},
          { id: "c2", title: "Consumables & Friction Costs", totalLabel: "Total Farm Cost", isPositive: false, customAdvLabel: "EXPENSE / COST", customValLabel: "VALUE ($)", items: [
            { label: "HP / MP potion consumption", score: -6.20, enabled: true },
            { label: "Bot automation and PC depreciation", score: -4.50, enabled: true }
          ]}
        ],
        strategies: ["Stay", "Leave"], opponents: ["Free", "Contested"], selectedCell: "0-0"
      },
      vehicle: {
        title: "Vehicle & Fuel Cost Tracking",
        unitSymbol: "$",
        showMatrix: false,
        matrixSub: "Each cell: (Transport Value , Fuel & Toll Cost)",
        p1Legend: "Transport Value",
        p2Legend: "Fuel & Toll Cost",
        categories: [
          { id: "c1", title: "Transport Value", totalLabel: "Total Utility", isPositive: true, customAdvLabel: "UTILITY / SAVINGS", customValLabel: "VALUE ($)", items: [
            { label: "Taxi / alternative ticket savings", score: 45, enabled: true }
          ]},
          { id: "c2", title: "Fuel & Road Costs", totalLabel: "Real Trip Cost", isPositive: false, customAdvLabel: "EXPENSE / COST", customValLabel: "VALUE ($)", items: [
            { label: "Gas station fuel cost", score: -65, enabled: true },
            { label: "Highway tolls", score: -12, enabled: true }
          ]}
        ],
        strategies: ["Drive", "Transit"], opponents: ["Clear", "Traffic"], selectedCell: "0-0"
      },
      hardware: {
        title: "Equipment Purchase Filter",
        unitSymbol: "",
        showMatrix: true,
        matrixSub: "Each cell: (Utility Score , Cost & Risk)",
        p1Legend: "Net Utility Score",
        p2Legend: "Cost & Risk Score",
        categories: [
          { id: "c1", title: "Direct Benefits", totalLabel: "Base Utility Score", isPositive: true, customAdvLabel: "BENEFITS / UPSIDE", customValLabel: "SCORE", items: [
            { label: "Net time saved in rendering/workflow", score: 3.5, enabled: true }
          ]},
          { id: "c2", title: "Costs & Opportunity Risks", totalLabel: "Cost & Risk Score", isPositive: false, customAdvLabel: "EXPENSE / COST", customValLabel: "SCORE", items: [
            { label: "Monthly installment cash flow squeeze", score: -3.0, enabled: true },
            { label: "Depleting emergency fund", score: -2.5, enabled: true }
          ]}
        ],
        strategies: ["Buy Now", "Wait"], opponents: ["Price Hike", "Discount"], selectedCell: "0-0"
      }
    }
  }
};

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function cleanFloat(val) {
  return Math.round(val * 100) / 100;
}

function formatScore(score, symbol, lang = 'tr') {
  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const formattedNum = formatter.format(Math.abs(score));
  const sign = score >= 0 ? `+${formattedNum}` : `-${formattedNum}`;
  return symbol ? `${sign} ${symbol}` : sign;
}

function adjustInputWidth(el) {
  const valLen = el.value.toString().length;
  const calcWidth = Math.max(65, valLen * 10 + 35);
  el.style.width = Math.min(calcWidth, 160) + "px";
}

function renderCardsDOM(container, state, isInteractive = false, onStateChange = null) {
  const t = TRANSLATIONS[state.lang];
  const root = container.createDiv({ cls: "ea-container-isolated" });

  if (!isInteractive) {
    root.createEl("h1", { text: state.title, attr: { style: "margin-top:0; color:#fff; font-size:1.6rem; font-weight:800; margin-bottom:24px;" } });
  }

  let dynamicPositiveTotal = 0;
  let dynamicNegativeTotal = 0;

  state.categories.forEach(cat => {
    cat.items.filter(i => i.enabled).forEach(item => {
      const val = parseFloat(item.score) || 0;
      if (val >= 0) dynamicPositiveTotal += val; else dynamicNegativeTotal += val;
    });
  });

  dynamicPositiveTotal = cleanFloat(dynamicPositiveTotal);
  dynamicNegativeTotal = cleanFloat(dynamicNegativeTotal);

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

    // Doğrudan tıklanıp değiştirilebilir Sütun Başlıkları
    const labels = card.createDiv({ cls: "ea-col-labels" });
    const defaultLeftLabel = cat.isPositive ? t.advLabel : t.costLabel;
    const defaultRightLabel = state.unitSymbol ? `${t.unitLabel} (${state.unitSymbol})` : t.unitLabel;

    if (isInteractive) {
      // Sol Sütun Başlığı (EXPENSE / COST vb.)
      const leftInp = labels.createEl("input", { 
        cls: "ea-col-label-input", 
        attr: { style: "flex: 1; max-width: 260px;" } 
      });
      leftInp.value = cat.customAdvLabel !== undefined ? cat.customAdvLabel : defaultLeftLabel;
      leftInp.oninput = (e) => { cat.customAdvLabel = e.target.value; };
      leftInp.onchange = (e) => { cat.customAdvLabel = e.target.value; onStateChange(); };

      // Sağ Sütun Başlığı (VALUE (£) vb.)
      const rightInp = labels.createEl("input", { 
        cls: "ea-col-label-input", 
        attr: { style: "text-align: right; width: 130px;" } 
      });
      rightInp.value = cat.customValLabel !== undefined ? cat.customValLabel : defaultRightLabel;
      rightInp.oninput = (e) => { cat.customValLabel = e.target.value; };
      rightInp.onchange = (e) => { cat.customValLabel = e.target.value; onStateChange(); };
    } else {
      labels.createSpan({ text: cat.customAdvLabel !== undefined ? cat.customAdvLabel : defaultLeftLabel });
      labels.createSpan({ text: cat.customValLabel !== undefined ? cat.customValLabel : defaultRightLabel });
    }

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
          cls: `ea-pill ${item.score >= 0 ? 'ea-pill-green' : 'ea-pill-red'}`, 
          attr: { type: "number", step: "any" } 
        });
        scr.value = item.score;
        setTimeout(() => adjustInputWidth(scr), 10);
        scr.oninput = (e) => adjustInputWidth(e.target);
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
        const pill = row.createSpan({ cls: `ea-pill ${item.score >= 0 ? 'ea-pill-green' : 'ea-pill-red'}` });
        pill.setText(formatScore(item.score, state.unitSymbol, state.lang));
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
        value: cat.isPositive ? 100 : -100, 
        attr: { style: "width:80px; background:#0d1117; border:1px solid var(--ea-card-border); color:#fff; padding:8px; border-radius:8px; text-align:center;" } 
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

    const isNetPositive = total >= 0;
    const tPill = totalBar.createSpan({ 
      cls: `ea-total-pill ${isNetPositive ? 'ea-pill-green' : 'ea-pill-red'}` 
    });
    tPill.setText(formatScore(total, state.unitSymbol, state.lang));
  });

  // 2. Payoff Matrisi
  if (state.showMatrix) {
    const mCard = root.createDiv({ cls: "ea-card" });
    const mHead = mCard.createDiv({ attr: { style: "display:flex; align-items:center; gap:10px; margin-bottom:6px;" } });
    mHead.createSpan({ attr: { style: "width:4px; height:22px; background:var(--ea-green); border-radius:2px;" } });
    mHead.createEl("h3", { text: t.matrixTitle, attr: { style: "margin:0; color:#fff; font-size:1.2rem;" } });

    if (isInteractive) {
      const subInp = mCard.createEl("input", { 
        attr: { style: "width:100%; color:var(--ea-text-sub); font-size:0.85rem; margin-bottom:14px; background:transparent; border:1px solid transparent; border-radius:4px; padding:2px 4px;" } 
      });
      subInp.value = state.matrixSub || t.matrixSub;
      subInp.onchange = (e) => { state.matrixSub = e.target.value; onStateChange(); };
    } else {
      mCard.createDiv({ text: state.matrixSub || t.matrixSub, attr: { style: "color:var(--ea-text-sub); font-size:0.85rem; margin-bottom:14px;" } });
    }

    if (isInteractive) {
      const btnRow = mCard.createDiv({ attr: { style: "display:flex; gap:8px; margin-bottom:12px;" } });
      const rBtn = btnRow.createEl("button", { text: t.addStrat, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:6px; cursor:pointer;" } });
      rBtn.onclick = () => { state.strategies.push(`Strateji ${state.strategies.length + 1}`); onStateChange(); };
      const cBtn = btnRow.createEl("button", { text: t.addOpp, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:6px; cursor:pointer;" } });
      cBtn.onclick = () => { state.opponents.push(`Durum ${state.opponents.length + 1}`); onStateChange(); };
    }

    const table = mCard.createEl("table", { cls: "ea-matrix-table" });
    const hRow = table.createEl("tr");
    
    hRow.createEl("th", { cls: "ea-matrix-th", text: "Stratejiler \\ Senaryolar", attr: { style: "width: 220px;" } });
    
    state.opponents.forEach((opp, cIdx) => {
      const th = hRow.createEl("th", { cls: "ea-matrix-th" });
      if (isInteractive) {
        const inp = th.createEl("input", { attr: { style: "text-align:center; font-size:0.95rem; font-weight:700; background:transparent; border:1px solid transparent; color:#8b949e; width:100px; border-radius:4px;" } });
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
      
      const sth = row.createEl("th", { cls: "ea-matrix-strat-th" });
      if (isInteractive) {
        const wrap = sth.createDiv({ attr: { style: "display:flex; align-items:center; gap:6px;" } });
        const ta = wrap.createEl("textarea", { cls: "ea-matrix-strat-area", rows: 1 });
        ta.value = strat;
        setTimeout(() => autoResize(ta), 10);
        ta.oninput = () => autoResize(ta);
        ta.onchange = (e) => { state.strategies[rIdx] = e.target.value; };
        
        if (state.strategies.length > 1) {
          const del = wrap.createSpan({ text: "×", attr: { style: "cursor:pointer; color:var(--ea-red); font-weight:bold; font-size:1.1rem; padding:0 4px;" } });
          del.onclick = () => { state.strategies.splice(rIdx, 1); onStateChange(); };
        }
      } else {
        sth.setText(strat);
      }

      state.opponents.forEach((opp, cIdx) => {
        const key = `${rIdx}-${cIdx}`;
        if (!state.matrixCustom) state.matrixCustom = {};

        let cellPos = state.matrixCustom[key]?.pos !== undefined ? state.matrixCustom[key].pos : (rIdx === 0 ? dynamicPositiveTotal : cleanFloat(dynamicPositiveTotal * 0.4));
        let cellNeg = state.matrixCustom[key]?.neg !== undefined ? state.matrixCustom[key].neg : (rIdx === 0 ? dynamicNegativeTotal : 0);

        const td = row.createEl("td", { cls: "ea-matrix-cell" });
        if (state.selectedCell === key) td.addClass("selected-nash");

        if (isInteractive) {
          td.onclick = (e) => {
            if (e.target.tagName !== "INPUT") {
              state.selectedCell = key;
              mCard.querySelectorAll(".ea-matrix-cell").forEach(c => c.removeClass("selected-nash"));
              td.addClass("selected-nash");
            }
          };

          const pInp = td.createEl("input", { cls: "ea-cell-val-input ea-cell-val-green", attr: { type: "number", step: "any" } });
          pInp.value = cellPos;
          pInp.onchange = (e) => {
            if (!state.matrixCustom[key]) state.matrixCustom[key] = {};
            state.matrixCustom[key].pos = parseFloat(e.target.value) || 0;
            onStateChange();
          };

          td.createSpan({ text: " , ", attr: { style: "color:var(--ea-text-sub); font-size:1.4rem; font-weight:800;" } });

          const nInp = td.createEl("input", { cls: "ea-cell-val-input ea-cell-val-red", attr: { type: "number", step: "any" } });
          nInp.value = cellNeg;
          nInp.onchange = (e) => {
            if (!state.matrixCustom[key]) state.matrixCustom[key] = {};
            state.matrixCustom[key].neg = parseFloat(e.target.value) || 0;
            onStateChange();
          };
        } else {
          td.innerHTML = `<span style="color:var(--ea-green);">${cellPos >= 0 ? '+' + cellPos : cellPos}</span> , <span style="color:var(--ea-red);">${cellNeg}</span>`;
        }
      });
    });

    const footer = mCard.createDiv({ attr: { style: "margin-top:14px; text-align:center; font-size:0.85rem; display:flex; justify-content:center; gap:20px; align-items:center;" } });
    
    if (isInteractive) {
      const leg1Wrap = footer.createDiv({ attr: { style: "display:flex; align-items:center; gap:6px;" } });
      leg1Wrap.createSpan({ text: "●", attr: { style: "color:var(--ea-green); font-size:1.1rem;" } });
      const leg1Inp = leg1Wrap.createEl("input", { attr: { style: "background:transparent; border:1px solid transparent; color:var(--ea-green); font-weight:bold; font-size:0.85rem; width:160px;" } });
      leg1Inp.value = state.p1Legend || t.p1Legend;
      leg1Inp.onchange = (e) => { state.p1Legend = e.target.value; onStateChange(); };

      const leg2Wrap = footer.createDiv({ attr: { style: "display:flex; align-items:center; gap:6px;" } });
      leg2Wrap.createSpan({ text: "●", attr: { style: "color:var(--ea-red); font-size:1.1rem;" } });
      const leg2Inp = leg2Wrap.createEl("input", { attr: { style: "background:transparent; border:1px solid transparent; color:var(--ea-red); font-weight:bold; font-size:0.85rem; width:160px;" } });
      leg2Inp.value = state.p2Legend || t.p2Legend;
      leg2Inp.onchange = (e) => { state.p2Legend = e.target.value; onStateChange(); };
    } else {
      footer.innerHTML = `● <span style="color:var(--ea-green); font-weight:bold;">${state.p1Legend || t.p1Legend}</span> &nbsp;&nbsp;&nbsp;&nbsp; ● <span style="color:var(--ea-red); font-weight:bold;">${state.p2Legend || t.p2Legend}</span>`;
    }
  }
}

class GameTheoryView extends ItemView {
  constructor(leaf) {
    super(leaf);
    this.state = this.loadPreset('farm', 'en'); // Doğrudan görseldeki şablonla başlat
  }

  loadPreset(presetKey, lang) {
    const t = TRANSLATIONS[lang];
    const p = t.presets[presetKey];
    return {
      lang: lang,
      activePreset: presetKey,
      title: p.title,
      unitSymbol: p.unitSymbol,
      showMatrix: p.showMatrix,
      matrixSub: p.matrixSub,
      p1Legend: p.p1Legend,
      p2Legend: p.p2Legend,
      categories: JSON.parse(JSON.stringify(p.categories)),
      strategies: [...p.strategies],
      opponents: [...p.opponents],
      selectedCell: p.selectedCell,
      matrixCustom: {}
    };
  }

  getViewType() { return VIEW_TYPE_GAME_THEORY; }
  getDisplayText() { return "Payoff Ledger"; }
  getIcon() { return "dice"; }

  async onOpen() { this.render(); }

  render() {
    const t = TRANSLATIONS[this.state.lang];
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass("ea-container-isolated");

    // 1. Satır: Başlık
    const titleRow = container.createDiv({ attr: { style: "margin-bottom:12px;" } });
    const tInp = titleRow.createEl("input", { cls: "ea-header-input" });
    tInp.value = this.state.title;
    tInp.oninput = (e) => { this.state.title = e.target.value; };

    // 2. Satır: Kontroller
    const controlRow = container.createDiv({ attr: { style: "display:flex; gap:10px; margin-bottom:20px; align-items:center; flex-wrap:wrap;" } });

    const langSelect = controlRow.createEl("select", { cls: "ea-unit-select" });
    [ { label: "🇹🇷 TR", val: "tr" }, { label: "🇬🇧 EN", val: "en" } ].forEach(opt => {
      const el = langSelect.createEl("option", { text: opt.label, value: opt.val });
      if (opt.val === this.state.lang) el.selected = true;
    });
    langSelect.onchange = (e) => {
      this.state = this.loadPreset(this.state.activePreset, e.target.value);
      this.render();
    };

    const presetSelect = controlRow.createEl("select", { cls: "ea-unit-select" });
    t.presetOptions.forEach(opt => {
      const el = presetSelect.createEl("option", { text: opt.name, value: opt.key });
      if (opt.key === this.state.activePreset) el.selected = true;
    });
    presetSelect.onchange = (e) => {
      this.state = this.loadPreset(e.target.value, this.state.lang);
      this.render();
    };

    const matrixToggleBtn = controlRow.createEl("button", { 
      text: this.state.showMatrix ? t.matrixOn : t.matrixOff, 
      attr: { style: `border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:8px; cursor:pointer; font-weight:700; ${this.state.showMatrix ? 'background:rgba(46,160,67,0.2); color:#56d364; border-color:#3fb950;' : 'background:var(--ea-item-bg); color:var(--ea-text-sub);'}` } 
    });
    matrixToggleBtn.onclick = () => {
      this.state.showMatrix = !this.state.showMatrix;
      this.render();
    };

    const unitSelect = controlRow.createEl("select", { cls: "ea-unit-select" });
    t.currencies.forEach(opt => {
      const el = unitSelect.createEl("option", { text: opt.label, value: opt.symbol });
      if (opt.symbol === this.state.unitSymbol) el.selected = true;
    });
    unitSelect.onchange = (e) => {
      this.state.unitSymbol = e.target.value;
      this.render();
    };

    const clearBtn = controlRow.createEl("button", { text: t.clearBtn, attr: { style: "background:var(--ea-item-bg); color:#fff; border:1px solid var(--ea-card-border); padding:6px 12px; border-radius:8px; cursor:pointer;" } });
    clearBtn.onclick = () => {
      this.state.categories = [];
      this.state.strategies = ["Strateji 1", "Strateji 2"];
      this.state.opponents = ["Durum 1", "Durum 2"];
      this.state.selectedCell = "0-0";
      this.state.matrixCustom = {};
      this.render();
    };

    renderCardsDOM(container, this.state, true, () => this.render());

    const addCatBtn = container.createEl("button", {
      text: t.newCategory,
      attr: { style: "width:100%; padding:14px; border-radius:12px; background:transparent; border:1.5px dashed var(--ea-card-border); color:var(--ea-text-sub); cursor:pointer; margin-top:14px; font-weight:700;" }
    });
    addCatBtn.onclick = () => {
      this.state.categories.push({ id: "c_" + Date.now(), title: "...", totalLabel: t.totalDefault, isPositive: true, customAdvLabel: t.advLabel, customValLabel: t.unitLabel, items: [] });
      this.render();
    };

    const saveBtn = container.createEl("button", {
      text: t.saveBtn,
      attr: { style: "width:100%; padding:14px; border-radius:12px; background:var(--ea-green); color:#000; font-weight:800; border:none; cursor:pointer; margin-top:20px; font-size:1rem;" }
    });
    saveBtn.onclick = () => this.saveDoc();
  }

  async saveDoc() {
    const t = TRANSLATIONS[this.state.lang];
    const fileName = `${this.state.title.replace(/[/\\?%*:|"<>]/g, '-')}.md`;

    let dynPos = 0;
    let dynNeg = 0;
    this.state.categories.forEach(cat => {
      cat.items.filter(i => i.enabled).forEach(item => {
        const val = parseFloat(item.score) || 0;
        if (val >= 0) dynPos += val; else dynNeg += val;
      });
    });
    dynPos = cleanFloat(dynPos);
    dynNeg = cleanFloat(dynNeg);

    const categoriesMd = this.state.categories.map((cat, idx) => {
      const activeItems = cat.items.filter(i => i.enabled);
      const rawTotal = activeItems.reduce((a, b) => a + (parseFloat(b.score) || 0), 0);
      const total = cleanFloat(rawTotal);
      const sign = formatScore(total, this.state.unitSymbol, this.state.lang);

      const itemsList = activeItems.map(i => {
        const val = parseFloat(i.score) || 0;
        const itemSign = formatScore(val, this.state.unitSymbol, this.state.lang);
        return `> ✔ ${i.label} \`${itemSign}\``;
      }).join('\n');

      const defaultLeftLabel = cat.isPositive ? t.advLabel : t.costLabel;
      const finalHeader = cat.customAdvLabel !== undefined ? cat.customAdvLabel : defaultLeftLabel;

      return `### ${idx + 1}. ${cat.title}
> **${finalHeader}**
${itemsList}
> 
> **${cat.totalLabel || t.totalDefault}:** \`${sign}\`
`;
    }).join('\n---\n\n');

    let matrixSection = "";
    if (this.state.showMatrix) {
      const tableHeader = `| Strateji \\ Durum | ` + this.state.opponents.join(' | ') + ' |';
      const tableDivider = `| :--- | ` + this.state.opponents.map(() => ':---:').join(' | ') + ' |';
      
      const tableRows = this.state.strategies.map((strat, rIdx) => {
        const rowCells = this.state.opponents.map((opp, cIdx) => {
          const key = `${rIdx}-${cIdx}`;
          const isSelected = (this.state.selectedCell === key);
          
          let p1 = this.state.matrixCustom?.[key]?.pos !== undefined ? this.state.matrixCustom[key].pos : (rIdx === 0 ? dynPos : cleanFloat(dynPos * 0.4));
          let p2 = this.state.matrixCustom?.[key]?.neg !== undefined ? this.state.matrixCustom[key].neg : (rIdx === 0 ? dynNeg : 0);
          
          return isSelected ? `**[ +${p1} , ${p2} ] ★**` : `+${p1} , ${p2}`;
        }).join(' | ');

        return `| **${strat}** | ${rowCells} |`;
      }).join('\n');

      matrixSection = `---

### ${t.matrixTitle}
*${this.state.matrixSub || t.matrixSub}*
*Lejant: (● ${this.state.p1Legend || t.p1Legend} , ● ${this.state.p2Legend || t.p2Legend}) | ★ = Seçili Denge*

${tableHeader}
${tableDivider}
${tableRows}
`;
    }

    const fullContent = `---
type: payoff-ledger
title: "${this.state.title}"
unit: "${this.state.unitSymbol || 'Puan'}"
lang: "${this.state.lang}"
matrix_enabled: ${this.state.showMatrix}
date: ${new Date().toISOString().split('T')[0]}
---

# ${this.state.title}

${categoriesMd}

${matrixSection}

> **Not:** ${t.matrixFootnote}
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