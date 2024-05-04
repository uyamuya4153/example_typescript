const { argv } = require("process");
const { build } = require("esbuild");
const path = require("path");

const options = {
  define: { "process.env.NODE_ENV": '"development"' },
  entryPoints: [path.resolve(__dirname, "src/index.tsx")],
  minify: argv[2] === "production",
  bundle: true,
  target: "es2016",
  platform: "browser",
  outdir: path.resolve(__dirname, "dist"),
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
  loader: {
    ".svg": "dataurl",
  },
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
