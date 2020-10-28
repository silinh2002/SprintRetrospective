module.exports = {
  port: process.env.PORT || 3000,
  mongoURL:
    process.env.MONGO_URL ||
    "mongodb+srv://admin:lehoa2002@cluster0.apeq2.mongodb.net/SprintRetrospectiveDB?retryWrites=true&w=majority",
};
