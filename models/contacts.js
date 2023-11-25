import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const genreList = ["fantastic", "love story"];
const releaseYearRegexp = /^\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `name must be exist`,
  }),
  email: Joi.string().required().messages({
    "any.required": `email must be exist`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `phone must be exist`,
  }),
});

export const contactUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  favorite: Joi.boolean(),
  genre: Joi.string().valid(...genreList),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contacts", contactSchema);

export default Contact;
