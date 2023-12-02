import express from "express";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import contactsController from "../../controllers/contact-controllers.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/contacts.js";

const contactRouter = express.Router();

contactRouter.use(authenticate);

contactRouter.get("/", contactsController.getAll);

contactRouter.get("/:id", isValidId, contactsController.getById);

contactRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
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
