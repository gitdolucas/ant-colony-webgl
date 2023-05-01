import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AntColony } from "../components/AntColony";
export function MyScene() {

    return (
        <div style={{ width: "100%", height: "100vh" }}>

            <Canvas orthographic camera={{zoom: 20}}>
                <color attach="background" args={['#333']} />

                
                
                {/* Objetos */}
                <AntColony />

                {/* Controle de câmera */}
                {/* <OrbitControls /> */}

                {/* Status app */}
                <Stats showPanel={0} className="stats"  />
            </Canvas>
        </div>
    )
}