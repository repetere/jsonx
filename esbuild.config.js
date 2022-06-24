import esbuild from "esbuild";
import { nodeBuiltIns } from "esbuild-node-builtins";
import GlobalsPlugin from "esbuild-plugin-globals";

const globalName = 'jsonx';
const entryPoints = ['src/index.ts'];
const webPlugins = [nodeBuiltIns()];
const webCorePlugins = webPlugins.concat([
  GlobalsPlugin({
    react: "React",
    'react-dom': "ReactDOM"
  })],
);

void async function main(){
  try {
    const browserMinifiedBuild = await esbuild.build({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:true,
      sourcemap:true,
      target:['es2019'],
      plugins: webPlugins,
      outfile:'dist2/index.web.min.js'
    });
    const browserBuild = await esbuild.build({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es2019'],
      plugins: webPlugins,
      outfile:'dist2/index.web.js'
    });
    const browserCoreBuild = await esbuild.build({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es2019'],
      plugins: webCorePlugins,
      outfile:'dist2/index.web.core.js'
    });
    const browserCoreMinifiedBuild = await esbuild.build({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:true,
      sourcemap:true,
      target:['es2019'],
      plugins: webCorePlugins,
      outfile:'dist2/index.web.core-min.js'
    });
    const browserCoreLegacyBuild = await esbuild.build({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:false,
      sourcemap:true,
      target:['es6'],
      plugins: webCorePlugins,
      outfile:'dist2/index.web.core-legacy-min.js'
    });
    const browserCoreLegacyMinifiedBuild = await esbuild.build({
      format:'iife',
      globalName,
      entryPoints,
      bundle:true,
      minify:true,
      sourcemap:true,
      target:['es6'],
      plugins: webCorePlugins,
      outfile:'dist2/index.web.core-legacy-min.js'
    });
    console.log({browserBuild,browserMinifiedBuild,browserCoreBuild,browserCoreMinifiedBuild,browserCoreLegacyMinifiedBuild, browserCoreLegacyBuild});
  } catch(e){
    console.error(e);
  }
}();