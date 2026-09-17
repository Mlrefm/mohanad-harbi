import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { EventManager } from '@react-three/fiber'
import { AdaptiveDpr, Grid, Line, Stars } from '@react-three/drei'
import * as THREE from 'three'
import {
  CYAN,
  LIME,
  NAVY,
  OPENING_PROGRESS,
  bezierPoint,
  cableMid,
  curvePoints,
  journeyPlayhead,
  nodeEmphasis,
  nodeMap,
  sampleCameraPath,
  visibleLinks,
  visibleNodes,
  type GraphLink,
  type GraphNode,
} from '@/components/intro/network-graph'

const skipRaycast = () => {}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function kindColor(kind: GraphNode['kind']) {
  if (kind === 'switch' || kind === 'core') return LIME
  return CYAN
}

function kindRadius(kind: GraphNode['kind']) {
  if (kind === 'core') return 0.22
  if (kind === 'fw') return 0.13
  if (kind === 'switch') return 0.12
  if (kind === 'ap') return 0.1
  return 0.09
}

function disableCanvasEvents(): EventManager<HTMLElement> {
  return {
    enabled: false,
    priority: 0,
    connected: undefined,
    compute: () => {},
    connect: () => {},
    disconnect: () => {},
  }
}

function RendererDisposal() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const material = mesh.material
        if (!material) return
        const list = Array.isArray(material) ? material : [material]
        for (const item of list) {
          const map = (item as THREE.MeshBasicMaterial).map
          map?.dispose()
          item.dispose()
        }
      })
      gl.forceContextLoss()
      gl.dispose()
    }
  }, [gl, scene])

  return null
}

function PlayheadSync({
  scrollRef,
  playheadRef,
}: {
  scrollRef: MutableRefObject<number>
  playheadRef: MutableRefObject<number>
}) {
  const started = useRef(performance.now())

  useFrame((_, delta) => {
    const elapsed = (performance.now() - started.current) / 1000
    const opened = smoothstep(0, 3.15, elapsed) * OPENING_PROGRESS
    const target = journeyPlayhead(scrollRef.current, opened)
    playheadRef.current = THREE.MathUtils.damp(playheadRef.current, target, 8.4, delta)
  })

  return null
}

function CameraPath({ playheadRef }: { playheadRef: MutableRefObject<number> }) {
  const camera = useThree((state) => state.camera)
  const look = useRef(new THREE.Vector3())

  useFrame(() => {
    const { pos, look: target } = sampleCameraPath(playheadRef.current)
    camera.position.set(pos[0], pos[1], pos[2])
    look.current.set(target[0], target[1], target[2])
    camera.lookAt(look.current)
  })

  return null
}

function FogRig({ playheadRef }: { playheadRef: MutableRefObject<number> }) {
  const scene = useThree((state) => state.scene)

  useFrame(() => {
    const fog = scene.fog as THREE.Fog | null
    if (!fog) return
    const p = playheadRef.current
    fog.near = 5 + p * 2.4
    fog.far = 23 - p * 7
  })

  return null
}

function RadarRings({ playheadRef }: { playheadRef: MutableRefObject<number> }) {
  const inner = useRef<THREE.Mesh>(null)
  const outer = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const appear = Math.max(smoothstep(0.4, 1.6, t), smoothstep(0.02, 0.1, playheadRef.current))
    if (inner.current) {
      inner.current.rotation.z = t * 0.35
      inner.current.scale.setScalar(appear)
    }
    if (outer.current) {
      outer.current.rotation.z = -t * 0.22
      outer.current.scale.setScalar(appear)
    }
  })

  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={inner} rotation={[Math.PI / 2.15, 0.18, 0]} raycast={skipRaycast}>
        <torusGeometry args={[2.15, 0.01, 8, 72]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.32} depthWrite={false} />
      </mesh>
      <mesh ref={outer} rotation={[Math.PI / 1.85, -0.22, 0.4]} raycast={skipRaycast}>
        <torusGeometry args={[3.05, 0.008, 8, 80]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  )
}

