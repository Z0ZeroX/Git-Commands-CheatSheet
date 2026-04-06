#!/usr/bin/env node
/**
 * codesnap-gen: Generate CodeSnap-style PNG from a Markdown file
 * Usage: node scripts/generate-codesnap.js <input.md> [output.png] [--theme dark|light] [--title "Title"] [--line-numbers true|false] [--strip-fences true|false] [--exclude-lines 1,2] [--exclude-pattern "^```$"]
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── CLI Args ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    flags[args[i].slice(2)] = args[i + 1];
    i++;
  } else {
    positional.push(args[i]);
  }
}

const inputFile  = positional[0];
const outputFile = positional[1] || (inputFile ? inputFile.replace(/\.md$/, '.png') : 'output.png');
const theme      = (flags.theme || 'dark').toLowerCase();
const title      = flags.title || (inputFile ? path.basename(inputFile) : 'code.md');
const font       = flags.font || 'JetBrains Mono';
const fontSize   = parseInt(flags['font-size'] || '16', 10);
const maxCapture = parseInt(flags['max-capture'] || '16000', 10);
const showLineNumbers = (flags['line-numbers'] || 'false').toLowerCase() === 'true';
const stripFences = (flags['strip-fences'] || 'false').toLowerCase() === 'true';
const excludeLineSet = new Set(
  String(flags['exclude-lines'] || '')
    .split(',')
    .map((v) => parseInt(v.trim(), 10))
    .filter((n) => Number.isInteger(n) && n > 0)
);
const excludePattern = flags['exclude-pattern'] ? new RegExp(flags['exclude-pattern']) : null;

if (!inputFile || !fs.existsSync(inputFile)) {
  console.error('Usage: node scripts/generate-codesnap.js <input.md> [output.png] [--theme dark|light] [--title "My Title"] [--font-size 13] [--line-numbers true|false] [--strip-fences true|false] [--exclude-lines 1,2] [--exclude-pattern "^```$"]');
  process.exit(1);
}

const rawContent = fs.readFileSync(inputFile, 'utf8');

function filterContent(content) {
  const lines = content.split('\n');

  if (!stripFences && !excludeLineSet.size && !excludePattern) {
    return content;
  }

  return lines
    .filter((line, index) => {
      const lineNumber = index + 1;
      if (excludeLineSet.has(lineNumber)) return false;
      if (stripFences && /^```/.test(line.trim())) return false;
      if (excludePattern && excludePattern.test(line)) return false;
      return true;
    })
    .join('\n');
}

function resolveBrowserLaunchOptions() {
  const explicitPath =
    flags['executable-path'] ||
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    process.env.CHROME_PATH;

  if (explicitPath) {
    if (!fs.existsSync(explicitPath)) {
      throw new Error(`Browser executable not found at: ${explicitPath}`);
    }
    return { executablePath: explicitPath };
  }

  const candidates = [];
  if (process.platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || '';
    const programFiles = process.env['PROGRAMFILES'] || 'C:\\Program Files';
    const programFilesX86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';

    candidates.push(
      path.join(localAppData, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(programFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      path.join(programFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      path.join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe')
    );
  } else if (process.platform === 'darwin') {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    );
  } else {
    candidates.push(
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/opt/google/chrome/chrome'
    );
  }

  const foundPath = candidates.find((p) => p && fs.existsSync(p));
  if (foundPath) {
    return { executablePath: foundPath };
  }

  throw new Error(
    'No Chrome/Edge executable found. Install Chrome/Edge or pass --executable-path "<path-to-browser>".'
  );
}

// ─── Themes ─────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg:          '#0d1117',
    windowBg:    '#161b22',
    headerBg:    '#21262d',
    border:      '#30363d',
    text:        '#e6edf3',
    comment:     '#8b949e',
    keyword:     '#ff7b72',
    string:      '#a5d6ff',
    number:      '#79c0ff',
    tag:         '#7ee787',
    shadow:      'rgba(0,0,0,0.6)',
    dot1:        '#ff5f57',
    dot2:        '#ffbd2e',
    dot3:        '#28c840',
    lineNum:     '#3d444d',
    lineNumText: '#636e7b',
  },
  light: {
    bg:          '#dce8f5',
    windowBg:    '#ffffff',
    headerBg:    '#f5f5f5',
    border:      '#d0d7de',
    text:        '#24292f',
    comment:     '#6e7781',
    keyword:     '#cf222e',
    string:      '#0a3069',
    number:      '#0550ae',
    tag:         '#116329',
    shadow:      'rgba(0,0,0,0.15)',
    dot1:        '#ff5f57',
    dot2:        '#ffbd2e',
    dot3:        '#28c840',
    lineNum:     '#d0d7de',
    lineNumText: '#8c959f',
  },
};

const t = themes[theme] || themes.dark;

// ─── Token-based highlighter for shell/git commands ────────────────────────
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(cls, text) {
  return `<span class="${cls}">${esc(text)}</span>`;
}

function tokenizeRest(str, tokens) {
  let i = 0;
  let buf = '';

  const flush = () => {
    if (buf) {
      tokens.push({ type: 'text', val: buf });
      buf = '';
    }
  };

  while (i < str.length) {
    const ch = str[i];

    if (ch === '"') {
      flush();
      let j = i + 1;
      while (j < str.length && str[j] !== '"') j++;
      tokens.push({ type: 'string', val: str.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    if (ch === '<') {
      flush();
      let j = i + 1;
      while (j < str.length && str[j] !== '>') j++;
      tokens.push({ type: 'placeholder', val: str.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    const next = str[i + 1] || '';
    if (ch === '-' && (next === '-' || /\w/.test(next))) {
      flush();
      let j = i;
      while (j < str.length && str[j] === '-') j++;
      while (j < str.length && /[\w-]/.test(str[j])) j++;
      tokens.push({ type: 'flag', val: str.slice(i, j) });
      i = j;
      continue;
    }

    buf += ch;
    i++;
  }

  flush();
}

function tokenizeGitLine(raw) {
  let codeRaw = raw;
  let commentRaw = '';
  const cm = raw.match(/^((?:[^#"<]|"[^"]*"|<[^>]*>)*)((?:\s+#.*)?)$/);
  if (cm) {
    codeRaw = cm[1];
    commentRaw = cm[2] || '';
  }

  const tokens = [];
  const m = codeRaw.match(/^(\s*)(git)(\s+)(\S+)(.*)$/s);
  if (m) {
    const [, indent, git, sp, sub, rest] = m;
    if (indent) tokens.push({ type: 'text', val: indent });
    tokens.push({ type: 'keyword', val: git });
    tokens.push({ type: 'text', val: sp });
    tokens.push({ type: 'subcommand', val: sub });
    tokenizeRest(rest, tokens);
  } else {
    tokens.push({ type: 'text', val: codeRaw });
  }

  if (commentRaw) tokens.push({ type: 'comment', val: commentRaw });
  return tokens;
}

function highlight(line) {
  if (/^\s*#/.test(line)) {
    if (/^#+\s*---/.test(line.trim()) || /^#+\s*={3,}/.test(line.trim())) {
      return span('section', line);
    }
    return span('comment', line);
  }

  if (/^={5,}\s*$/.test(line.trim())) {
    return span('separator', line);
  }

  if (/^\s*git\s/.test(line)) {
    return tokenizeGitLine(line)
      .map((tk) => (tk.type === 'text' ? esc(tk.val) : span(tk.type, tk.val)))
      .join('');
  }

  return esc(line);
}

// ─── Build HTML ─────────────────────────────────────────────────────────────
function buildHTML(content) {
  const lines = content.split('\n');
  const totalLines = lines.length;
  const lineNumWidth = String(totalLines).length;

  const linesHtml = lines.map((line, i) => {
    const num = String(i + 1).padStart(lineNumWidth, ' ');
    const highlighted = highlight(line);
    if (showLineNumbers) {
      return `<div class="line"><span class="ln">${num}</span><span class="lc">${highlighted}</span></div>`;
    }
    return `<div class="line"><span class="lc">${highlighted}</span></div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: ${t.bg};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 40px;
    min-height: 100vh;
    font-family: '${font}', 'Fira Code', 'Cascadia Code', monospace;
  }

  .window {
    background: ${t.windowBg};
    border: 1px solid ${t.border};
    border-radius: 12px;
    box-shadow: 0 24px 64px ${t.shadow}, 0 4px 16px ${t.shadow};
    overflow: hidden;
    width: 760px;
  }

  .header {
    background: ${t.headerBg};
    border-bottom: 1px solid ${t.border};
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .dots {
    display: flex;
    gap: 7px;
    flex-shrink: 0;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot.red    { background: ${t.dot1}; }
  .dot.yellow { background: ${t.dot2}; }
  .dot.green  { background: ${t.dot3}; }

  .filename {
    color: ${t.comment};
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.03em;
    flex: 1;
    text-align: center;
  }

  .code-wrap {
    padding: 20px 18px;
    overflow-x: auto;
  }

  .line {
    display: flex;
    align-items: flex-start;
    padding: 1px 8px;
    font-size: ${fontSize}px;
    line-height: 1.65;
    white-space: pre;
  }

  .line:hover {
    background: rgba(255,255,255,0.03);
  }

  .ln {
    color: ${t.lineNumText};
    border-right: 1px solid ${t.lineNum};
    padding-right: 16px;
    margin-right: 20px;
    user-select: none;
    min-width: ${lineNumWidth * fontSize * 0.62 + 32}px;
    text-align: right;
    flex-shrink: 0;
    font-size: ${fontSize - 1}px;
    opacity: 0.7;
  }

  ${showLineNumbers ? '' : '.ln { display: none; }'}

  .lc {
    color: ${t.text};
    flex: 1;
  }

  /* Syntax colors */
  .comment   { color: ${t.comment}; font-style: italic; }
  .separator { color: ${t.lineNumText}; }
  .section   { color: ${t.tag}; font-weight: bold; }
  .keyword   { color: ${t.keyword}; font-weight: bold; }
  .subcommand{ color: #d2a8ff; }
  .flag      { color: ${t.number}; }
  .string    { color: ${t.string}; }
  .placeholder { color: #ffa657; }

  .footer {
    background: ${t.headerBg};
    border-top: 1px solid ${t.border};
    padding: 8px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;
  }

  .badge {
    font-size: 10px;
    color: ${t.comment};
    opacity: 0.6;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
<div class="window">
  <div class="header">
    <div class="dots">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
    </div>
    <div class="filename">${title}</div>
    <div style="width:44px"></div>
  </div>
  <div class="code-wrap">
${linesHtml}
  </div>
</div>
</body>
</html>`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`Reading: ${inputFile}`);
  console.log(`Theme:   ${theme}`);
  console.log(`Output:  ${outputFile}`);

  const html = buildHTML(filterContent(rawContent));

  // Write temp HTML for debugging (optional)
  const tmpHtml = outputFile.replace(/\.png$/, '.debug.html');
  fs.writeFileSync(tmpHtml, html);

  const launchTarget = resolveBrowserLaunchOptions();
  console.log(`Browser: ${launchTarget.executablePath}`);

  const browser = await puppeteer.launch({
    ...launchTarget,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Auto-size to content
  const dims = await page.evaluate(() => {
    const win = document.querySelector('.window');
    const body = document.body;
    return {
      width:  body.scrollWidth,
      height: body.scrollHeight,
    };
  });

  if (dims.width > maxCapture || dims.height > maxCapture) {
    const scale = Math.min(maxCapture / dims.width, maxCapture / dims.height);
    console.log(`Content too large (${dims.width}x${dims.height}), scaling to ${(scale * 100).toFixed(1)}%`);
    await page.evaluate((s) => {
      document.body.style.zoom = String(s);
    }, scale);
  }

  const finalDims = await page.evaluate(() => ({
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
  }));

  await page.setViewport({
    width: Math.max(1, finalDims.width + 1),
    height: Math.max(1, finalDims.height + 1),
    deviceScaleFactor: 1,
  });

  await page.screenshot({
    path: outputFile,
    fullPage: true,
  });

  await browser.close();

  // Cleanup debug html
  fs.unlinkSync(tmpHtml);

  console.log(`Done! Saved to: ${outputFile}`);
})();