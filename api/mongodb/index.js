const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://user1:rakus2098@cluster0.rpec9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose
