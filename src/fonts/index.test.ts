import fontkit, {BBOX} from 'fontkit';
import {createCanvas} from "canvas";
import * as fs from "fs";

const scaleBBOX = (box: BBOX, scale: number) : BBOX => {
  return {
    minX: box.minX * scale,
    minY: box.minY * scale,
    maxX: box.maxX * scale,
    maxY: box.maxY * scale,
    width: box.width * scale,
    height: box.height * scale,
  }
}
describe('fontkit', () => {
  it('convert font', () => {
    const font = fontkit.openSync('./assets/DigitalDisplayRegular-ODEO.ttf');
    var run = font.layout('0123456789');
    const fontSize = 32
    const scale = 1 / font.unitsPerEm * fontSize;
    const bbox = scaleBBOX(run.bbox, scale);

    var glyph = run.glyphs[0];

    //render to CanvasRenderingContext2D
    const canvas = createCanvas(bbox.width+1, bbox.height+1);  // Create a 200x200 canvas
    const ctx = canvas.getContext('2d') as any;
    glyph.bbox
    glyph.render(ctx, fontSize);
    const out = fs.createWriteStream(__dirname + '/test.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    expect(1).toBe(1);
  });
});
