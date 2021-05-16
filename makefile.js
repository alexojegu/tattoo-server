require('dotenv').config();
require('shelljs/make');

target.start = () => {
  env['NODE_ENV'] = 'production';
  exec('node dist/index.js');
};

target.test = () => {
  env['NODE_ENV'] = 'test';
  exec('jest --colors --runInBand');
};

target.lint = () => {
  env['NODE_ENV'] = 'development';
  exec('eslint --color .');
};

target.pretty = () => {
  env['NODE_ENV'] = 'development';
  exec('prettier --write **/*.{graphql,svg}');
};

target.build = () => {
  env['NODE_ENV'] = 'production';
  rm('-r', 'dist/*');
  exec('tsc --project tsconfig.build.json');
  cp('-r', 'src/schemas', 'dist');
};

target.watch = () => {
  env['NODE_ENV'] = 'development';
  exec('nodemon --config .nodemonrc.json');
};
