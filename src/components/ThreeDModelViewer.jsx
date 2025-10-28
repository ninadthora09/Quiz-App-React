import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
// Removed: import { motion } from 'framer-motion-3d'; // This is no longer needed
import { Vector3 } from 'three'; // Still useful for certain 3D operations if you expand

// This component loads and renders your GLB model
function Model({ path, scale = 1, rotationSpeed = 0.005 }) {
    const { scene } = useGLTF(path); // Loads the 3D model
    const ref = useRef(); // Ref to control the model's properties

    // useFrame runs every frame, allowing for continuous animations
    useFrame((state) => {
        if (ref.current) {
            // Gentle floating effect based on sine wave
            ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; 
            
            // Continuous rotation around the Y-axis
            ref.current.rotation.y += rotationSpeed; 

            // Example of a subtle tilt based on mouse position (optional, uncomment to try)
            // const mouseX = state.mouse.x;
            // const mouseY = state.mouse.y;
            // ref.current.rotation.x = Math.sin(mouseY * Math.PI / 2) * 0.05;
            // ref.current.rotation.z = Math.sin(mouseX * Math.PI / 2) * 0.05;
        }
    });

    return (
        // <primitive> is used to render raw Three.js objects (like the loaded scene)
        <primitive
            ref={ref}
            object={scene} // The loaded GLB scene object
            scale={scale}   // Apply the scale prop
            // No initial, animate, exit props from Framer Motion here
        />
    );
}

const ThreeDModelViewer = ({ modelPath, modelScale = 1 }) => {
    return (
        <Canvas
            // Basic camera setup: position it slightly back, and set field of view
            camera={{ position: [0, 0, 3], fov: 50 }}
            // Make the canvas fill its parent container
            style={{ width: '100%', height: '100%' }}
        >
            {/* Suspense is crucial for handling asynchronous loading of the 3D model */}
            <Suspense fallback={
                <Html center className="text-gray-400">
                    Loading 3D Model...
                </Html>
            }>
                {/* Lighting for the scene */}
                <ambientLight intensity={0.5} /> {/* General soft light */}
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow /> {/* Directional light */}
                <pointLight position={[-10, -10, -10]} intensity={0.5} /> {/* Another point light */}

                {/* Your 3D Model */}
                <Model path={modelPath} scale={modelScale} />

                {/* Environment for realistic background/reflections. 'night' is a good choice for your theme */}
                <Environment preset="night" background={false} /> 

                {/* Optional: Soft contact shadow beneath the model */}
                <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />

                {/* Optional: OrbitControls for user interaction (uncomment if you want users to rotate/zoom) */}
                {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} /> */}
            </Suspense>
        </Canvas>
    );
};

export default ThreeDModelViewer;