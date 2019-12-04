import { extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useRef } from 'react';

extend({ OrbitControls });

function Controls({ autoRotate }) {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => controls.current.update());

  return (
    <orbitControls
      autoRotate={autoRotate}
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      maxZoom={40}
      minZoom={1}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

export default Controls;
