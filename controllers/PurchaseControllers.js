const { Model } = require("sequelize");
const {Purchase, User, sequelize} = require("../models")


class PurchaseControllers {
    
    static async purchaseProduct(req, res) {

        const t = await sequelize.transaction()
        
        try{
            const {productId} = req.body;

            //Validasi input sederhana
            if (!productId) {
                throw { status: 400, message: "Bad Request" };
            }

            // cek produk valid
            const product = await Product.findByPK(Number(productId));

            if (!product) { 
                return res.status(404).json({ message: "Product Not Found" });    
            }

            const newPurchase = await Purchase.create({
                userId: req.user.id,
                productId: productId
            }, {transaction: t})

            await t.commit()

            res.status(201).json({message : "Purchase Success", data: newPurchase})

        } catch (error) {
            await t.rollback()
            res.status(500).json({message : "Internal Server Error", error: error.message})

        }
    }

    static async getUserPurchases(req, res, next) {
        try{
            const userId = req.user.id;

            const purchases = await Purchase.findAll({
                where: {userId: userId}, 
                include : [{
                    Model : ProductControllers,
                    as : "product",
                    attributes : ["id", "name", "price"],
                }]
            })
            
            res.status(200).send({
                message : "User purchases found",
                data : purchases
            })
        }catch{
            next(error)
        }   
    }
}   

module.exports = PurchaseControllers