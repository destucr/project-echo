import { useEffect, useRef } from 'react';

const TriangleShader = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size to match display size
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Set viewport to match canvas size
        gl.viewport(0, 0, canvas.width, canvas.height);

        const vertexShaderSource = `
      attribute vec2 position;
      attribute vec3 color;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragmentShaderSource = `
      precision mediump float;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

        // Create and compile shaders
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        // Create and link program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Create vertex buffer
        const vertices = new Float32Array([
            0.0, 0.5,    // Top vertex
            -0.5, -0.5,  // Bottom left vertex
            0.5, -0.5    // Bottom right vertex
        ]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Create color buffer
        const colors = new Float32Array([
            1.0, 0.0, 0.0,  // Red
            0.0, 1.0, 0.0,  // Green
            0.0, 0.0, 1.0   // Blue
        ]);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

        // Set up attributes
        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        const colorLocation = gl.getAttribLocation(program, 'color');
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorLocation);

        // Clear and draw
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // Cleanup
        return () => {
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(vertexBuffer);
            gl.deleteBuffer(colorBuffer);
        };
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto bg-black rounded-lg border border-gray-700 shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-gray-400 text-sm">WebGL Triangle</span>
            </div>
            <canvas
                ref={canvasRef}
                className="w-full h-64"
            />
        </div>
    );
};

export default TriangleShader;