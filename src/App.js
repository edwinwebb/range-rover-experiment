import * as THREE from 'three'
import { useMemo } from 'react'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, applyProps } from '@react-three/fiber'
import { Suspense } from 'react';
import { LayerMaterial, Base, Depth } from 'lamina'


function App() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-7.5, 0, -7.5], fov: 35 }}>
      <Suspense fallback={null}>
        <RangeRover scale={[2,2,2]} />
        <ContactShadows resolution={2048} frames={1} position={[0, -0.42*2, 0]} scale={10} blur={0.75} opacity={.7} far={10} />
        <Environment background resolution={512}>
        <TunnelLight position={[0,0,1]}/>
          <TunnelLight position={[0,0,2]}/>
          <TunnelLight position={[0,0,3]}/>
          <TunnelLight position={[0,0,0]}/>
          <TunnelLight position={[0,0,-1]}/>
          <TunnelLight position={[0,0,-2]}/>
          <TunnelLight position={[0,0,-3]}/>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
              <Base color="#333" alpha={1} mode="normal" />
              <Depth colorA="#0B6836" colorB="#0F291D" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
            </LayerMaterial>
          </mesh>
        </Environment>
      </Suspense>
      <ambientLight intensity={0.05} />
      <spotLight position={[0, 15, 0]} angle={0.25} penumbra={1} castShadow intensity={1} shadow-bias={-0.0001} />
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.6}  minPolarAngle={Math.PI / 2.6} />  
    </Canvas>
  );
}

function TunnelLight(props) {
  return(
    <group {...props} scale={[0.5, 0.5, 0.5]}>
      <BarLight rotation-x={Math.PI / 2} position={[0, 3.5, 0]} scale={[6, .2, .6]} />
      <BarLight rotation-x={Math.PI / 2} rotation={[Math.PI / 2, -Math.PI / 4 , 0]} position={[3.5, 3, 0]} scale={[1, .2, .6]} />
      <BarLight rotation-x={Math.PI / 2} rotation={[Math.PI / 2, Math.PI / 4 , 0]} position={[-3.5, 3, 0]} scale={[1, .2, .6]} />
    </group>
    )
}

function BarLight(props) {
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshBasicMaterial color="white" toneMapped={false} />
    </mesh>
  )
}

/*
Range Rover Sport SVR by iSteven
License: CC Attribution-NonCommercialCreative Commons Attribution-NonCommercial
https://sketchfab.com/3d-models/range-rover-sport-svr-956ca9d890304450bb8c448557c2c07e
*/
function RangeRover(props) {
  const { scene, nodes, materials } = useGLTF('/rangerover.glb')

  useMemo(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        node.receiveShadow = node.castShadow = true
      }
    })
    applyProps(materials['BreakDiscs.001'], { metalness: 0.2, roughness: 0.2, color: '#ccc' }) // discs
    applyProps(materials.black_shiny_plastic, { metalness: 0.5, roughness: 0.25, color: 'black', envMapIntensity: 2 }) // roof
    applyProps(materials.chrome, { metalness: 1, roughness: 0.2, color: '#aaa' }) //lamp inset
    applyProps(materials.dark_rim, { metalness: .3, roughness: 0.2, color: '#aaa' }) // exhaust
    applyProps(materials.plastic, { metalness: 0, roughness: 1, color: '#222' }) // body trim
    applyProps(materials.chasis, { metalness: 0, roughness: 1, color: 'black' }) // inter chasis
    applyProps(materials['Material.004'], { metalness: 1, roughness: 0.2, color: '#fff', opacity:0.3, transparent: true }) // lamp glass
    applyProps(materials['Material.002'], { metalness: 1, roughness: 0.1, color: '#333', opacity:0.7, transparent: true }) // wind glass
    applyProps(materials['Material.001'], { metalness: 0, color: '#333' }) // tires
    applyProps(materials['Material.006'], { metalness: .66, roughness:0,  color: 'white' }) // wing mirror glass
    applyProps(materials['Material.007'], { metalness: .66, roughness:0,  color: 'white' }) // lug nuts
    applyProps(materials['Chrome.002'], { metalness: 0.4, roughness:0.2,  color: '#ddd' }) // rims
    applyProps(materials.Color_B04, {
      roughness: 0.0,
      metalness: 0.15,
      color: '#FFF',
      envMapIntensity: 2,
      normalScale: [0.04, 0.04]
    })
  }, [nodes, materials])
  return <primitive object={scene} {...props} />
}


export default App;
