declare module 'polyline-encoded' {
  import type { LatLngExpression } from 'leaflet';

  export function decode(encoded: string): LatLngExpression[]
}
