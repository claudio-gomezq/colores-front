export default interface Color {
  id?: number;
  name: string;
  color: string;
  pantone: string;
  year: number;
}

export function createColor(color: Partial<Color>): Color{
  return {...color} as Color;
}
