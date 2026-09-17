export type NodeKind = 'core' | 'switch' | 'ap' | 'fw' | 'edge'

export type GraphNode = {
  id: string
  label: string
  kind: NodeKind
  position: [number, number, number]
  desktopOnly?: boolean
}

export type GraphLink = {
  id: string
  a: string
  b: string
  tone: 'lime' | 'cyan'
}

export const LIME = '#aef33f'
export const CYAN = '#38bdf8'
export const NAVY = '#020617'

export const GRAPH_NODES: GraphNode[] = [
  { id: 'core', label: 'CORE', kind: 'core', position: [0, 0.42, 0] },
  { id: 'fw', label: 'FW', kind: 'fw', position: [0.12, 2.28, -0.72] },
  { id: 'sw1', label: 'SW-1', kind: 'switch', position: [-2.18, 0.78, 0.92] },
  { id: 'sw2', label: 'SW-2', kind: 'switch', position: [2.24, 0.7, 0.78] },
  { id: 'ospf', label: 'OSPF', kind: 'edge', position: [0.18, -1.22, 1.18] },
  { id: 'ap1', label: 'AP-1', kind: 'ap', position: [-3.18, -0.18, 1.55] },
  { id: 'ap2', label: 'AP-2', kind: 'ap', position: [3.22, -0.08, 1.42], desktopOnly: true },
  { id: 'vlan10', label: 'VLAN 10', kind: 'edge', position: [-2.42, -1.92, 0.22] },
  { id: 'vlan20', label: 'VLAN 20', kind: 'edge', position: [2.52, -1.82, 0.18], desktopOnly: true },
  { id: 'hotel', label: 'HOTEL', kind: 'edge', position: [-1.12, -2.28, -0.88] },
  { id: 'campus', label: 'CAMPUS', kind: 'edge', position: [1.28, -2.18, -1.02], desktopOnly: true },
  { id: 'edge1', label: 'UPLINK', kind: 'fw', position: [-3.28, 1.62, -1.18] },
  { id: 'edge2', label: 'WAN', kind: 'fw', position: [3.38, 1.72, -0.92], desktopOnly: true },
  { id: 'edge3', label: 'VPN', kind: 'ap', position: [0.62, 1.38, 2.18] },
  { id: 'edge4', label: 'PMS', kind: 'edge', position: [-0.82, -0.58, -2.08] },
  { id: 'edge5', label: 'POS', kind: 'switch', position: [2.02, -0.82, -1.72], desktopOnly: true },
  { id: 'edge6', label: 'BACKUP', kind: 'edge', position: [-2.12, 0.28, -1.62], desktopOnly: true },
]

export const GRAPH_LINKS: GraphLink[] = [
  { id: 'core-fw', a: 'core', b: 'fw', tone: 'lime' },
  { id: 'core-sw1', a: 'core', b: 'sw1', tone: 'cyan' },
  { id: 'core-sw2', a: 'core', b: 'sw2', tone: 'cyan' },
  { id: 'core-ospf', a: 'core', b: 'ospf', tone: 'lime' },
  { id: 'core-edge3', a: 'core', b: 'edge3', tone: 'cyan' },
  { id: 'core-edge4', a: 'core', b: 'edge4', tone: 'lime' },
  { id: 'sw1-ap1', a: 'sw1', b: 'ap1', tone: 'lime' },
  { id: 'sw2-ap2', a: 'sw2', b: 'ap2', tone: 'lime' },
  { id: 'sw1-vlan10', a: 'sw1', b: 'vlan10', tone: 'cyan' },
  { id: 'sw2-vlan20', a: 'sw2', b: 'vlan20', tone: 'cyan' },
  { id: 'ospf-hotel', a: 'ospf', b: 'hotel', tone: 'lime' },
  { id: 'ospf-campus', a: 'ospf', b: 'campus', tone: 'lime' },
  { id: 'fw-edge1', a: 'fw', b: 'edge1', tone: 'cyan' },
  { id: 'fw-edge2', a: 'fw', b: 'edge2', tone: 'cyan' },
  { id: 'edge1-edge6', a: 'edge1', b: 'edge6', tone: 'lime' },
  { id: 'edge4-edge6', a: 'edge4', b: 'edge6', tone: 'cyan' },
  { id: 'edge4-edge5', a: 'edge4', b: 'edge5', tone: 'lime' },
  { id: 'sw2-edge5', a: 'sw2', b: 'edge5', tone: 'cyan' },
  { id: 'ap1-vlan10', a: 'ap1', b: 'vlan10', tone: 'cyan' },
  { id: 'hotel-edge4', a: 'hotel', b: 'edge4', tone: 'lime' },
]

