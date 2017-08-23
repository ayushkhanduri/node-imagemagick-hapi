let configurations = {
    host: "localhost",
    port: 5000,
    dbName: '',
    dbUsername: "",
    dbPassword: "",
    getDbUrl: function(){
        return `mongodb://${this.dbUsername}:${this.dbPassword}@ds055862.mlab.com:55862/serverimages`;
    }
}
module.exports = configurations;