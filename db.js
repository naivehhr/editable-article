const Sequelize = require("sequelize");
const config = require("./config");
const uuid = require("node-uuid");

console.log("init sequelize...");

//生成uuid的方法
function generateId() {
  return uuid.v4;
}

//根据配置创建 sequelize 实例
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);
console.log('---------')
sequelize
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch(e => {
    console.log("连接失败");
  });
  console.log('-----1111111----')
//定义统一的 id 类型
const ID_TYPE = Sequelize.STRING(50);
//定义字段的所有类型
const TYPES = [
  "STRING",
  "INTEGER",
  "BIGINT",
  "TEXT",
  "DOUBLE",
  "DATEONLY",
  "BOOLEAN"
];

function defineModel(name, attributes) {
  const attrs = {};
  Object.keys(attributes).forEach(key => {
    const value = attributes[key];
    if (typeof value === "object" && value["type"]) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  });
  //定义通用的属性
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  attrs.createAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updateAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: obj => {
        const noew = Date.now();
        if (obj.isNewRecord) {
          console.log("will create entity..." + obj);
          if (!obj.id) {
            obj.id = generateId();
            obj.createAt = now;
            obj.updateAt = now;
            obj.version = 0;
          } else {
            console.log("will update entity..." + obj);
          }
        }
      }
    }
  });
}

const exp = {
  defineModel,
  sync: async () => {
    if ((process.env.NODE_ENV !== "production")) {
      await sequelize
        .sync({ force: true })
        .then(() => {
          console.log("Create the datebase tables automatically succeed.");
        })
        .catch(e => {
          console.error("Automatically create the database table failed:", e);
        });
        console.log(await)
    } else {
      throw new Error("Cannot sync() when NODE_ENV is set to 'production'.");
    }
  }
};

//模块输出所有字段的类型
TYPES.forEach(type => {
  exp[type] = Sequelize[type];
});

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
