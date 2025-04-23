const route = require("express").Router();
const UserControllers = require("../controllers/UserControllers");
const PurchaseControllers = require("../controllers/PurchaseControllers");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const ProductControllers = require("../controllers/ProductControllers");

route.get("/", (req, res) => {
  res.send("Welcome to the API");
});

route.post("/api/register", UserControllers.userRegister);
route.post("/api/login", UserControllers.userLogin);

route.use(authentication);
route.post("/api/purchase", authentication, PurchaseControllers.purchaseProduct);

route.get("/api/users", authentication, authorization, UserControllers.getAllUser);

route.get("/api/products/:id", authentication, ProductControllers.getProductById)
route.put("/api/products/:id", authentication, ProductControllers.updateProduct)
route.delete("/api/products/:id", authentication, ProductControllers.deleteProduct)

route.post("/api/purchases", authentication, PurchaseControllers.purchaseProduct);
route.get("/api/purchases", authentication, PurchaseControllers.getUserPurchases);



module.exports = route;
