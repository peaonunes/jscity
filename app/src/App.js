import { Box3, Sphere, Vector3, PerspectiveCamera } from "three";
import ReactDOM from "react-dom";
import React, { Suspense, useState, useRef, useEffect, useMemo } from "react";
import {
  Canvas,
  extend,
  useLoader,
  useThree,
  useFrame
} from "react-three-fiber";
import {
  MapControls,
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

import { BLOCKS } from "./data";

extend({ MapControls });

function Controls() {
  const controls = useRef();
  const { camera, gl, setDefaultCamera } = useThree();
  //let newCamera = PerspectiveCamera(45, width / height, 0.1, 20000);
  useFrame(() => controls.current.update());
  return (
    <mapControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      maxZoom={40}
      minZoom={1.25}
    />
  );
}

function Block(block) {
  //https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
  // BoxGeometry(width: Float, height: Float, depth :Float)
  console.log(block);
  return (
    <mesh position={new Vector3(block.position)}>
      <meshBasicMaterial
        attach="material"
        color="red"
        opacity={1}
        depthWrite={false}
        transparent
      />
      <boxGeometry attach="geometry" args={[block.loc, block.ce, block.loc]} />
    </mesh>
  );
}

function City(blocks) {
  const [center, setCenter] = useState([0, 0, 0]);
  const ref = useRef();

  useEffect(() => {
    const box = new Box3().setFromObject(ref.current);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    setCenter([-sphere.center.x, -sphere.center.y, -sphere.center.z]);
  }, []);

  return (
    <group position={center} ref={ref}>
      {Object.keys(blocks).map(blockId => (
        <Block key={blockId} {...blocks[blockId]} />
      ))}
    </group>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Hello JSCity</h1>
      <Canvas
        orthographic
        camera={{ position: [50, 50, 50], zoom: 10, up: [0, 0, 1], far: 1000 }}
      >
        <Suspense fallback={"loading..."}>
          <City blocks={BLOCKS} />
        </Suspense>
        <Controls />
      </Canvas>
    </div>
  );
}
