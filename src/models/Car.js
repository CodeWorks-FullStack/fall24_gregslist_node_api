import { Schema } from "mongoose";

export const CarSchema = new Schema(
  {
    // NOTE _id property is automatically assigned by database

    make: { type: String, minlength: 3, maxlength: 50, required: true },
    model: { type: String, minlength: 1, maxlength: 100, required: true },
    year: { type: Number, min: 1886, max: 2025, required: true },
    price: { type: Number, min: 0, max: 1000000, required: true },
    imgUrl: { type: String, minlength: 0, maxlength: 500, required: true },
    description: { type: String, minlength: 0, maxlength: 500, required: false },
    // NOTE enum denotes that the property must be one of the values in the array
    engineType: { type: String, enum: ['V6', 'V8', 'V10', '4-cylinder', 'unknown'], default: 'unknown', required: true },
    color: { type: String, minlength: 0, maxlength: 50, required: true },
    // NOTE tags is an array of strings, and each string has a maxlength of 50
    tags: [{ type: String, maxlength: 50 }],
    mileage: { type: Number, min: 0, max: 1000000, required: true },
    hasCleanTitle: { type: Boolean, required: true, default: true },
    // NOTE the creatorId must be an objectId type (24 characters, specific spots are numbers and letters)
    // NOTE each creatorId should match the _id of an account in our accounts collection
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  // OPTIONS OBJECT
  {
    // adds createdAt and updatedAt properties to each car
    timestamps: true,
    // allows us to add virtual properties to our schema
    toJSON: { virtuals: true }
  }
)

// NOTE creates a virtual property on this schema that exists outside of the database
// NOTE the name of the virtual is 'creator'. To run this virtual, you call the populate method in your service and supply the name of the virtual as the argument
CarSchema.virtual('creator', {
  localField: 'creatorId', // use my car's creatorId
  foreignField: '_id', // match my creatorId to an _id
  ref: 'Account', // look for this match in the Account collection
  justOne: true // return a single object
})
