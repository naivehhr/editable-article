// const model = require("./models/model.js");
// // 异步可执行函数
// (async () => {
//   //调用 sync 方法初始化数据库
//   await model.sync();
//   console.log("init db ok!");
//   //初始化成功后退出。这里有个坑，因为 sync 是异步函数，所以要等该函数返回再执行退出程序！
//   process.exit(0);
// })();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("demo", "root", "ABC123abc", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch(e => {
    console.log("连接失败", e);
  });

const User = sequelize.define(
  "user",
  {
    firstName: {
      type: Sequelize.STRING,
      field: "tirst_name"
    },
    lastName: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);
User.sync({ force: true }).then(function() {
  // 已创建数据表
  return User.create({
    firstName: "John",
    lastName: "Hancock"
  });
});
module.exports = sequelize
// export { sequelize };
// process.exit(0);
