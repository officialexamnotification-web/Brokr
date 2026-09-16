import { FontTransformation } from '../types';

// Helper for Unicode range mapping
function mapChars(text: string, mapObj: Record<string, string>): string {
  return text
    .split('')
    .map(char => mapObj[char] || char)
    .join('');
}

// 1. Fraktur / Gothic Bold
const gothicBoldMap: Record<string, string> = {
  a: '𝖆', b: '𝖇', c: '𝖈', d: '𝖉', e: '𝖊', f: '𝖋', g: '𝖌', h: '𝖍', i: '𝖎', j: '𝖏', k: '𝖐', l: '𝖑', m: '𝖒',
  n: '𝖓', o: '𝖔', p: '𝖕', q: '𝖖', r: '𝖗', s: '𝖘', t: '𝖙', u: '𝖚', v: '𝖛', w: '𝖜', x: '𝖝', y: '𝖞', z: '𝖟',
  A: '𝕬', B: '𝕭', C: '𝕮', D: '𝕯', E: '𝕰', F: '𝕱', G: '𝕲', H: '𝕳', I: '𝕴', J: '𝕵', K: '𝕶', L: '𝕷', M: '𝕸',
  N: '𝕹', O: '𝕺', P: '𝕻', Q: '𝕼', R: '𝕽', S: '𝕾', T: '𝕿', U: '𝖀', V: '𝖁', W: '𝖂', X: '𝖃', Y: '𝖄', Z: '𝖅',
};

// 2. Fraktur Regular
const gothicRegularMap: Record<string, string> = {
  a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪',
  n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷',
  A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐',
  N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ',
};

// 3. Sans-Serif Bold (Esports Pro)
const boldSansMap: Record<string, string> = {
  a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺',
  n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
  A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠',
  N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
  '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵',
};

// 4. Serif Bold
const boldSerifMap: Record<string, string> = {
  a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦',
  n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
  A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌',
  N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙',
  '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗',
};

// 5. Script / Cursive Bold
const scriptBoldMap: Record<string, string> = {
  a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶',
  n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃',
  A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜',
  N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩',
};

// 6. Double-Struck / Blackboard Bold
const doubleStruckMap: Record<string, string> = {
  a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕏', k: '𝕜', l: '𝕝', m: '𝕞',
  n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫',
  A: '𝔸', B: '𝔹', C: 'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾', H: 'ℍ', I: '𝕀', J: '𝕁', K: '𝕂', L: '𝕃', M: '𝕄',
  N: 'ℕ', O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋', U: '𝕌', V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ',
  '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡',
};

// 7. Small Caps (commonly supported; live-client support can vary)
const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ',
  n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ',
  N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ',
};

// 8. Circled Normal
const circledMap: Record<string, string> = {
  a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ',
  n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ',
  A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ',
  N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ',
  '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
};

// 9. Inverted Dark Bubble
const invertedCircledMap: Record<string, string> = {
  a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖', h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜',
  n: '🅝', o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤', v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
  A: '🅐', B: '🅑', C: '🅒', D: '🅓', E: '🅔', F: '🅕', G: '🅖', H: '🅗', I: '🅘', J: '🅙', K: '🅚', L: '🅛', M: '🅜',
  N: '🅝', O: '🅞', P: '🅟', Q: '🅠', R: '🅡', S: '🅢', T: '🅣', U: '🅤', V: '🅥', W: '🅦', X: '🅧', Y: '🅨', Z: '🅩',
  '0': '⓿', '1': '❶', '2': '❷', '3': '❸', '4': '❹', '5': '❺', '6': '❻', '7': '❼', '8': '❽', '9': '❾',
};

// 10. Squared Boxed
const squaredMap: Record<string, string> = {
  a: '🄐', b: '🄑', c: '🄒', d: '🄓', e: '🄔', f: '🄕', g: '🄖', h: '🄗', i: '🄘', j: '🄙', k: '🄚', l: '🄛', m: '🄜',
  n: '🄝', o: '🄞', p: '🄟', q: '🄠', r: '🄡', s: '🄢', t: '🄣', u: '🄤', v: '🄥', w: '🄦', x: '🄧', y: '🄨', z: '🄩',
  A: '🄰', B: '🄱', C: '🄲', D: '🄳', E: '🄴', F: '🄵', G: '🄶', H: '🄷', I: '🄸', J: '🄹', K: '🄺', L: '🄻', M: '🄼',
  N: '🄽', O: '🄾', P: '🄿', Q: '🅀', R: '🅁', S: '🅂', T: '🅃', U: '🅄', V: '🅅', W: '🅆', X: '🅇', Y: '🅈', Z: '🅉',
};

