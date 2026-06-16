/**
 * AvaBot Operations Sandbox - Interaction & Refactoring Orchestrator
 * Performs DOM manipulation, math bounds evaluation, and Q&A keyword routing.
 */

// Global App States
let sliderVals = {
  adoption: 1,
  tech: 1,
  human: 1,
  cost: 1,
  business: 1,
  geopol: 1,
  gov: 1,
};

let messages = [];
let isTyping = false;
let activeTooltip = null;
let activeScenario = 'S1';
let lastScenario = 'S1';

// Initial Boot of Sandbox
window.addEventListener('DOMContentLoaded', () => {
  // 1. Set physical default ranges
  resetRangeInputSlidersInDOM();

  // 2. Initialize welcoming greeting message
  const scenarioMeta = SCENARIO_DATA[activeScenario];
  const welcomeText = `💡 **System Initialized.** I have booted up operating under the **${scenarioMeta.role}** context (${activeScenario}). \n\nI am presently operating at **${scenarioMeta.automation}% automation** with specialized oversight. Feel free to type queries regarding **ROI**, **risks**, or **jobs** below to observe how my strategic perspective shifts in real-time according to your simulated configuration!`;
  
  messages = [
    {
      id: 'welcome-init',
      sender: 'bot',
      text: welcomeText,
      timestamp: getCurrentTimeFormatted()
    }
  ];

  // 3. Render Sandbox
  updateUI();

  // 4. Bind DOM Handlers
  bindEventHandlers();
});

// Reset inputs in DOM physically
function resetRangeInputSlidersInDOM() {
  Object.keys(sliderVals).forEach(id => {
    const input = document.getElementById(`input-${id}`);
    if (input) {
      input.value = sliderVals[id];
    }
  });
}

// Get modern formatted string timestamp (e.g. 05:22 PM)
function getCurrentTimeFormatted() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Render markdown bullets or highlights elegantly to standard DOM safely
function formatMessageText(text) {
  return text.split('\n').map(line => {
    let rendered = line;
    // Bold matches (**text**)
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic matches (*text*)
    rendered = rendered.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return `<p style="margin-bottom: 0.5rem; text-align: justify;">${rendered}</p>`;
  }).join('');
}

