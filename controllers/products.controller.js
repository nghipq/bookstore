const http = require('http-status')

const Product = require('../models/products.model')

/**
 * Get all product
 */
module.exports.allProducts = async (req, res) => {
    await Product.find()
            .then(product => {
                if(!product.length) {
                    return res.status(http.NOT_FOUND).json({
                        success: false,
                        message: "No product found!"
                    })
                } else {
                    return res.status(http.OK).json({
                        success: true,
                        product
                    })
                }
            }).catch(() => res.status(http.NOT_FOUND).json({
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
        .then(() => res.status(http.OK).json({
            success: true,
            product: newProduct
        })).catch(() => res.status(http.BAD_REQUEST).json({
            success: false,
            message: "Cannot create this product"
        }))
}

/**
 * get product by id
 */
module.exports.getById = async (req, res) => {
    await Product.findById(req.params.id.toString().trim())
        .then(product => {
            if(product) {
                return res.status(http.OK).json({
                    success: true,
                    product,
                })
            } else {
                return res.status(http.NOT_FOUND).json({
                    success: false,
                    message: "No product found!"
                })
            }
        }).catch(() => res.status(http.NOT_FOUND).json({
            success: false,
            message: "No product found!"
        }))
}

/**
 * delete product by id
 */
module.exports.delById = async (req, res) => {
    await Product.findByIdAndRemove(req.params.id.toString().trim())
        .then(product => {
            if(product) {
                return res.status(http.OK).json({
                    success: true,
                    product
                })
            } else {
                return res.status(http.NOT_FOUND).json({
                    success: false,
                    message: "No product found!"
                })
            }
        }).catch(() => {
            res.status(http.NOT_FOUND).json({
                success: false,
                message: "Failed to delete product"
            })
        })
} 

/**
 * modify product by id
 */
module.exports.modifyById = async (req, res) => {
    const id = req.params.id.toString().trim()
    await Product.findById(id)
        .then(product => {
            if(product) {
                await Product.findByIdAndUpdate(id, req.body)
                    .then((product) => res.status(http.OK).json({
                        success: true,
                        product
                    })).catch(() => res.status(http.BAD_REQUEST).json({
                        success: false,
                        message: "Failed to update product!"
                    }))
            } else {
                return res.status(http.NOT_FOUND).json({
                    success: false,
                    message: "No product found!"
                })
            }
        }).catch(() => res.status(http.NOT_MODIFIED).json({
            success: false,
            message: "Failed to update product!"
        }))
}

/**
 * filter product by price
 */
module.exports.filterByPrice = async (req, res) => {
    const minPrice = (req.query["price-min"]) ? req.query["price-min"] : '0'
    const maxPrice = (req.query["price-max"]) ? req.query["price-max"] : '0'

    if(!maxPrice) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Max price much be greater than 0"
        });
    };

    await Product.find({ price: { $gte: maxPrice, $lte: minPrice }})        
        .exec((err, products) => {
            if(err) {                
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Error query request to sort!"
                });
            };            

            if(!products) {
                return res.status(httpStatus.NOT_FOUND).json({
                    success: false,
                    message: "No products found between this price range"
                });
            };

            return res.status(httpStatus.OK).json({
                success: true,
                products
            });
        });        
}

/**
 * search product by name
 */
module.exports.searchByName = async (req, res) => {
    const name = (req.query.name) ? req.query.name.toString() : '';
    const products = await Product.find()
                        .then(products => {
                            products.filter(product => product.name.indexOf(name) != -1)
                        }).catch(() => res.status(http.NOT_FOUND).json({
                            success: false,
                            message: "No product found!"
                        }))
    if(!products.length) {
        return res.status(http.NOT_FOUND).json({
            success: false,
            message:"No product found!"
        })
    } else {
        return res.status(http.OK).json({
            success: true,
            products
        })
    }
}