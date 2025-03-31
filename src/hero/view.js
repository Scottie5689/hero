/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function View() {
  const [isSpinning, setIsSpinning] = useState(true); // Control rotation state
  const isSpinningRef = useRef(isSpinning); // Store ref to track rotation state
  const modelRef = useRef(null); // Keep track of model

  useEffect(() => {
    const container = document.getElementById('laptop-container');
    if (!container) return;

    // Ensure container has a size
    container.style.width = '100%';
    container.style.height = '600px';
    container.style.position = 'relative';

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load('/wp-content/uploads/MacBookPro_blend.gltf', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      model.scale.set(1.8, 1.8, 1.8);
      scene.add(model);
      modelRef.current = model; // Store reference to model
    }, undefined, (error) => {
      console.error('Error loading GLTF model:', error);
    });

    // Set camera position
    camera.position.set(-4.05, 3.37, -6.02);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.screenSpacePanning = false;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Rotate model only if isSpinningRef is true
      if (modelRef.current && isSpinningRef.current) {
        modelRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Runs only once on mount

  // Toggle function to pause/resume rotation
  const toggleSpin = () => {
    setIsSpinning((prev) => {
      isSpinningRef.current = !prev; // Update ref immediately
      return !prev;
    });
  };

  return (
    <>
      <div id="laptop-container"></div>
      <div class="hero__controls">
        <button 
          onClick={toggleSpin} 
          style={{
            display: 'block',
            margin: '10px auto',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {isSpinning ? 'Pause' : 'Resume'}
        </button>
        <img class="hero__vector" src="/wp-content/uploads/360-vector-2.svg"/>
      </div>
    </>
  );
}

import { createRoot } from 'react-dom/client';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('laptop-container');
  if (container) {
    const root = createRoot(container.parentElement);
    root.render(<View />);
  } else {
    console.error("laptop-container not found.");
  }
});

/* eslint-enable no-console */