// 11. Monospace / Typewriter
const monospaceMap: Record<string, string> = {
  a: '𝚖', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖',
  n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
  A: '𝙼', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼',
  N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
};

// 12. Fullwidth (Vaporwave)
const fullwidthMap: Record<string, string> = {
  a: 'ａ', b: 'ｂ', c: 'ｃ', d: 'ｄ', e: 'ｅ', f: 'ｆ', g: 'ｇ', h: 'ｈ', i: 'ｉ', j: 'ｊ', k: 'ｋ', l: 'ｌ', m: 'ｍ',
  n: 'ｎ', o: 'ｏ', p: 'ｐ', q: 'ｑ', r: 'ｒ', s: 'ｓ', t: 'ｔ', u: 'ｕ', v: 'ｖ', w: 'ｗ', x: 'ｘ', y: 'ｙ', z: 'ｚ',
  A: 'Ａ', B: 'Ｂ', C: 'Ｃ', D: 'Ｄ', E: 'Ｅ', F: 'Ｆ', G: 'Ｇ', H: 'Ｈ', I: 'Ｉ', J: 'Ｊ', K: 'Ｋ', L: 'Ｌ', M: 'Ｍ',
  N: 'Ｎ', O: 'Ｏ', P: 'Ｐ', Q: 'Ｑ', R: 'Ｒ', S: 'Ｓ', T: 'Ｔ', U: 'Ｕ', V: 'Ｖ', W: 'Ｗ', X: 'Ｘ', Y: 'Ｙ', Z: 'Ｚ',
  '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
};

// 13. Superscript
const superscriptMap: Record<string, string> = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
  n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  A: 'ᴬ', B: 'ᴮ', D: 'ᴰ', E: 'ᴱ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ',
  O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', T: 'ᵀ', U: 'ᵁ', W: 'ᵂ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼',
};

// Upside Down
const upsideDownMap: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ',
  n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W',
  N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
};

function strikeThrough(text: string): string {
  return text.split('').join('\u0336') + '\u0336';
}
function slashThrough(text: string): string {
  return text.split('').join('\u0337') + '\u0337';
}
function underlineText(text: string): string {
  return text.split('').join('\u0332') + '\u0332';
}
function spacedText(text: string): string {
  return text.split('').join(' ');
}
function invertedUpsideDown(text: string): string {
  return text.split('').reverse().map(c => upsideDownMap[c] || c).join('');
}

