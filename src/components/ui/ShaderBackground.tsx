"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;

  #define NUM_OCTAVES 3

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.3;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.4;
    }
    return v;
  }

  // tanh is not a built-in in GLSL ES 1.00 (WebGL1), so define it.
  vec4 tanhApprox(vec4 x) {
    return 1.0 - 2.0 / (exp(2.0 * x) + 1.0);
  }

  void main() {
    vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
    vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
    vec2 v;
    vec4 o = vec4(0.0);

    float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

    for (float i = 0.0; i < 35.0; i++) {
      v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
      float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
      vec4 auroraColors = vec4(
        0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
        0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
        0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
        1.0
      );
      vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
      float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
      o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
    }

    o = max(o, vec4(0.0));
    o = tanhApprox(pow(o / 100.0, vec4(1.6)));
    gl_FragColor = o * 1.5;
  }
`;

/**
 * Animated WebGL aurora background (Three.js shader).
 * - Fills its positioned parent; sized via ResizeObserver.
 * - Pauses rendering when scrolled out of view (IntersectionObserver).
 * - Renders a single static frame under prefers-reduced-motion.
 * - three is dynamically imported so it never runs on the server and is
 *   code-split out of the initial bundle.
 */
export function ShaderBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (cancelled || !container) return;

      const renderer = (() => {
        try {
          return new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
          return null;
        }
      })();
      if (!renderer) return; // WebGL unavailable — static gradient fallback remains

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const measure = () => {
        const r = container.getBoundingClientRect();
        return {
          w: Math.max(1, Math.round(r.width)),
          h: Math.max(1, Math.round(r.height)),
        };
      };
      let { w, h } = measure();

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(w, h) },
      };
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer.setSize(w, h, false);
      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const renderFrame = () => renderer.render(scene, camera);

      let frameId = 0;
      let running = false;
      const loop = () => {
        uniforms.iTime.value += 0.016;
        renderFrame();
        frameId = requestAnimationFrame(loop);
      };
      const start = () => {
        if (!running) {
          running = true;
          frameId = requestAnimationFrame(loop);
        }
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(frameId);
      };

      const resize = () => {
        const s = measure();
        w = s.w;
        h = s.h;
        renderer.setSize(w, h, false);
        uniforms.iResolution.value.set(w, h);
        if (reduced) renderFrame();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(container);

      let io: IntersectionObserver | null = null;
      if (reduced) {
        uniforms.iTime.value = 1.0;
        renderFrame();
      } else {
        io = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) start();
            else stop();
          },
          { threshold: 0 },
        );
        io.observe(container);
        start();
      }

      cleanup = () => {
        stop();
        ro.disconnect();
        io?.disconnect();
        if (canvas.parentNode === container) container.removeChild(canvas);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  return <div ref={containerRef} className={className} aria-hidden />;
}
