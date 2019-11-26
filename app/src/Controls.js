import { extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useRef } from 'react';

extend({ OrbitControls });

function Controls() {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => controls.current.update());

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      maxZoom={40}
      minZoom={1}
    />
  );
}

export default Controls;
