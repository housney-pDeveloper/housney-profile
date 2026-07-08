export const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

export const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intensity;
uniform float u_temp;
uniform vec2 u_pointer;

float blob(vec2 uv, vec2 c, float r) {
  float d = length(uv - c);
  return exp(-(d * d) / (r * r));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.x *= u_res.x / u_res.y;
  float t = u_time * 0.00015;
  vec2 p = u_pointer * 0.05;

  vec3 base   = vec3(0.039, 0.039, 0.043);  /* #0a0a0a mono */
  vec3 cobalt = vec3(0.44, 0.44, 0.48);
  vec3 indigo = vec3(0.27, 0.27, 0.30);
  vec3 steel  = vec3(0.36, 0.36, 0.40);
  vec3 accent = vec3(0.90, 0.90, 0.92);
  vec3 warm = mix(steel, cobalt, u_temp);

  float b1 = blob(uv, vec2(0.25 + sin(t) * 0.06, 0.35 + cos(t * 0.9) * 0.05) + p, 0.45);
  float b2 = blob(uv, vec2(0.85 + cos(t * 1.1) * 0.07, 0.25 + sin(t * 0.8) * 0.06) + p * 0.6, 0.38);
  float b3 = blob(uv, vec2(0.78 + sin(t * 0.7) * 0.05, 0.75 + cos(t) * 0.07) - p * 0.4, 0.52);
  float b4 = blob(uv, vec2(0.45, 0.58) + p * 0.2, 0.30);

  vec3 col = base;
  col += warm * b1 * 0.55 * u_intensity;
  col += indigo * b2 * 0.50 * u_intensity;
  col += mix(indigo, warm, 0.5) * b3 * 0.42 * u_intensity;
  col += accent * b4 * 0.10 * u_intensity;

  float scan = step(0.98, fract(gl_FragCoord.y / 28.0)) * 0.018;
  col += scan;

  gl_FragColor = vec4(col, 1.0);
}
`
