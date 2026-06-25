// @spec JSONX-DIST-001 JSONX-DIST-002 JSONX-DIST-003 JSONX-DIST-005 JSONX-DIST-006 JSONX-DIST-007 JSONX-DIST-008
// @intent docs/intent/distribution-types/distribution-types-specs.md
import esbuild from "esbuild";
import { nodeBuiltIns } from "esbuild-node-builtins";
import GlobalsPlugin from "esbuild-plugin-globals";

const shouldWatch = process.argv.includes('-w') || process.argv.includes('-watch');
const globalName = 'jsonx';
const entryPoints = ['src/index.ts'];
const webPlugins = [nodeBuiltIns()];
const webCorePlugins = webPlugins.concat([
  GlobalsPlugin({
    react: "React",
    'react-dom': "ReactDOM"
  })],
);
const serverPlugins = [];
const serverExternals = [
  'path',
  '@hookform/error-message',
  'react',
  'react-dom',
  'react-dom/server',
  'react-dom/client',
  'react-dom-factories',
  'create-react-class',
  'react-hook-form',
  'memory-cache',
  'luxon',
  'numeral',
  'ua-parser-js',
];

async function runBuild(options) {
  if (!shouldWatch) return esbuild.build(options);

  const context = await esbuild.context(options);
  await context.watch();
  return { outfile: options.outfile, watch: true };
}



void async function main(){
  try {
    const browserMinifiedBuild = await runBuild({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:true,
      sourcemap:true,
      target:['es2019'],
      plugins: webPlugins,
      outfile:'dist/index.web.min.js'
    });
    const browserBuild = await runBuild({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es2019'],
      plugins: webPlugins,
      outfile:'dist/index.web.js'
    });
    const browserCoreBuild = await runBuild({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es2019'],
      plugins: webCorePlugins,
      outfile:'dist/index.web.core.js'
    });
    const browserCoreMinifiedBuild = await runBuild({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:true,
      sourcemap:true,
      target:['es2019'],
      plugins: webCorePlugins,
      outfile:'dist/index.web.core-min.js'
    });
    const browserCoreLegacyBuild = await runBuild({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es6'],
      plugins: webCorePlugins,
      outfile:'dist/index.web.core-legacy.js'
    });
    const browserCoreLegacyMinifiedBuild = await runBuild({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:true,
      sourcemap:true,
      target:['es6'],
      plugins: webCorePlugins,
      outfile:'dist/index.web.core-legacy-min.js'
    });

    const cjsBuild = await runBuild({
      format:'cjs',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      external: serverExternals,
      sourcemap:false,
      platform:'node',
      plugins: serverPlugins,
      outfile:'dist/index.cjs'
    });
    const esmBuild = await runBuild({
      format:'esm',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      external: serverExternals,
      sourcemap:false,
      platform:'node',
      plugins: serverPlugins,
      outfile:'dist/index.esm.js'
    });

    console.log({
      browserBuild,
      browserMinifiedBuild,
      browserCoreBuild,
      browserCoreMinifiedBuild,
      browserCoreLegacyMinifiedBuild, 
      browserCoreLegacyBuild,
      cjsBuild, 
      esmBuild
    });
  } catch(e){
    console.error(e);
    process.exitCode = 1;
  }
}();
