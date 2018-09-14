// import { sequelize } from "./init-db";
// import { sequelize } from "./init-db";

// const sequelize = require('./init-db')


async function query(){
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('huhaoran')
    }, 2000);
  })
  console.log('result', result)
}

query()