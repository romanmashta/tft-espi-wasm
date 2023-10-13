import fontkit, {BBOX} from 'fontkit';
import * as fs from "fs";
import {buildVlwFont} from "./vlw-font-builder";
describe('font routine', () => {
  it('convert font', () => {
    const fileName =  'Roboto-Thin'
    const buffer = fs.readFileSync(`./assets/${fileName}.ttf`);
    const flv = buildVlwFont(buffer, 16);
    fs.writeFileSync(`./assets/${fileName}.vlw`, new Uint8Array(flv));
  })
});
