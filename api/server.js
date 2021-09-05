const express = require('express')
const app = express()

app.post('/users', (req, res) => res.json(require('./users/users.json')))
// あとは欲しいだけ上記の1行とjsonファイルを追加するだけ

app.listen(8080, () => console.log('usersサーバー応答'))
