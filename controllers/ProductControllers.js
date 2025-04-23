const { Product } = require("../models");

class ProductControllers {
    static async createProduct(req, res, next) {
        try {
            const {name, price} = req.body;

            // Validate Input
            if (!name || !price) {
                throw { status: 400, message: "Bad Request" };
            }

            // Create Product
            const newProduct = await Product.create({name, price});

            res.status(201).json({ message: "Product Created", data: newProduct });
        } catch (error) {
            next(error);
        }

    }

    static async getAllProduct(req, res, next) {
        try {
            const dataProduct = await Product.findAll({ 
                attributes: ["id", "name", "createdAt", "updatedAt"]
            });
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const {id} = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                throw { status: 404, message: "Product Not Found" };
            }

            res.status(200).json({ message: "Product Found", data: product });
            
        } catch (error) {
            next(error);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const {id} = req.params;
            const {name, price} = req.body;

            // Validate Input
            if (!name || !price) {
                throw { status: 400, message: "Bad Request" };
            }

            const Product = await Product.findByPk(id);

            if (!Product) {
                throw { status: 404, message: "Product Not Found" };
            }

            // Update Product
            await Product.update({name, price});

            res.status(200).json({ message: "Product Updated", data: Product });
        } catch (error) {
            next(error);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const {id} = req.params;
            const Product = await Product.findByPk(id);

            if (!Product) {
                throw { status: 404, message: "Product Not Found" };
            }

            // Delete Product
            await Product.destroy();

            res.status(200).json({ message: "Product Deleted" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductControllers