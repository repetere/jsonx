import esbuild from "esbuild";
import { nodeBuiltIns } from "esbuild-node-builtins";
import GlobalsPlugin from "esbuild-plugin-globals";

const watch = (process.argv.includes('-w') || process.argv.includes('-watch'))
  ? {
    onRebuild(error,result){
      console.log('rebuilt',{error,result});
    }
  }
  : false;
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



void async function main(){
  try {
    const browserMinifiedBuild = await esbuild.build({
      watch,
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
    const browserBuild = await esbuild.build({
      watch,
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
    const browserCoreBuild = await esbuild.build({
      watch,
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
    const browserCoreMinifiedBuild = await esbuild.build({
      watch,
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
    const browserCoreLegacyBuild = await esbuild.build({
      watch,
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es6'],
      plugins: webCorePlugins,
      outfile:'dist/index.web.core-legacy-min.js'
    });
    const browserCoreLegacyMinifiedBuild = await esbuild.build({
      watch,
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

    const cjsBuild = await esbuild.build({
      watch,
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
    const esmBuild = await esbuild.build({
      watch,
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
  }
}();