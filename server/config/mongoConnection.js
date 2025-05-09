const MongoClient = require("mongodb").MongoClient;
const url = process.env["MONGO_SERVER_URL"];

const settings = {
  mongoConfig: {
    serverUrl: url,
    database: "ReviewMyCourse-DB",
  },
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
