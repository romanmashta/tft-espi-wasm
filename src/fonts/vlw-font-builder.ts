import fontkit, {BBOX, create, Font, Glyph, GlyphRun} from "fontkit";
import {createCanvas} from "canvas";
// @ts-ignore
import binutils from "binutils64";

type uint32_t = number;
type uint16_t = number;
type uint8_t = number;

type VlwFontHeader = {
  numGlyphs: uint32_t;
  version: uint32_t;
  pointSize: uint32_t;
  mboxY: uint32_t; // Ignore
  ascent: uint32_t;
  descent: uint32_t;
}

type VlwGlyphHeader = {
  codePoint: uint32_t;
  height: uint32_t;
  width: uint32_t;
  xAdvance: uint32_t;   // x advance to next character position
  topExtent: uint32_t;  // glyph y offset from baseline
  leftExtent: uint32_t; // glyph x offset from cursor
  c_ptr: uint32_t;		 // Ignore
  glyph: Glyph;
};

type VlwFont = {
  header: VlwFontHeader;
  glyphs: VlwGlyphHeader[];
  data: uint8_t[];
  namelen: uint16_t;
  name: string;
  psnamelen: uint16_t;
  psname: string;
  smooth: uint8_t;
}
const scaleBounds = (box: BBOX, scale: number, padding: number = 1): BBOX => (
  {
    minX: Math.round(box.minX * scale) - padding,
    minY: Math.round(box.minY * scale) - padding,
    maxX: Math.round(box.maxX * scale) + padding,
    maxY: Math.round(box.maxY * scale) + padding,
    width: Math.round(box.width * scale) + 2 * padding,
    height: Math.round(box.height * scale) + 2 * padding
  }
)

export const BasicLatinRange = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function getHeader(run: GlyphRun, fontSize: number, font: Font, scale: number) {
  const header: VlwFontHeader = {
    numGlyphs: run.glyphs.length,
    version: 1,
    pointSize: fontSize,
    mboxY: 0,
    ascent: Math.round(font.ascent * scale),
    descent: Math.abs(Math.round(font.descent * scale))
  }
  return header;
}

function getGlyphs(run: GlyphRun, descend: number, scale: number) {
  const glyphs: VlwGlyphHeader[] = run.glyphs.map(glyph => {
    const bbox = scaleBounds(glyph.bbox, scale);
    return {
      codePoint: glyph.codePoints[0],
      height: bbox.height,
      width: bbox.width,
      xAdvance: Math.round(glyph.advanceWidth * scale),
      topExtent:  bbox.maxY,
      leftExtent: bbox.minX,
      c_ptr: 0,
      glyph
    }
  });
  return glyphs;
}

const CANVAS_SIZE = 256;

function buildBitmaps(font: Font, glyphs: VlwGlyphHeader[], descend: number, fontSize: number) : uint8_t[] {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  const ctx = canvas.getContext('2d');
  const result = [];

  ctx.antialias = 'subpixel';

  for(let i = 0; i < glyphs.length; i++) {
    const header = glyphs[i];
    const baseline = - header.topExtent;

    ctx.resetTransform();
    // Clear canvas
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


    ctx.scale(1, -1);
    ctx.translate(-header.leftExtent, baseline);

    const glyph = glyphs[i].glyph;
    ctx.strokeStyle = 'none';
    ctx.fillStyle = 'black';
    glyph.render(ctx as any, fontSize);
    ctx.stroke();

    //commit canvas to 8-bit grayscale array
    const glyphData = ctx.getImageData(0, 0, header.width, header.height);
    for (let j = 0; j < glyphData.data.length; j += 4) {
      const alpha = 255 - glyphData.data[j];
      result.push(alpha);
    }
  }
  return result;
}

export const buildVlwFontData = (font: Font, fontSize: number, range: string = BasicLatinRange): VlwFont => {
  var run = font.layout(range);
  const scale = 1 / font.unitsPerEm * fontSize;
  const header = getHeader(run, fontSize, font, scale);
  const glyphs = getGlyphs(run, header.descent, scale);
  const data = buildBitmaps(font, glyphs, header.descent, fontSize);

  return {
    header,
    glyphs,
    data,
    namelen: font.familyName.length,
    name: font.familyName,
    psnamelen: font.postscriptName.length,
    psname: font.postscriptName,
    smooth: 1
  }
}

export const buildVlwFont = (fontData: Buffer, fontSize: number, range: string = BasicLatinRange): uint8_t[] => {
  var font = fontkit.create(fontData);
  const vlwFont = buildVlwFontData(font, fontSize, range);
  const writer = new binutils.BinaryWriter();

  // Write header
  writer.WriteInt32(vlwFont.header.numGlyphs);
  writer.WriteInt32(vlwFont.header.version);
  writer.WriteInt32(vlwFont.header.pointSize);
  writer.WriteInt32(vlwFont.header.mboxY);
  writer.WriteInt32(vlwFont.header.ascent);
  writer.WriteInt32(vlwFont.header.descent);

  // Write glyphs
  for(let i = 0; i < vlwFont.glyphs.length; i++) {
    const glyph = vlwFont.glyphs[i];
    writer.WriteInt32(glyph.codePoint);
    writer.WriteInt32(glyph.height);
    writer.WriteInt32(glyph.width);
    writer.WriteInt32(glyph.xAdvance);
    writer.WriteInt32(glyph.topExtent);
    writer.WriteInt32(glyph.leftExtent);
    writer.WriteInt32(glyph.c_ptr);
  }

  // Write data
  writer.WriteBytes(vlwFont.data);
  writer.WriteInt16(vlwFont.namelen);
  writer.WriteBytes(vlwFont.name);
  writer.WriteInt16(vlwFont.psnamelen);
  writer.WriteBytes(vlwFont.psname);
  writer.WriteInt8(vlwFont.smooth);

  return [...writer.ByteBuffer];
}
