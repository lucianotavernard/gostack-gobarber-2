export default {
  url: process.env.MONGO_URL,
  options: {
    authSource: 'admin',
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  }
}
