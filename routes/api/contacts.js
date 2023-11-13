import express from "express";
import * as contactDate from "../../models/contacts/contacts.js";
import { HttpError } from "../../helpers/index.js";
import { contactAddSchema } from "../../validation/schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactDate.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactDate.getContactById(contactId);

    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactDate.addContact(req.body);
    res.status(201).json(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default contactsRouter;
