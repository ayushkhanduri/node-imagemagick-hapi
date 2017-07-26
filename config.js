let configurations = {
    host: "localhost",
    port: 3000,
    dbName: 'serverImages',
    dbUsername: "amazingtea",
    dbPassword: "secretwarspart3",
    getDbUrl: function(){
        return `mongodb://${this.dbUsername}:${this.dbPassword}@ds055862.mlab.com:55862/serverimages`;
    }
}
module.exports = configurations;