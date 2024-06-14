import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import replace from '@rollup/plugin-replace';
export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/umd/sdk.umd.js',
            format: 'umd',
            name: 'sdk',
            sourcemap: true
        },
        {
            file: 'dist/es/sdk.es.js',
            format: 'es',
            sourcemap: true
        },
        {
            file: 'dist/cjs/sdk.cjs.js',
            format: 'cjs',
            sourcemap: true
        }
    ],

    plugins: [
        nodeResolve(),
        commonjs(),
        typescript(),
        url(),
        postcss({
            extract: ['**/*.css','**/*.less'],
            extensions: ['.css', '.less'],
        }),
        terser()
    ]
};
