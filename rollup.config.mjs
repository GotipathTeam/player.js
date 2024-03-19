// rollup.config.mjs
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

export default async function ({ watch }) {
  const builds = []
  builds.push({
    input: ['src/index.js'],
    plugins: [json()],
    output: [
      {
        dir: 'dist/',
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    ],
  })

  // Minified iife
  builds.push({
    input: 'dist/index.js',
    plugins: [
      terser({
        compress: { ecma: 2019 },
      }),
    ],
    output: {
      file: 'dist/player.js',
      format: 'umd',
      esModule: false,
      name: 'idb',
    },
  })

  return builds
}
