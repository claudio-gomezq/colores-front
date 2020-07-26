export default interface ColorModel {
  id?: number;
  name: string;
  color: string;
  pantone: string;
  year: number;
}

export function createColor(color: Partial<ColorModel>): ColorModel{
  return {...color} as ColorModel;
}
