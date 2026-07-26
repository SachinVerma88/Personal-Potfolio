export type HighlightLanguage = 'bash' | 'python' | 'ini' | 'text' | 'plaintext';

interface Token {
  type: 'keyword' | 'string' | 'comment' | 'function' | 'flag' | 'number' | 'plain';
  value: string;
}

const BASH_KEYWORDS = new Set(['if', 'then', 'else', 'fi', 'for', 'do', 'done', 'in', 'echo', 'sudo', 'cd', 'export']);

function tokenizeBash(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }
    if (line[i] === '-' && /[a-zA-Z]/.test(line[i + 1] ?? '')) {
      const match = line.slice(i).match(/^--?[a-zA-Z-]+/);
      if (match) {
        tokens.push({ type: 'flag', value: match[0] });
        i += match[0].length;
        continue;
      }
    }
    if (/["']/.test(line[i])) {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (/[a-zA-Z_]/.test(line[i])) {
      const match = line.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (match) {
        const word = match[0];
        tokens.push({
          type: BASH_KEYWORDS.has(word) ? 'keyword' : 'plain',
          value: word,
        });
        i += word.length;
        continue;
      }
    }
    tokens.push({ type: 'plain', value: line[i] });
    i++;
  }

  return tokens;
}

const PYTHON_KEYWORDS = new Set([
  'def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'import', 'from',
  'class', 'True', 'False', 'None', 'and', 'or', 'not', 'with', 'as', 'pass',
]);

function tokenizePython(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }
    if (/["']/.test(line[i])) {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (/[a-zA-Z_]/.test(line[i])) {
      const match = line.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (match) {
        const word = match[0];
        const nextChar = line[i + word.length];
        let type: Token['type'] = 'plain';
        if (PYTHON_KEYWORDS.has(word)) type = 'keyword';
        else if (nextChar === '(') type = 'function';
        tokens.push({ type, value: word });
        i += word.length;
        continue;
      }
    }
    if (/\d/.test(line[i])) {
      const match = line.slice(i).match(/^\d+/);
      if (match) {
        tokens.push({ type: 'number', value: match[0] });
        i += match[0].length;
        continue;
      }
    }
    tokens.push({ type: 'plain', value: line[i] });
    i++;
  }

  return tokens;
}

function tokenizeIni(line: string): Token[] {
  if (line.startsWith('[') && line.includes(']')) {
    return [{ type: 'keyword', value: line }];
  }
  if (line.trim().startsWith('#') || line.trim().startsWith(';')) {
    return [{ type: 'comment', value: line }];
  }
  const eqIndex = line.indexOf('=');
  if (eqIndex > 0) {
    return [
      { type: 'function', value: line.slice(0, eqIndex) },
      { type: 'plain', value: line.slice(eqIndex) },
    ];
  }
  return [{ type: 'plain', value: line }];
}

export function highlightCode(code: string, language: string): Token[][] {
  const lang = language.toLowerCase();
  const lines = code.split('\n');

  return lines.map((line) => {
    if (lang === 'python' || lang === 'py') return tokenizePython(line);
    if (lang === 'ini' || lang === 'systemd') return tokenizeIni(line);
    if (lang === 'bash' || lang === 'sh' || lang === 'shell') return tokenizeBash(line);
    return [{ type: 'plain', value: line }];
  });
}

export const TOKEN_CLASS: Record<Token['type'], string> = {
  keyword: 'text-sky-400',
  string: 'text-emerald-400',
  comment: 'text-zinc-500 italic',
  function: 'text-indigo-300',
  flag: 'text-amber-400',
  number: 'text-orange-300',
  plain: 'text-zinc-200',
};
