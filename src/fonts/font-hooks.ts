import {useEffect, useState} from "react";
import {buildVlwFont} from "./vlw-font-builder";
import b from "buffer";

export const useFont = (fontUrl: string, size: number, range?: string) => {
  const [vlwFont, setVlwFont] = useState<number[] | undefined>();

  useEffect(() => {
    const convertFont = (data: ArrayBuffer) => {
      const vlvFont = buildVlwFont(b.Buffer.from(data), size, range);
      setVlwFont(vlvFont);
    }
    fetch(fontUrl)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        convertFont(data);
      });
  }, [fontUrl]);
  return vlwFont;
}
