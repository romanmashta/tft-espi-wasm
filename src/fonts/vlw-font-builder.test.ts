import fontkit, {BBOX} from 'fontkit';
import * as fs from "fs";
import {buildVlwFont} from "./vlw-font-builder";
describe('font routine', () => {
  it('convert font', () => {
    const fileName =  'Roboto-Thin'
    const font = fontkit.openSync(`./assets/${fileName}.ttf`);
    const flv = buildVlwFont(font, 16);
    fs.writeFileSync(`./assets/${fileName}.vlw`, new Uint8Array(flv));
  })
});
