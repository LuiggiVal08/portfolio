import zlib from 'node:zlib';
import fs from 'node:fs';
function decodePNG(file) {
  const buf = fs.readFileSync(file);
  let pos = 8, width = 0, height = 0, bitDepth, colorType, idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.subarray(pos + 4, pos + 8).toString('ascii');
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
    else if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const channels = colorType === 6 ? 4 : 3;
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let inP = 0;
  const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
  for (let y = 0; y < height; y++) {
    const f = raw[inP++];
    const line = out.subarray(y * stride, (y + 1) * stride);
    const prev = out.subarray((y - 1) * stride, y * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? line[x - channels] : 0;
      const b = y > 0 ? prev[x] : 0;
      const c = x >= channels && y > 0 ? prev[x - channels] : 0;
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
// zonaB: scrollY=2800. Filas del artículo toon (2768..3980 abs). Barrer x=170..1300 a y abs 3200 (row 400)
function scanRow(yAbs, label) {
  const yi = Math.round(yAbs) - 2800;
  if (yi < 0 || yi >= height) { console.log(label, 'fuera'); return; }
  const hits = [];
  for (let x = 170; x < 1300; x++) {
    const i = (yi * width + x) * channels;
    const r = out[i], g = out[i + 1], b = out[i + 2];
    if (g > 120 && b > 120 && r < 120) hits.push({ x, rgb: [r, g, b] });
  }
  // agrupar contiguos
  const groups = [];
  hits.forEach(h => {
    const last = groups[groups.length - 1];
    if (last && h.x - last.x1 <= 3) last.x1 = h.x;
    else groups.push({ x0: h.x, x1: h.x });
  });
  console.log(label, '→', JSON.stringify(groups.slice(0, 12)));
}
scanRow(2900, 'y2900');
scanRow(3200, 'y3200');
scanRow(3500, 'y3500');
scanRow(3800, 'y3800');
