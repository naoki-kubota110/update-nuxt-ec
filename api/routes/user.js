const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const orderController = require("../controllers/orderController")

// ユーザーの一覧を取得
router.get('/all', userController.getAllUser)
// ユーザーを新規登録
router.post('/register', userController.userRegister)
// 登録済みユーザーのログイン
router.post('/login', userController.userLogin)
// token認証
router.get('/auth', userController.userAuth)

router.post('/all-orders', orderController.getAllOrders)
// カートが空の状態から新たに商品を追加
router.post('/new-cart', orderController .newCart)
// カートに商品が１つ以上あり、商品を追加
router.post('/add-cart', orderController.addCart)
// カートから商品を削除
router.post('/delete-cart', orderController.deleteCart)
// カート内の商品の注文を実行
router.post('/send-order', orderController.sendOrder)
// 注文が完了した商品のキャンセル
router.post("/cancel-order", orderController.cancelOrder)

module.exports = router
