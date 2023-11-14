import express from "express";
import contactDate from "../../models/contacts/contacts.js";
import { HttpError } from "../../helpers/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../validation/schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactDate.listContacts();
    res.status(200).json(result);
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
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: "not found",
    });
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
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactDate.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactDate.updateListContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: "missing fields",
    });
  }
});

export default contactsRouter;
