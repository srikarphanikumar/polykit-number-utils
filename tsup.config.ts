import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/react/index.ts',
        'src/angular/index.ts'
    ],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true,  // Added minification
    external: [    // Mark these as external to ensure they're not bundled
        'react',
        '@angular/core'
    ]
});