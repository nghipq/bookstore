const http = require('http-status')

const Product = require('../models/products.model')

/**
 * Get all product
 */
module.exports.allProducts = async (req, res) => {
    await Product.find()
            .then(product => {
                if(!product.length) {
                    res.status(404).json({
                        success: false,
                        message: "No product found!"
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        product
                    })
                }
            }).catch(() => res.status(404).json({
                success: false,
                message: "No product found!"
            }))
}

/**
 * Create new product
 */
module.exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body)
    if(!req.body.src) {
        newProduct.src = ""
    }

    await Product.create(newProduct)
        .then(() => res.status(200).json({
            success: true,
            product: newProduct
        })).catch(() => res.status(400).json({
            success: false,
            message: "Cannot create this product"
        }))
}

/**
 * get product by id
 */
module.exports.getById = async (req, res) => {
    res.send("get product by id")
}

/**
 * delete product by id
 */
module.exports.delById = async (req, res) => {
    res.send("delete product by id")
} 

/**
 * sort product by price
 */
module.exports.sortByPrice = async (req, res) => {
    res.send("sort product by price")
}