export function visibleNodes(mobile: boolean) {
  return GRAPH_NODES.filter((node) => !mobile || !node.desktopOnly)
}

export function visibleLinks(mobile: boolean) {
  const ids = new Set(visibleNodes(mobile).map((node) => node.id))
  return GRAPH_LINKS.filter((link) => ids.has(link.a) && ids.has(link.b))
}

export function nodeMap(mobile: boolean) {
  return new Map(visibleNodes(mobile).map((node) => [node.id, node]))
}

export function cableMid(
  a: [number, number, number],
  b: [number, number, number],
  salt: string,
): [number, number, number] {
  let h = 0
  for (let i = 0; i < salt.length; i += 1) h = (h * 31 + salt.charCodeAt(i)) | 0
  const n = ((h >>> 0) % 1000) / 1000
  const sag = 0.22 + n * 0.28
  const drift = (n - 0.5) * 0.55
  return [(a[0] + b[0]) / 2 + drift, (a[1] + b[1]) / 2 - sag, (a[2] + b[2]) / 2 + drift * 0.4]
}

export function bezierPoint(
  a: [number, number, number],
  m: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const s = 1 - t
  return [
    s * s * a[0] + 2 * s * t * m[0] + t * t * b[0],
    s * s * a[1] + 2 * s * t * m[1] + t * t * b[1],
    s * s * a[2] + 2 * s * t * m[2] + t * t * b[2],
  ]
}

export function curvePoints(
  a: [number, number, number],
  m: [number, number, number],
  b: [number, number, number],
  segments = 14,
) {
  const pts: [number, number, number][] = []
  for (let i = 0; i <= segments; i += 1) {
    pts.push(bezierPoint(a, m, b, i / segments))
  }
  return pts
}

export type CameraKey = {
  t: number
  pos: [number, number, number]
  look: [number, number, number]
}

/** First ~16% is the opening fly-in; remaining 84% maps to intro or page scroll 0→1. */
export const OPENING_PROGRESS = 0.16

export function journeyPlayhead(scroll: number, opened: number) {
  const s = Math.min(1, Math.max(0, scroll))
  return Math.min(1, opened + s * (1 - OPENING_PROGRESS))
}

export const CAMERA_PATH: CameraKey[] = [
  { t: 0, pos: [0, 5.35, 16.2], look: [0, 0.28, 0] },
  { t: 0.16, pos: [0.35, 1.6, 7.65], look: [0, 0.28, 0] },
  { t: 0.32, pos: [5.55, 2.25, 4.85], look: [0.55, 0.48, 0.05] },
  { t: 0.48, pos: [0.7, 3.55, -5.4], look: [0.1, 0.42, 0] },
  { t: 0.64, pos: [-4.55, 0.45, 2.85], look: [-1.45, 0.05, 0.7] },
  { t: 0.8, pos: [1.45, -1.95, 4.35], look: [0.2, -1.05, 0.15] },
  { t: 1, pos: [0.15, 2.45, 10.9], look: [0, 0.18, 0] },
]

function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

export function sampleCameraPath(t: number) {
  const x = Math.min(1, Math.max(0, t))
  let i = 0
  while (i < CAMERA_PATH.length - 1 && CAMERA_PATH[i + 1]!.t < x) i += 1
  const a = CAMERA_PATH[i]!
  const b = CAMERA_PATH[Math.min(i + 1, CAMERA_PATH.length - 1)]!
  const span = b.t - a.t || 1
  const u = (x - a.t) / span
  const s = u * u * (3 - 2 * u)
  return { pos: lerp3(a.pos, b.pos, s), look: lerp3(a.look, b.look, s) }
}

export function nodeEmphasis(kind: NodeKind, progress: number) {
  const peak = kind === 'core' ? 0.14 : kind === 'switch' || kind === 'fw' ? 0.4 : 0.66
  const d = Math.abs(progress - peak)
  return Math.max(0, 1 - d / 0.24)
}
