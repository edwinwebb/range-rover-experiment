import { VRCanvas, DefaultXRControllers } from '@react-three/xr'

function App() {
  return (
    <VRCanvas>
      <mesh position={[0, 1, -2]}>
        <sphereBufferGeometry args={[0.5,16,16]} />
        <meshBasicMaterial color={"white"} wireframe={true} />
      </mesh>
      <DefaultXRControllers />
    </VRCanvas>
  );
}

export default App;
