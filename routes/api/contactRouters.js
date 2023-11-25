import express from "express";

import contactsController from "../../controllers/controllers.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/contacts.js";

const contactRouter = express.Router();

contactRouter.get("/", contactsController.getAll);

contactRouter.get("/:id", isValidId, contactsController.getById);

contactRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactRouter.add
);

contactRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactsController.updateById
);

contactRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactRouter;
