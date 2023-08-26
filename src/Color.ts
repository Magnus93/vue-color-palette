export namespace Color {
  export interface RGB {
    red: number // MAX 255
    green: number // MAX 255
    blue: number // MAX 255
  }
  export namespace RGB {
    export function toString(color: RGB) {
      return `rgb(${color.red}, ${color.green}, ${color.blue})`
    }
    export function toHSL(color: RGB): HSL {
      // Make r, g, and b fractions of 1
      const r = color.red / 255
      const g = color.green / 255
      const b = color.blue / 255
      // Find greatest and smallest channel values
      const cmin = Math.min(r, g, b)
      const cmax = Math.max(r, g, b)
      const delta = cmax - cmin
      let hue = 0
      let saturation = 0
      let lightness = 0
      // Calculate hue
      hue = Math.round(
        (delta == 0
          ? 0
          : cmax == r
          ? ((g - b) / delta) % 6
          : cmax == g
          ? (b - r) / delta + 2
          : (hue = (r - g) / delta + 4)) * 60
      )
      if (hue < 0) hue += 360
      // Calculate lightness
      lightness = (cmax + cmin) / 2
      // Calculate saturation
      saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
      return { hue, saturation, lightness }
    }
    export function toHex(color: RGB): string {
      const hexValue = (value: number) => Math.round(value).toString(16).padStart(2, '0').slice(2)
      return `#${hexValue(color.red)}${hexValue(color.green)}${hexValue(color.blue)}`
    }
    export function fromHex(color: string) {
      const decimalValue = (value: string) => parseInt(value, 16)
      return {
        red: decimalValue(color.substring(1, 3)),
        green: decimalValue(color.substring(3, 5)),
        blue: decimalValue(color.substring(5, 7))
      }
    }
  }
  export interface HSL {
    hue: number // MAX 360
    saturation: number // MAX 1
    lightness: number // MAX 1
  }
  export namespace HSL {
    export function fromHex(color: string): HSL {
      const rgb = RGB.fromHex(color)
      return RGB.toHSL(rgb)
    }
    export function toString(color: HSL) {
      return `hsl(${color.hue}, ${(color.saturation * 100).toFixed(1)}%, ${(
        color.lightness * 100
      ).toFixed(1)}%)`
    }
  }
}
