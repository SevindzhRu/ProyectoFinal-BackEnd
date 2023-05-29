const {Router} = require('express')
const router = Router()
// const { productModel } = require("../dao/models/products.model")
const { cartModel } = require('../dao/models/carts.model')
const {ProductManager} = require("../dao/models/ProductManager")
const {auth} = require("../middlewares/autenticacion.middleware.js")
const {loged} = require("../middlewares/loged.middleware.js")
const {notLoged} = require("../middlewares/notLoged.middleware.js")



router.get("/products", async (req, res) => {
  try {
      const { page } = req.query;
      const { payload, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = await ProductManager.getProducts(undefined, page);
      if (page && (page > totalPages || page <= 0 || !parseInt(page))) {
          return res.status(400).send({ status: "error", error: "Pagina inexistente" });
      }
      const role = req.session.user?.role === "admin" ? true : false;
      const object = {
          title: "Productos",
          products: payload,
          user: req.session.user,
          role: role,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
      };
      res.render("products", object);
  } catch (error) {}
});

//Formulario de login
router.get("/login", loged, async (req, res) => {
  const object = {
      title: "Login",
      //products: payload,
  };
  res.render("login", object);
});

//Formulario de register
router.get("/register", loged, async (req, res) => {
  const object = {
      title: "register",
      user: req.session.user,
  };
  res.render("register", object);
});

//Perfil
router.get("/profile", notLoged, async (req, res) => {
  const object = {
      title: "Login",
      user: req.session.user,
  };
  res.render("profile", object);
});



router.get("/carts/:cid", notLoged, auth, async (req, res) => {
  try {
      const { cid } = req.params;
      const role = req.session.user?.role === "admin" ? true : false;
      const cart = await cartManager.getCartById(cid);
      const object = {
          title: "Productos",
          user: req.session.user,
          role: role,
          products: cart.product,
          id: cart._id,
      };
      res.render("carts", object);
  } catch (error) {}
});
  
  module.exports = router