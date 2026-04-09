// gradient.frag

precision highp float;

uniform float uTime;
uniform float uScrollProgress;
uniform float uSeed;
// Config Uniforms
uniform vec3 uColourPalette[3];
uniform float uUvScale;
uniform float uUvDistortionIterations;
uniform float uUvDistortionIntensity;
uniform vec2 uViewportUvOffset;
uniform vec2 uViewportUvScale;
uniform float uGrain; // 1.0 = grain enabled, 0.0 = disabled (mobile)

varying vec2 vUv;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(
    permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0)
  );

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float noise(vec3 v) {
  return snoise(v);
}

// Three-stop gradient for noise-driven color transitions.
vec3 gradient3(in float t, in vec3 c0, in vec3 c1, in vec3 c2) {
  if (t < 0.5) {
    return mix(c0, c1, smoothstep(0.0, 0.5, t));
  }
  return mix(c1, c2, smoothstep(0.5, 1.0, t));
}

void main() {
  // Map this canvas's fragment into the shared viewport gradient space
  vec2 uv = uViewportUvOffset + vUv * uViewportUvScale;
  // Scale the uv coordinates
  uv *= uUvScale;

  // Distort the uv coordinates with noise iterations
  for (int i = 0; i < 6; i++) {
    if (float(i) >= uUvDistortionIterations) break;
    uv += noise(vec3(uv - float(i) * 0.2, uTime + float(i) * 32.0)) * uUvDistortionIntensity;
  }

  float colourInput = noise(vec3(uv, sin(uTime) + uSeed)) * 0.5 + 0.5;
  float balancedInput = clamp((colourInput - 0.5) * 1.15 + 0.5, 0.0, 1.0);
  vec3 colour = gradient3(balancedInput, uColourPalette[0], uColourPalette[1], uColourPalette[2]);

  if (uGrain > 0.5) {
    float grain = noise(vec3(vUv * 600.0, uTime * 1.2 + uSeed));
    colour = clamp(colour + vec3(grain * 0.02), 0.0, 1.0);
  }

  gl_FragColor = vec4(colour, 1.0);
}