function GraphNodeMesh({
  node,
  playheadRef,
}: {
  node: GraphNode
  playheadRef: MutableRefObject<number>
}) {
  const glow = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)
  const color = kindColor(node.kind)
  const radius = kindRadius(node.kind)

  useFrame(({ clock }) => {
    const pulse = 0.1 + Math.sin(clock.elapsedTime * 2.1 + node.position[0]) * 0.05
    const boost = nodeEmphasis(node.kind, playheadRef.current)
    if (glow.current) {
      const mat = glow.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulse * (0.65 + boost * 0.9)
      glow.current.scale.setScalar(2.2 + boost * 0.7)
    }
    if (core.current) {
      core.current.scale.setScalar(0.92 + boost * 0.32)
    }
  })

  return (
    <group position={node.position}>
      <mesh ref={core} raycast={skipRaycast}>
        {node.kind === 'core' ? (
          <icosahedronGeometry args={[radius, 1]} />
        ) : node.kind === 'switch' ? (
          <boxGeometry args={[radius * 1.7, radius * 1.15, radius * 1.7]} />
        ) : node.kind === 'fw' ? (
          <octahedronGeometry args={[radius * 1.15, 0]} />
        ) : (
          <icosahedronGeometry args={[radius, 0]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={node.kind === 'core' ? 2.2 : 1.4}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
      <mesh ref={glow} scale={2.4} raycast={skipRaycast}>
        <sphereGeometry args={[radius, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  )
}

function Cables({
  links,
  nodes,
}: {
  links: GraphLink[]
  nodes: Map<string, GraphNode>
}) {
  const curves = useMemo(
    () =>
      links.flatMap((link) => {
        const from = nodes.get(link.a)
        const to = nodes.get(link.b)
        if (!from || !to) return []
        const mid = cableMid(from.position, to.position, link.id)
        return [
          {
            id: link.id,
            color: link.tone === 'lime' ? LIME : CYAN,
            points: curvePoints(from.position, mid, to.position),
          },
        ]
      }),
    [links, nodes],
  )

  return (
    <group>
      {curves.map((curve) => (
        <Line
          key={curve.id}
          points={curve.points}
          color={curve.color}
          lineWidth={1.35}
          transparent
          opacity={0.78}
          raycast={skipRaycast}
        />
      ))}
    </group>
  )
}

function Packets({
  links,
  nodes,
  count,
}: {
  links: GraphLink[]
  nodes: Map<string, GraphNode>
  count: number
}) {
  const meshRefs = useRef<Array<THREE.Mesh | null>>([])
  const paths = useMemo(() => {
    return links.slice(0, Math.max(count, 1)).map((link) => {
      const from = nodes.get(link.a)
      const to = nodes.get(link.b)
      if (!from || !to) return null
      return {
        a: from.position,
        b: to.position,
        mid: cableMid(from.position, to.position, link.id),
        color: link.tone === 'lime' ? LIME : CYAN,
        speed: 0.18 + (link.id.length % 5) * 0.045,
        offset: (link.id.charCodeAt(0) % 10) / 10,
      }
    })
  }, [links, nodes, count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    paths.forEach((path, index) => {
      const mesh = meshRefs.current[index]
      if (!path || !mesh) return
      const u = (t * path.speed + path.offset) % 1
      const [x, y, z] = bezierPoint(path.a, path.mid, path.b, u)
      mesh.position.set(x, y, z)
      mesh.visible = t > 1.05
    })
  })

  return (
    <group>
      {paths.map((path, index) =>
        path ? (
          <mesh
            key={links[index]?.id ?? index}
            ref={(node) => {
              meshRefs.current[index] = node
            }}
            visible={false}
            raycast={skipRaycast}
          >
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color={path.color} />
          </mesh>
        ) : null,
      )}
    </group>
  )
}

function NetworkScene({
  mobile,
  playheadRef,
}: {
  mobile: boolean
  playheadRef: MutableRefObject<number>
}) {
  const root = useRef<THREE.Group>(null)
  const nodes = useMemo(() => visibleNodes(mobile), [mobile])
  const links = useMemo(() => visibleLinks(mobile), [mobile])
  const lookup = useMemo(() => nodeMap(mobile), [mobile])

  useFrame(({ clock }, delta) => {
    if (!root.current) return
    const t = clock.elapsedTime
    const p = playheadRef.current
    const appear = Math.max(smoothstep(0.2, 1.45, t), smoothstep(0, 0.08, p))
    root.current.scale.setScalar(0.2 + appear * 0.8)
    root.current.rotation.y = p * 1.08 + Math.sin(t * 0.14) * 0.05
    const targetPitch = Math.sin(p * Math.PI) * 0.16
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetPitch, 4, delta)
  })

  return (
    <group ref={root}>
      <RadarRings playheadRef={playheadRef} />
      <Cables links={links} nodes={lookup} />
      <Packets links={links} nodes={lookup} count={mobile ? 5 : 10} />
      {nodes.map((node) => (
        <GraphNodeMesh key={node.id} node={node} playheadRef={playheadRef} />
      ))}
    </group>
  )
}

export function NetworkWorld({
  mobile,
  scrollRef,
  paused,
}: {
  mobile: boolean
  scrollRef: MutableRefObject<number>
  paused: boolean
}) {
  const playheadRef = useRef(0)
  const start = sampleCameraPath(0)

  return (
    <Canvas
      className="pointer-events-none h-full w-full"
      dpr={mobile ? [1, 1.15] : [1, 1.65]}
      frameloop={paused ? 'never' : 'always'}
      events={disableCanvasEvents}
      camera={{ position: start.pos, fov: 42, near: 0.1, far: 90 }}
      style={{ touchAction: 'pan-y', pointerEvents: 'none' }}
      gl={{
        antialias: !mobile,
        alpha: false,
        powerPreference: mobile ? 'low-power' : 'high-performance',
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(NAVY, 1)
        gl.domElement.style.pointerEvents = 'none'
        gl.domElement.style.touchAction = 'pan-y'
        const parent = gl.domElement.parentElement
        if (parent) {
          parent.style.pointerEvents = 'none'
          parent.style.touchAction = 'pan-y'
        }
        const scroll = scrollRef.current
        const startP = journeyPlayhead(scroll, scroll > 0.001 ? OPENING_PROGRESS : 0)
        playheadRef.current = startP
        const { pos, look } = sampleCameraPath(startP)
        camera.position.set(pos[0], pos[1], pos[2])
        camera.lookAt(look[0], look[1], look[2])
      }}
    >
      <color attach="background" args={[NAVY]} />
      <fog attach="fog" args={[NAVY, 7, 24]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[0, 1.4, 1.2]} intensity={10} color={LIME} distance={14} />
      <pointLight position={[4.5, 3.2, 3]} intensity={6} color={CYAN} distance={18} />
      <Stars
        radius={48}
        depth={36}
        count={mobile ? 650 : 1400}
        factor={3.2}
        fade
        speed={0.55}
      />
      <Grid
        position={[0, -3.35, 0]}
        args={[20, 20]}
        cellSize={0.55}
        cellThickness={0.6}
        cellColor="#1e293b"
        sectionSize={2.2}
        sectionThickness={1.1}
        sectionColor={CYAN}
        fadeDistance={18}
        fadeStrength={1.4}
        infiniteGrid
        raycast={skipRaycast}
      />
      <PlayheadSync scrollRef={scrollRef} playheadRef={playheadRef} />
      <CameraPath playheadRef={playheadRef} />
      <FogRig playheadRef={playheadRef} />
      <NetworkScene mobile={mobile} playheadRef={playheadRef} />
      <AdaptiveDpr pixelated={false} />
      <RendererDisposal />
    </Canvas>
  )
}
