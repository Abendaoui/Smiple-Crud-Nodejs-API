const Product = require('../models/productModel')
const { StatusCodes } = require('http-status-codes')

const allProducts = async (req, res) => {
  try {
    const { name, quantity, price, sort } = req.query
    const filterObject = new Object()

    if (name) {
      filterObject.name = { $regex: name, $options: 'i' }
    }

    if (quantity) {
      filterObject.quantity = quantity
    }

    if (price) {
      filterObject.price = price
    }
    let skipSize = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1

    let sortArray = ['createdAt'] // Default sort
    if (sort) {
      sortArray = sort.split(',').map((item) => item.trim())
    }

    const products = await Product.find(filterObject)
      .limit(skipSize)
      .skip((page - 1) * skipSize)
      .sort(sortArray.join(' '))
    res.status(StatusCodes.OK).json({
      products,
      count: products.length,
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (product) {
      return res.status(StatusCodes.OK).json(product)
    }
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Product not found',
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'Product Created Successfully',
      product,
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Product not found',
      })
    res.status(StatusCodes.OK).json({
      product,
      message: 'Product updated successfully',
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Product not found',
      })
    res.status(StatusCodes.OK).json({
      message: 'Product Deleted successfully',
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

module.exports = {
  allProducts,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
