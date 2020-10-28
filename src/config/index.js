module.exports = {
  port: process.env.PORT || 1000,
  mongoURL:
    process.env.MONGO_URL ||
    "mongodb+srv://admin:root@cluster0.apeq2.mongodb.net/SprintRetrospectiveDB?retryWrites=true&w=majority",
};