export const FONT_TRANSFORMATIONS: FontTransformation[] = [
  // Esports / Pro Styles
  {
    id: 'gothic-bold',
    name: 'Gothic Pro',
    category: 'esports',
    badge: 'Trending',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, gothicBoldMap),
  },
  {
    id: 'gothic-regular',
    name: 'Medieval Knight',
    category: 'gothic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, gothicRegularMap),
  },
  {
    id: 'bold-sans',
    name: 'Esports Heavy',
    category: 'esports',
    badge: 'Popular',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => mapChars(t, boldSansMap),
  },
  {
    id: 'small-caps',
    name: 'Tactical Small Caps',
    category: 'esports',
    badge: 'Common',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => mapChars(t, smallCapsMap),
  },
  {
    id: 'double-struck',
    name: 'Blackboard Royal',
    category: 'fancy',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, doubleStruckMap),
  },
  {
    id: 'script-bold',
    name: 'Cursive Assassin',
    category: 'aesthetic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: false },
    transform: (t) => mapChars(t, scriptBoldMap),
  },
  {
    id: 'monospace',
    name: 'Cyber Hacker',
    category: 'minimal',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => mapChars(t, monospaceMap),
  },
  {
    id: 'fullwidth',
    name: 'Vaporwave Wide',
    category: 'aesthetic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => mapChars(t, fullwidthMap),
  },
  {
    id: 'superscript',
    name: 'High KD Superscript',
    category: 'fancy',
    badge: 'PUBG',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, superscriptMap),
  },
  {
    id: 'inverted-dark',
    name: 'Dark Inverted Orbs',
    category: 'boxed',
    badge: 'Clean',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, invertedCircledMap),
  },
  {
    id: 'circled',
    name: 'White Circled Badges',
    category: 'boxed',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, circledMap),
  },
  {
    id: 'squared',
    name: 'Clan Bracket Square',
    category: 'boxed',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, squaredMap),
  },
  {
    id: 'bold-serif',
    name: 'Godfather Serif',
    category: 'gothic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => mapChars(t, boldSerifMap),
  },
  {
    id: 'upside-down',
    name: 'Inverted Matrix',
    category: 'funky',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => invertedUpsideDown(t),
  },
  {
    id: 'slashed',
    name: 'Slashed Cyber',
    category: 'funky',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => slashThrough(t),
  },
  {
    id: 'strikethrough',
    name: 'Ghost Strike',
    category: 'funky',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => strikeThrough(t),
  },
  {
    id: 'underline',
    name: 'Underline Operator',
    category: 'minimal',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => underlineText(t),
  },
  {
    id: 'spaced',
    name: 'Aesthetic Spaced',
    category: 'aesthetic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => spacedText(t),
  },

  // Ornate Gamer Wrappers
  {
    id: 'crown-emperor',
    name: 'Crown Emperor 亗',
    category: 'esports',
    badge: 'Test',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `亗 ${mapChars(t, boldSansMap)} 亗`,
  },
  {
    id: 'wings-angel',
    name: 'Phoenix Wings ꧁༺',
    category: 'fancy',
    badge: 'Legendary',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `꧁༺${t}༻꧂`,
  },
  {
    id: 'wings-gothic',
    name: 'Dark Angel Wings',
    category: 'gothic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: false },
    transform: (t) => `꧁༺${mapChars(t, gothicBoldMap)}༻꧂`,
  },
  {
    id: 'cross-knight',
    name: 'Vatican Cross ☬✞',
    category: 'gothic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `ঔৣ☬✞${mapChars(t, boldSansMap)}✞☬ঔৣ`,
  },
  {
    id: 'star-comet',
    name: 'Shooting Star ★彡',
    category: 'esports',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `★彡${t}彡★`,
  },
  {
    id: 'evil-smile',
    name: 'Sweaty Demon ╰‿╯',
    category: 'esports',
    badge: 'Free Fire',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `╰‿╯ ${mapChars(t, smallCapsMap)} ╰‿╯`,
  },
  {
    id: 'clan-shime',
    name: 'Esports Clan 〆',
    category: 'esports',
    badge: 'Test',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `〆${mapChars(t, boldSansMap)}〆`,
  },
  {
    id: 'clan-slash-x',
    name: 'Cross Blades 乂',
    category: 'esports',
    badge: 'Test',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `乂 ${mapChars(t, smallCapsMap)} 乂`,
  },
  {
    id: 'lightning-volt',
    name: 'Thunderbolt ⚡',
    category: 'esports',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `⚡${mapChars(t, boldSansMap)}⚡`,
  },
  {
    id: 'skull-reaper',
    name: 'Grim Reaper ☠️',
    category: 'gothic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `☠️ ${mapChars(t, gothicBoldMap)} ☠️`,
  },
  {
    id: 'sniper-crosshair',
    name: 'Sniper Scope ⌖',
    category: 'esports',
    badge: 'Valorant/COD',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => `⌖ ${mapChars(t, boldSansMap)} ⌖`,
  },
  {
    id: 'japanese-samurai',
    name: 'Tokyo Samurai 侍',
    category: 'aesthetic',
    badge: 'Anime',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => `侍・${mapChars(t, smallCapsMap)}・死`,
  },
  {
    id: 'japanese-demon',
    name: 'Akuma Demon 鬼',
    category: 'aesthetic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: true, cod: true },
    transform: (t) => `鬼 厄 ${mapChars(t, boldSansMap)} 厄 鬼`,
  },
  {
    id: 'aesthetic-flower',
    name: 'Sakura Blossom ✿',
    category: 'aesthetic',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: false },
    transform: (t) => `✿ ${mapChars(t, scriptBoldMap)} ✿`,
  },
  {
    id: 'duo-heart',
    name: 'Soulmate Duo 𓆩♡𓆪',
    category: 'aesthetic',
    badge: 'Duo',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `𓆩♡𓆪 ${mapChars(t, smallCapsMap)} 𓆩♡𓆪`,
  },
  {
    id: 'shield-guardian',
    name: 'Iron Aegis 𓊈𓊉',
    category: 'esports',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `𓊈${mapChars(t, boldSansMap)}𓊉`,
  },
  {
    id: 'brackets-esports',
    name: 'Pro Bracket 『 』',
    category: 'esports',
    badge: 'Test',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `『${mapChars(t, boldSansMap)}』`,
  },
  {
    id: 'brackets-box',
    name: 'Heavy Box 【 】',
    category: 'esports',
    badge: 'Test',
    gameCompatibility: { bgmi: true, freeFire: true, valorant: false, cod: true },
    transform: (t) => `【${mapChars(t, boldSansMap)}】`,
  },
];
