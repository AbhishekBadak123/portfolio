import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  profileImage?: string;
  className?: string;
}

type ShaderProgram = WebGLProgram & {
  resolution: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  move: WebGLUniformLocation | null;
  touch: WebGLUniformLocation | null;
  pointerCount: WebGLUniformLocation | null;
  pointers: WebGLUniformLocation | null;
};

// WebGL Renderer class
class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private shaderSource: string;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;

  private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement, _scale: number) {
    this.canvas = canvas;
    this.scale = _scale;
    this.gl = canvas.getContext('webgl2')!;
    this.gl.viewport(0, 0, canvas.width * _scale, canvas.height * _scale);
    this.shaderSource = defaultShaderSource;
  }

  updateShader(source: string) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas: number[]) {
    this.mouseMove = deltas;
  }

  updateMouse(coords: number[]) {
    this.mouseCoords = coords;
  }

  updatePointerCoords(coords: number[]) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr: number) {
    this.nbrOfPointers = nbr;
  }

  updateScale(scale: number) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      console.error('Shader compilation error:', error);
    }
  }

  test(source: string) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program as ShaderProgram;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, 'resolution');
    program.time = gl.getUniformLocation(program, 'time');
    program.move = gl.getUniformLocation(program, 'move');
    program.touch = gl.getUniformLocation(program, 'touch');
    program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
    program.pointers = gl.getUniformLocation(program, 'pointers');
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program as ShaderProgram | null;

    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f(program.touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i(program.pointerCount, this.nbrOfPointers);
    gl.uniform2fv(program.pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// Pointer Handler class
class PointerHandler {
  private scale: number;
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale;

    const map = (el: HTMLCanvasElement, s: number, x: number, y: number) =>
      [x * s, el.height - y * s];

    element.addEventListener('pointerdown', (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
    });

    element.addEventListener('pointerup', (e) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointerleave', (e) => {
      if (this.count === 1) {
        this.lastCoords = this.first;
      }
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener('pointermove', (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  getScale() {
    return this.scale;
  }

  updateScale(scale: number) {
    this.scale = scale;
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).flat()
      : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}

// Reusable Shader Background Hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  const resize = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;

    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);

    rendererRef.current.setup();
    rendererRef.current.init();

    resize();

    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }

    loop(0);

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvasRef;
};

export const ShaderBackgroundCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: 'black' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,10,33,0.15),rgba(5,3,12,0.72)_58%,rgba(2,2,6,0.9))]" />
    </div>
  );
};

// Lightweight mouse position hook for parallax + proximity
const useMouseParallax = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotStyle, setSpotStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);

    // Update spotlight CSS custom properties
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotStyle({
      '--spot-x': `${pctX}%`,
      '--spot-y': `${pctY}%`,
    } as React.CSSProperties);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, spotStyle, handleMouseMove, handleMouseLeave };
};

// Button microinteraction variants
const buttonVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -3 },
  tap: { scale: 0.97, y: 0 },
};

