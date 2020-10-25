require('shelljs/make');

const { readFileSync } = require('fs');
const { parse } = require('dotenv');

function environment(node) {
  const config = parse(readFileSync(`.env.${node}`));

  env['NODE_ENV'] = node;

  for (const key in config) {
    env[key] = config[key];
  }
}

target.start = () => {
  environment('production');
  exec('node dist/index.js');
};

target.lint = () => {
  environment('development');
  exec('eslint . --ext .js,.ts');
};

target.build = () => {
  environment('production');
  rm('-rf', 'dist/*');
  exec('tsc -p tsconfig.json');
};

target.watch = () => {
  environment('development');
  exec('nodemon --config .nodemonrc.json');
};

target.git = ([hook]) => {
  switch (hook) {
    case 'pre-commit':
      target.lint();
      target.build();
      break;
  }
};