// Recalculating mathematical averages + scores
function updateUI() {
  // A: Compute numerical average score
  const valuesArray = Object.values(sliderVals);
  const totalSum = valuesArray.reduce((acc, curr) => acc + curr, 0);
  const currentAverage = parseFloat((totalSum / CLUSTERS.length).toFixed(1));

  // B: Active scenario threshold router
  if (currentAverage <= 2.0) {
    activeScenario = 'S1';
  } else if (currentAverage <= 3.0) {
    activeScenario = 'S2';
  } else if (currentAverage <= 4.0) {
    activeScenario = 'S3';
  } else {
    activeScenario = 'S4';
  }

  const scenarioMeta = SCENARIO_DATA[activeScenario];

  // C: Check if a scenario shift welcoming text should trigger
  checkScenarioShift();

  // D: Sync Header elements
  const topBadgeEl = document.getElementById('active-scenario-badge');
  if (topBadgeEl) {
    topBadgeEl.textContent = `${activeScenario}: ${scenarioMeta.role}`;
  }

  // E: Sync Sidebar Elements (Range Values Labels, Tooltips, active styles)
  CLUSTERS.forEach(c => {
    const val = sliderVals[c.id];
    
    // Update value level text
    const lvlTextEl = document.getElementById(`val-lbl-${c.id}`);
    if (lvlTextEl) {
      lvlTextEl.textContent = `Lvl ${val}`;
    }

    // Toggle extreme highlighting
    const leftExtreme = document.getElementById(`extreme-l-${c.id}`);
    const rightExtreme = document.getElementById(`extreme-r-${c.id}`);
    if (leftExtreme) {
      if (val <= 2) leftExtreme.classList.add('slider-extreme-active');
      else leftExtreme.classList.remove('slider-extreme-active');
    }
    if (rightExtreme) {
      if (val >= 4) rightExtreme.classList.add('slider-extreme-active');
      else rightExtreme.classList.remove('slider-extreme-active');
    }

    // Toggle tooltips info structures
    const tooltipEl = document.getElementById(`tooltip-${c.id}`);
    if (tooltipEl) {
      if (activeTooltip === c.id) {
        tooltipEl.style.display = 'block';
      } else {
        tooltipEl.style.display = 'none';
      }
    }
  });

  // Highlight active preset button if applicable
  Object.keys(PRESETS).forEach(key => {
    const btn = document.getElementById(`preset-btn-${key}`);
    if (btn) {
      if (activeScenario === key) {
        btn.classList.add('preset-btn-active');
      } else {
        btn.classList.remove('preset-btn-active');
      }
    }
  });

  // F: Sync executive metrics / panels
  const displayRoleEl = document.getElementById('display-role');
  const displayDescEl = document.getElementById('display-desc');
  if (displayRoleEl) displayRoleEl.textContent = scenarioMeta.role;
  if (displayDescEl) displayDescEl.textContent = scenarioMeta.desc;

  // Percentage labels
  const statAutoEl = document.getElementById('stat-automation');
  const statIntegEl = document.getElementById('stat-integration');
  const statHumanEl = document.getElementById('stat-human');
  if (statAutoEl) statAutoEl.textContent = `${scenarioMeta.automation}%`;
  if (statIntegEl) statIntegEl.textContent = `${scenarioMeta.integration}%`;
  if (statHumanEl) statHumanEl.textContent = `${scenarioMeta.human}%`;

  // SWOT descriptions
  const swotSEl = document.getElementById('swot-s');
  const swotWEl = document.getElementById('swot-w');
  const swotOEl = document.getElementById('swot-o');
  const swotTEl = document.getElementById('swot-t');
  if (swotSEl) swotSEl.textContent = scenarioMeta.swot.s;
  if (swotWEl) swotWEl.textContent = scenarioMeta.swot.w;
  if (swotOEl) swotOEl.textContent = scenarioMeta.swot.o;
  if (swotTEl) swotTEl.textContent = scenarioMeta.swot.t;

  // Indicators Progress Bars
  const barTimeEl = document.getElementById('bar-time');
  const lblTimeEl = document.getElementById('lbl-time');
  if (barTimeEl && lblTimeEl) {
    barTimeEl.style.width = `${scenarioMeta.indicators.time}%`;
    lblTimeEl.textContent = `${scenarioMeta.indicators.time}%`;
  }

  const barGovEl = document.getElementById('bar-gov');
  const lblGovEl = document.getElementById('lbl-gov');
  if (barGovEl && lblGovEl) {
    barGovEl.style.width = `${scenarioMeta.indicators.gov}%`;
    lblGovEl.textContent = `${scenarioMeta.indicators.gov}%`;
  }

  const barRiskEl = document.getElementById('bar-risk');
  const lblRiskEl = document.getElementById('lbl-risk');
  if (barRiskEl && lblRiskEl) {
    barRiskEl.style.width = `${scenarioMeta.indicators.risk}%`;
    lblRiskEl.textContent = `${scenarioMeta.indicators.risk}%`;
  }

  // Config Average Score
  const avgScoreEl = document.getElementById('avg-score');
  if (avgScoreEl) {
    avgScoreEl.textContent = currentAverage;
  }

  // G: Sync Chat console states
  const chatAvatarEl = document.getElementById('chat-header-avatar');
  const chatNameEl = document.getElementById('chat-header-name');
  if (chatAvatarEl) chatAvatarEl.textContent = activeScenario;
  if (chatNameEl) chatNameEl.textContent = `AvaBot (${scenarioMeta.role})`;

  const footActiveScenarioEl = document.getElementById('footer-active-scenario');
  if (footActiveScenarioEl) footActiveScenarioEl.textContent = activeScenario;

  // H: Trigger message dialog stream redraw
  renderMessages();
}

