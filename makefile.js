require('shelljs/make');

target.start = () => {
  env['NODE_ENV'] = 'production';
  exec('node dist/index.js');
};

target.lint = () => {
  env['NODE_ENV'] = 'development';
  exec('eslint . --ext .js,.ts');
};

target.build = () => {
  env['NODE_ENV'] = 'production';
  rm('-rf', 'dist/*');
  exec('tsc -p tsconfig.json');
};

target.git = ([hook]) => {
  switch (hook) {
    case 'pre-commit':
      target.lint();
      target.build();
      break;
  }
};
