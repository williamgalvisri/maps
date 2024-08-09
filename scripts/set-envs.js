const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config()



const target = './src/app/enviroments/enviroments.ts';

const envFileContent = `
  export const enviroment = {
    mapbox_key: "${process.env.TOKE_BOX_MAP}"
  }
`;

mkdirSync('./src/enviroments', { recursive: true });
writeFileSync(target, envFileContent);
