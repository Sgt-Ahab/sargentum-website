// Directory Consultation JS
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderForm();
});

function renderForm() {
  const formSection = document.getElementById('form-section');
  formSection.innerHTML = `
    <h2>Request Directory Consultation</h2>
    <form id="consult-form">
      <label>Project Description / Workflow</label>
      <textarea id="project-desc" rows="5" placeholder="Describe your project or workflow (e.g. Linear data processing pipeline for sensor logs)" required></textarea>

      <label>Naming Preferences (select all that apply)</label>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:8px;">
        <label><input type="checkbox" value="snake_case"> snake_case</label>
        <label><input type="checkbox" value="camelCase"> camelCase</label>
        <label><input type="checkbox" value="linear"> Linear expansion / numbering</label>
        <label><input type="checkbox" value="versioning"> Versioning (v1, _01, etc.)</label>
        <label><input type="checkbox" value="descriptive"> Descriptive prefixes</label>
      </div>

      <label>Optional: Existing Example Names (one per line)</label>
      <textarea id="examples" rows="3" placeholder="data_ingest\nprocess_step_1"></textarea>
      <p style="font-size:0.9rem; color:var(--muted); margin-top:8px;">
  <strong>Note:</strong> This is a basic concept tool. The process is intricate in function and will evolve with real agent feedback.</p>  
      <button type="submit">Get Suggestions</button>
    </form>
  `;

  document.getElementById('consult-form').addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const desc = document.getElementById('project-desc').value.trim();
  const examples = document.getElementById('examples').value.trim().split('\n').filter(Boolean);

  const prefs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                     .map(cb => cb.value);

  if (!desc) return alert("Please describe your project");

  const resultsSection = document.getElementById('results-section');
  resultsSection.style.display = 'block';

  // Simulate intelligent suggestions (rule-based for MVP)
  const suggestions = generateSuggestions(desc, prefs, examples);

  const humanHTML = `
    <p><strong>Project:</strong> ${desc}</p>
    <h3>Top Suggestions</h3>
    <ol>
      ${suggestions.map(s => `
        <li><strong>${s.name}</strong><br>
        → ${s.style}<br>
        <small>${s.reason}</small></li>
      `).join('')}
    </ol>
    <p><strong>Recommendation:</strong> ${suggestions[0].reason}</p>
  `;

  const jsonData = {
    suggestions: suggestions,
    recommendation: suggestions[0].reason,
    best_practices: [
      "Keep names descriptive but concise",
      "Use consistent casing across the entire project",
      "Add versioning or step numbers for expandable pipelines"
    ],
    timestamp: new Date().toISOString()
  };

  document.getElementById('human-result').innerHTML = humanHTML;
  document.getElementById('json-output').textContent = JSON.stringify(jsonData, null, 2);
}

function generateSuggestions(desc, prefs, examples) {
  const lowerDesc = desc.toLowerCase();
  const hasLinear = lowerDesc.includes('pipeline') || lowerDesc.includes('linear') || prefs.includes('linear');

  return [
    {
      name: hasLinear ? "data_process_step_01" : "project_main",
      style: prefs.includes('snake_case') ? "snake_case with numeric expansion" : "camelCase",
      reason: "Clear process prefix with consistent numbering for pipeline-style workflows"
    },
    {
      name: prefs.includes('versioning') ? "dataHandlerV1" : "core_ingest",
      style: "camelCase with optional versioning",
      reason: "Good for expandable systems that may add future modules"
    },
    {
      name: examples.length > 0 ? examples[0] + "_next" : "sensor_log_processor",
      style: "descriptive + consistent with your examples",
      reason: "Matches your existing naming patterns while remaining clear"
    }
  ];
}

function copyJSON() {
  const jsonText = document.getElementById('json-output').textContent;
  navigator.clipboard.writeText(jsonText).then(() => alert("JSON copied to clipboard"));
}