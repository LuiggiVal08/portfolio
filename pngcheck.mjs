import zlib from 'node:zlib';
import fs from 'node:fs';

function decodePNG(file) {
  const buf = fs.readFileSync(file);
  const sig = buf.subarray(0, 8);
  if (sig.toString('hex') !== '89504e470d0a1a0a') throw new Error('no PNG');
  let pos = 8, width = 0, height = 0, bitDepth, colorType, idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.subarray(pos + 4, pos + 8).toString('ascii');
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const bpp = channels * (bitDepth / 8);
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let inP = 0;
  const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
  for (let y = 0; y < height; y++) {
    const f = raw[inP++];
    const line = out.subarray(y * stride, (y + 1) * stride);
    const prev = out.subarray((y - 1) * stride, y * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? line[x - bpp] : 0;
      const b = y > 0 ? prev[x] : 0;
      const c = x >= bpp && y > 0 ? prev[x - bpp] : 0;
      let val = raw[inP++];
      if (f === 1) val = (val + a) & 255;
      else if (f === 2) val = (val + b) & 255;
      else if (f === 3) val = (val + ((a + b) >> 1)) & 255;
      else if (f === 4) val = (val + paeth(a, b, c)) & 255;
      line[x] = val;
    }
  }
  return { width, height, channels, out };
}

const img = decodePNG('/tmp/opencode/zoneB.png');
const { width, height, channels, out } = img;
// zonaB = scrollY 2800 en viewport 900. argos termina 2648; toon-memory empieza 2768
// rama feature toon: lado izquierdo del tronco? toon está en x=176-664 → featSide=+1 → rama en x=cardR+30=694
// Sub-ramas: f2 = 694+78 = 772
const toonCardR = 664, featLane = 664 + 30 + 1; // 695
const subLane = 664 + 30 + 78; // 772
function px(x, y) {
  const yi = Math.round(y) - 2800; // scroll
  if (yi < 0 || yi >= height) return null;
  const i = yi * width + Math.round(x);
  const base = i * channels;
  return [out[base], out[base + 1], out[base + 2]];
}
const samples = [];
// y absolutas dentro de toon (2768..3980): probar y=2900, 3200, 3500, 3800
for (const y of [2900, 3200, 3500, 3800]) {
  samples.push({ y, lane: px(featLane, y), sub: px(subLane, y), card: px(640, y), trunk: px(720, y) });
}
console.log(JSON.stringify({ width, height, samples }, null, 1));
