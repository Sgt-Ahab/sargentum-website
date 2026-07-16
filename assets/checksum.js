// Checksum Suite JS
let currentMode = 0; // 0 = Generate, 1 = Validate

function switchMode(mode) {
  currentMode = mode;
  document.getElementById('btn-generate').classList.toggle('ghost', mode !== 0);
  document.getElementById('btn-validate').classList.toggle('ghost', mode !== 1);
  renderForm();
}

function renderForm() {
  const formSection = document.getElementById('form-section');
  if (currentMode === 0) {
    formSection.innerHTML = `
      <h2>Generate Hash</h2>
      <p style="color:#f59e0b; margin: 8px 0; font-size: 12px;">
        <strong>Demo Mode:</strong> Results are computed in your browser. 
        The production x402 service will run server-side with better performance.
      </p>
      <form id="generate-form">
        <label style="padding-bottom: 10px;">Upload File</label><br>
        <input type="file" id="file-input" required style="padding-bottom: 10px;">
        <label style="padding-right: 5px;">Algorithm</label>
        <select id="algorithm">
            <option value="SHA-256">SHA-256 (recommended)</option>
            <option value="SHA-512">SHA-512</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-1">SHA-1 (legacy)</option>
        </select>
        <button type="submit">Generate</button>
      </form>
    `;
  } else {
    formSection.innerHTML = `
      <h2>Validate Hash</h2>
      <p style="color:#f59e0b; margin: 8px 0; font-size: 12px;">
        <strong>Demo Mode:</strong> Results are computed in your browser. 
        The production x402 service will run server-side with better performance.
      </p>
      <form id="validate-form">
        <label style="padding-bottom: 10px; padding-right: 10px;">Upload File</label>
        <input type="file" id="file-input" required style="padding-bottom: 10px;">
        <hr>
        <label>Expected Hash</label>
        <input type="text" id="expected-hash" placeholder="Paste expected hash" required>
        <label>Algorithm</label>
        <select id="algorithm">
            <option value="SHA-256">SHA-256 (recommended)</option>
            <option value="SHA-512">SHA-512</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-1">SHA-1 (legacy)</option>
        </select>
        <button type="submit">Validate</button>
      </form>
    `;
  }
  attachFormListeners();
}

function attachFormListeners() {
  const formId = currentMode === 0 ? 'generate-form' : 'validate-form';
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file");

  const algorithm = document.getElementById('algorithm').value;

  // Show loading...
  const results = document.getElementById('results-section');
  results.style.display = 'block';

  try {
    const hash = await computeHash(file, algorithm);
    const timestamp = new Date().toISOString();

    let humanHTML = '';
    let jsonData = {};

    if (currentMode === 0) {
      // Generate Mode
      humanHTML = `
        <p><strong>File:</strong> ${file.name}</p>
        <p><strong>Algorithm:</strong> ${algorithm}</p>
        <p><strong>Hash:</strong> <code>${hash}</code></p>
        <p style="font-size:0.9rem; color:#888; margin-top:10px;">
          <em>Demo result. Production version includes signed attestation.</em>
        </p>
      `;

      jsonData = {
        status: "success",
        mode: "generate",
        algorithm: algorithm.toLowerCase().replace("-", ""),
        hash: hash,
        file_size_bytes: file.size,
        timestamp: timestamp,
        attestation: {
          issuer: "sargentum.systems",
          signature: "0x_demo_signature_placeholder",
          note: "This is a demo attestation. The production service will return a real signed attestation. No file was retained."
        },
        message: "Hash generated successfully. Result is ephemeral."
      };
    } else {
      // Validate Mode
      const expected = document.getElementById('expected-hash').value.trim().toLowerCase();
      const isValid = hash.toLowerCase() === expected;

      humanHTML = `
        <p><strong>File:</strong> ${file.name}</p>
        <p><strong>Status:</strong> <span style="color:${isValid ? 'lime' : 'red'}">${isValid ? 'VALID' : 'INVALID'}</span></p>
        <p><strong>Computed:</strong> <code>${hash}</code></p>
        <p><strong>Expected:</strong> <code>${expected}</code></p>
        <p style="font-size:0.9rem; color:#888; margin-top:10px;">
          <em>Demo result. Production version includes signed attestation.</em>
        </p>
      `;

      jsonData = {
        status: isValid ? "match" : "mismatch",
        mode: "validate",
        algorithm: algorithm.toLowerCase().replace("-", ""),
        computed: hash,
        expected: expected,
        match: isValid,
        file_size_bytes: file.size,
        timestamp: timestamp,
        attestation: {
          issuer: "sargentum.systems",
          signature: "0x_demo_signature_placeholder",
          note: "This is a demo attestation. The production service will return a real signed attestation."
        },
        message: isValid ? "Checksum match confirmed." : "Checksum does not match."
      };
    }

    // Warning for weak algorithms
    if (algorithm === "SHA-1") {
      humanHTML += `<p style="color:orange; font-size:0.9rem; margin-top:8px;"><strong>Warning:</strong> SHA-1 is legacy and not recommended for security purposes.</p>`;
    }

    document.getElementById('human-result').innerHTML = humanHTML;
    document.getElementById('json-output').textContent = JSON.stringify(jsonData, null, 2);

  } catch (err) {
    alert("Error processing file: " + err.message);
  }
}

async function computeHash(file, algorithm) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function copyJSON() {
  const jsonText = document.getElementById('json-output').textContent;
  navigator.clipboard.writeText(jsonText).then(() => alert("JSON copied to clipboard"));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderForm();
});