const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  profileImage,
  className = ""
}) => {
  const { mouseX, mouseY, spotStyle, handleMouseMove, handleMouseLeave } = useMouseParallax();

  // Parallax transforms — subtle shifts for depth
  const textX = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-1, 1], [-4, 4]), springConfig);
  const imgX = useSpring(useTransform(mouseX, [-1, 1], [8, -8]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), springConfig);
  const badgeX = useSpring(useTransform(mouseX, [-1, 1], [-3, 3]), springConfig);
  const badgeY = useSpring(useTransform(mouseY, [-1, 1], [-2, 2]), springConfig);

  // Proximity-based container glow — distance from center drives subtle scale + brightness
  const proximity = useTransform<number, number>(
    [mouseX, mouseY],
    ([mx, my]: number[]) => 1 - Math.min(1, Math.sqrt(mx * mx + my * my))
  );
  const containerScale = useSpring(useTransform(proximity, [0, 1], [1, 1.006]), springConfig);
  const containerBrightness = useTransform(proximity, [0, 1], [1, 1.04]);
  const containerFilter = useTransform(containerBrightness, (v: number) => `brightness(${v})`);

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor spotlight overlay */}
      <div className="hero-spotlight" style={spotStyle} />
      {/* Hero Content Overlay */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center text-white"
        style={{ scale: containerScale, filter: containerFilter }}
      >
        <div className="container mx-auto px-6 lg:px-12">

          {/* Trust Badge — above grid */}
          {trustBadge && (
            <motion.div
              className="flex justify-center lg:justify-start mb-8 animate-fade-in-down"
              style={{ x: badgeX, y: badgeY }}
            >
              <div className="flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 backdrop-blur-md border border-orange-300/25 rounded-full text-sm">
                {trustBadge.icons && (
                  <div className="flex">
                    {trustBadge.icons.map((icon, index) => (
                      <span key={index} className="text-yellow-300">
                        {icon}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-orange-100/90 font-fira-code">{trustBadge.text}</span>
              </div>
            </motion.div>
          )}

          {/* Main Grid: Text + Image */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <motion.div
              className="space-y-6 text-center lg:text-left order-2 lg:order-1"
              style={{ x: textX, y: textY }}
            >
              {/* Greeting */}
              <div className="animate-fade-in-up animation-delay-200">
                <span className="inline-flex items-center gap-2.5 font-fira-code text-sm md:text-base text-orange-400/90 tracking-wider uppercase">
                  <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse shadow-glow-orange" />
                  Hello World, I&apos;m
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rajdhani font-bold bg-gradient-to-r from-orange-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent leading-tight animate-fade-in-up animation-delay-200 drop-shadow-[0_2px_12px_rgba(251,146,60,0.2)]">
                  {headline.line1}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent leading-tight animate-fade-in-up animation-delay-400 drop-shadow-[0_2px_12px_rgba(234,88,12,0.2)]">
                  {headline.line2}
                </h2>
              </div>

              {/* Subtitle */}
              <div className="animate-fade-in-up animation-delay-600">
                <p className="text-base md:text-lg text-orange-100/80 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 text-readable">
                  {subtitle}
                </p>
              </div>

              {/* CTA Buttons */}
              {buttons && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-in-up animation-delay-800">
                  {buttons.primary && (
                    <motion.button
                      onClick={buttons.primary.onClick}
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      transition={springConfig}
                      className="btn-glow-trail px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black rounded-full font-semibold text-lg shadow-lg shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
                    >
                      {buttons.primary.text}
                    </motion.button>
                  )}
                  {buttons.secondary && (
                    <motion.button
                      onClick={buttons.secondary.onClick}
                      variants={buttonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      transition={springConfig}
                      className="btn-glow-trail px-8 py-4 bg-orange-500/10 border border-orange-300/25 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-orange-500/15 hover:shadow-lg hover:shadow-orange-500/15 transition-all duration-300"
                    >
                      {buttons.secondary.text}
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right: Profile Image */}
            {profileImage && (
              <motion.div
                className="flex justify-center order-1 lg:order-2 animate-fade-in-up animation-delay-400"
                style={{ x: imgX, y: imgY }}
              >
                <motion.div
                  className="relative group animate-float"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {/* Outer breathing glow ring */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-500 opacity-40 blur-md group-hover:opacity-70 group-hover:blur-lg animate-glow-pulse transition-all duration-500" />

                  {/* Spinning gradient border */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 animate-spin-slow opacity-60" />

                  {/* Inner static ring for depth */}
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-orange-500/30 via-transparent to-amber-500/30 opacity-80" />

                  {/* Image container */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-orange-900/40 shadow-2xl shadow-orange-500/20 group-hover:shadow-orange-500/35 transition-shadow duration-500">
                    <img
                      src={profileImage}
                      alt="Abhishek Badak"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

export default Hero;
