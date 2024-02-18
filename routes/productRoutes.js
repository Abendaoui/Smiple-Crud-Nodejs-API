const express = require('express')
const {
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require('../controllers/productsController')
const router = express.Router()

router.route('/').get(allProducts).post(createProduct)
router
  .route('/:id')
  .get(singleProduct)
  .patch(updateProduct)
  .delete(deleteProduct)

module.exports = router