// Sync scenario welcoming triggers
function checkScenarioShift() {
  if (lastScenario !== activeScenario) {
    const prevScenario = lastScenario;
    lastScenario = activeScenario;
    const scenarioMeta = SCENARIO_DATA[activeScenario];
    
    const scenarioAlertText = `⚡ **Model Configuration Altered!** I am now configured as the **${scenarioMeta.role}** (${activeScenario}). \n\n*Parameters updated:* \n📥 Automation Level: **${scenarioMeta.automation}%**\n🔌 System Integration: **${scenarioMeta.integration}%**\n👤 Human Supervision: **${scenarioMeta.human}%** \n\nHow can I compile insights on our deployment strategy under this specific profile? Try asking about **ROI**, **Security**, **Jobs**, or **Implementation Costs**!`;
    
    isTyping = true;
    renderMessages();

    if (window.scenarioShiftTimer) {
      clearTimeout(window.scenarioShiftTimer);
    }

    window.scenarioShiftTimer = setTimeout(() => {
      isTyping = false;
      messages.push({
        id: `scenario-shift-${Date.now()}`,
        sender: 'bot',
        text: scenarioAlertText,
        timestamp: getCurrentTimeFormatted()
      });
      renderMessages();
    }, 700);
  }
}

// Draw state messages inside historical dialog lists
function renderMessages() {
  const container = document.getElementById('chat-history');
  if (!container) return;

  let html = '';
  messages.forEach(msg => {
    const isBot = msg.sender === 'bot';
    if (isBot) {
      html += `
        <div class="chat-bubble-row row-bot">
          <div class="chat-row-avatar">${activeScenario}</div>
          <div class="chat-column-block">
            <div class="chat-bubble-body">
              ${formatMessageText(msg.text)}
            </div>
            <span class="chat-bubble-time">${msg.timestamp}</span>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="chat-bubble-row row-user">
          <div class="chat-column-block">
            <div class="chat-bubble-body">
              ${formatMessageText(msg.text)}
            </div>
            <span class="chat-bubble-time">${msg.timestamp}</span>
          </div>
        </div>
      `;
    }
  });

  if (isTyping) {
    html += `
      <div class="typing-bubble-block">
        <div class="typing-avatar">...</div>
        <div class="typing-card">
          <span class="typing-card-text">Consulting algorithms calculating</span>
          <div class="typing-dots-group">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
  
  // Auto-scroll logic
  container.scrollTop = container.scrollHeight;
}

// User Submission Resolver
function handleSendUserMessage(queryText) {
  const query = queryText.trim();
  if (!query) return;

  // Add user prompt
  messages.push({
    id: `user-${Date.now()}`,
    sender: 'user',
    text: query,
    timestamp: getCurrentTimeFormatted()
  });

  isTyping = true;
  renderMessages();

  // Thinking Delay simulation (700ms - 1500ms)
  const thinkingDelay = Math.random() * 800 + 700;
  
  setTimeout(() => {
    isTyping = false;
    
    const normalizedQuery = query.toLowerCase();
    const currentBank = QA_BANK[activeScenario] || [];
    let matchedAnswer = "";

    // Keyword scan matcher
    for (const entry of currentBank) {
      if (entry.keywords.some(kw => normalizedQuery.includes(kw))) {
        matchedAnswer = entry.answer;
        break;
      }
    }

    // Dynamic general feedback / suggestions
    if (!matchedAnswer) {
      if (normalizedQuery.includes("recommend") || normalizedQuery.includes("advice") || normalizedQuery.includes("help")) {
        const swotObj = SCENARIO_DATA[activeScenario].swot;
        matchedAnswer = `📋 **Strategic Recommendation for ${activeScenario}:** \nTo maximize performance, optimize the **${
          activeScenario === 'S1' ? 'AI Adoption' : activeScenario === 'S2' ? 'Human Role' : activeScenario === 'S3' ? 'Technology' : 'Governance'
        }** slider. Under this profile, your chief priority must be mitigating **${swotObj.w}** while capturing **${swotObj.o}**.`;
      } else {
        const fallbacks = {
          S1: "I am currently configured as an S1 Productivity Copilot. I can't access live corporate resources to answer that specific inquiry directly, but I'm ready to draft a summary template based on your provided parameters.",
          S2: "Under S2 (Hybrid Engagement), this request falls into intermediate analytical modeling. I can draft the project layout, but our governance rules require a human manager to certify and publish.",
          S3: "This is fully processed by our S3 Senior AI Architect integration arrays. I can run multi-regional outcome projections and prepare full file schemas. What specific variables should I map next?",
          S4: "As an S4 Closed-Loop Autonomous Node, I have initiated parallel cloud micro-tasks to resolve this immediately. Strategic outcomes will update on clients' dashboards dynamically."
        };
        matchedAnswer = fallbacks[activeScenario];
      }
    }

    messages.push({
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: matchedAnswer,
      timestamp: getCurrentTimeFormatted()
    });

    renderMessages();
  }, thinkingDelay);
}

// Preset activation selector
function selectPreset(presetKey) {
  const preset = PRESETS[presetKey];
  if (preset) {
    sliderVals = { ...preset.values };
    
    // set physical value
    Object.keys(sliderVals).forEach(id => {
      const input = document.getElementById(`input-${id}`);
      if (input) {
        input.value = sliderVals[id];
      }
    });

    updateUI();
  }
}

// Reset entire simulation prototype sandbox
function handleResetPrototype() {
  sliderVals = {
    adoption: 1,
    tech: 1,
    human: 1,
    cost: 1,
    business: 1,
    geopol: 1,
    gov: 1,
  };
  
  resetRangeInputSlidersInDOM();
  activeTooltip = null;
  lastScenario = 'S1';
  isTyping = false;

  messages = [
    {
      id: `reset-${Date.now()}`,
      sender: 'bot',
      text: `♻️ **Simulation Sandbox Restored.** sliders reset to foundational baseline (**1.0**). Standard **Productivity Assistant (S1)** mode active. Ask me about ROI, Risk safeguards, or operational staffing impact!`,
      timestamp: getCurrentTimeFormatted()
    }
  ];

  updateUI();
}

// Wipe entire messaging historical dialogues
function clearChatLogs() {
  const scenarioMeta = SCENARIO_DATA[activeScenario];
  messages = [
    {
      id: `clear-${Date.now()}`,
      sender: 'bot',
      text: `🧹 *Chat terminal history wiped.* Operating as your **${scenarioMeta.role}**. Send a prompt to query me!`,
      timestamp: getCurrentTimeFormatted()
    }
  ];
  renderMessages();
}

// Setup Event listeners & routing hooks
function bindEventHandlers() {
  // A: Live slider tracker range inputs
  CLUSTERS.forEach(c => {
    const input = document.getElementById(`input-${c.id}`);
    if (input) {
      input.addEventListener('input', (e) => {
        sliderVals[c.id] = parseInt(e.target.value);
        updateUI();
      });
    }

    // Info buttons (info tooltip toggle action)
    const infoBtn = document.getElementById(`info-btn-${c.id}`);
    if (infoBtn) {
      infoBtn.addEventListener('click', () => {
        if (activeTooltip === c.id) {
          activeTooltip = null;
        } else {
          activeTooltip = c.id;
        }
        updateUI();
      });
    }
  });

  // B: Demo Preset Blueprints buttons
  Object.keys(PRESETS).forEach(key => {
    const btn = document.getElementById(`preset-btn-${key}`);
    if (btn) {
      btn.addEventListener('click', () => {
        selectPreset(key);
      });
    }
  });

  // C: Global reset click triggers
  const topReset = document.getElementById('reset-btn-top');
  if (topReset) {
    topReset.addEventListener('click', handleResetPrototype);
  }

  const mobReset = document.getElementById('reset-btn-mob');
  if (mobReset) {
    mobReset.addEventListener('click', handleResetPrototype);
  }

  // D: Chat history wipe click trigger
  const clearHistBtn = document.getElementById('clear-history-btn');
  if (clearHistBtn) {
    clearHistBtn.addEventListener('click', clearChatLogs);
  }

  // E: Prompt form action tracker
  const form = document.getElementById('chat-form-ui');
  const inputField = document.getElementById('user-input-box');
  if (form && inputField) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputField.value;
      if (val.trim()) {
        handleSendUserMessage(val);
        inputField.value = '';
      }
    });
  }

  // F: Recommended Chips routing click hooks
  const recButtons = document.querySelectorAll('.rec-chip-btn');
  recButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      if (prompt) {
        handleSendUserMessage(prompt);
      }
    });
  });
}
