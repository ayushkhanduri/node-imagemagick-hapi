let configurations = {
    host: "localhost",
    port: 5000,
    dbName: '',
    dbUsername: "",
    dbPassword: "",
    getDbUrl: function(){
        return `mongodb://${this.dbUsername}:${this.dbPassword}@`;
    }
}
module.exports = configurations;
