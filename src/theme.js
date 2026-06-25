export const COLORS = {
  bg: '#0E1217',
  card: '#161D26',
  cardInner: '#141A22',
  cardDark: '#0F141A',
  accent: '#57C99A',
  accentDim: 'rgba(87,201,154,.10)',
  accentBorder: 'rgba(87,201,154,.22)',
  gold: '#E0B15E',
  goldDim: 'rgba(224,177,94,.08)',
  text: '#F3EFE6',
  textSoft: '#E2E6EC',
  textMid: '#C9D2DC',
  textMuted: '#9AA4B0',
  textDim: '#8B96A3',
  textFaint: '#7E8896',
  textGhost: '#646E7A',
  textShadow: '#5A646F',
  border: '#242C37',
  borderDim: '#1F2832',
  divider: 'rgba(255,255,255,.05)',
  hk: '#E0B15E',
  sz: '#6FB98F',
  st: '#E8765A',
  cz: '#9DBE6E',
  jy: '#6BA3CF',
  warn: '#E8765A',
  warnBg: 'rgba(232,118,90,.07)',
  infoBg: 'rgba(224,177,94,.07)',
};

export const fontStack = "'Noto Serif SC', Georgia, serif";
export const sansStack = "'Noto Sans SC', sans-serif";
export const monoStack = "'Space Mono', monospace";

export const EMOJI_MAP = {
  "✈️": "flight", "\u{1F684}": "train",
  "\u{1F39F}️": "confirmation_number", "\u{1F3AD}": "theater_comedy",
  "\u{1F3A8}": "palette", "\u{1F35C}": "ramen_dining",
  "\u{1F37D}️": "restaurant", "\u{1F95F}": "brunch_dining",
  "\u{1F305}": "wb_twilight", "\u{1F303}": "nightlife",
  "\u{1F319}": "bedtime", "\u{1F634}": "snooze",
  "❄️": "ac_unit", "\u{1F525}": "local_fire_department",
  "\u{1F9CA}": "icecream", "\u{1F697}": "directions_car",
  "\u{1F6B6}": "directions_walk", "\u{1F9F3}": "luggage",
  "\u{1F3E8}": "hotel", "\u{1F381}": "redeem",
  "\u{1F4A1}": "tips_and_updates", "⚠️": "warning",
  "\u{1F44D}": "thumb_up", "✅": "check_circle",
  "\u{1F969}": "outdoor_grill", "\u{1F990}": "set_meal",
  "\u{1FABF}": "restaurant", "\u{1F34A}": "nutrition",
  "\u{1F9AA}": "dinner_dining",
};

export function parseLeadingEmoji(str) {
  if (!str) return { icon: null, text: str };
  const m = str.match(
    /^((?:\p{Extended_Pictographic}(?:️)?(?:‍\p{Extended_Pictographic}(?:️)?)*)|(?:\p{Regional_Indicator}{2}))[\s]*/u
  );
  if (!m) return { icon: null, text: str };
  const emo = m[1];
  const icon = EMOJI_MAP[emo] || EMOJI_MAP[emo.replace("️", "")] || null;
  return { icon, text: str.slice(m[0].length) };
}
