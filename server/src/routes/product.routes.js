import { Router } from "express";
import {
  checkIdValidator,
  createProductValidator,
  updateProductValidator,
} from "../validator/product.validator.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
} from "../controller/product.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1 * 1024 * 1024,
  },
});

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("image"),
  createProductValidator,
  createProductController,
);

router.get("/", authenticate, getAllProductsController);

router.delete("/:id", authenticate, checkIdValidator, deleteProductController);

router.patch(
  "/:id",
  authenticate,
  upload.single("image"),
  updateProductValidator,
  updateProductController,
);

router.get("/:id", authenticate, checkIdValidator, getSingleProductController)

export default router;
