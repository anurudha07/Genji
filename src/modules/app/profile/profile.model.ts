import mongoose, { Schema } from "mongoose";
import { IProfile } from "./profile.types";
import { ABOUT, FOOD_TYPES, GENDERS, INTERESTS, LOOKING_FOR, PRONOUNS, RELIGIONS, SEXUAL_ORIENTATIONS, SKIN_TONES, STAR_SIGNS } from "./profile.constants"
const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18"],
      max: [90, "Age must be less than 90"]
    },
    gender: {
      type: String,
      required: true,
      enum: GENDERS
    },
    placeOfBirth: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },        // cm
    weight: {
      type: Number,
      default: 0
    },        // kg
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: ""
    },
    work: {
      type: String,
      default: ""
    },
    about: {
      type: [String],
      enum: ABOUT,
      validate: {
        validator: (arr: string[]) => arr.length >= 4 && arr.length <= 8,
        message: "Select between 4 and 8 about tags",
      },
      required: true
    },
    foodType: {
      type: String,
      default: "",
      enum: FOOD_TYPES,
    },
    skinTone: {
      type: String,
      default: "",
      enum: SKIN_TONES,
    },
    religion: {
      type: String,
      default: "",
      enum: RELIGIONS
    },
    motherTongue: {
      type: String,
      default: ""
    },
    lookingFor: {
      type: [String],
      enum: LOOKING_FOR,
      validate: {
        validator: (arr: string[]) => arr.length >= 1 && arr.length <= 2,
        message: "Select 1 or 2 options for what you're looking for",
      },
      required: true
    },
    starSign: {
      type: String,
      default: "",
      enum: STAR_SIGNS
    },
    pronouns: {
      type: String,
      default: "",
      enum: PRONOUNS,
    },
    sexualOrientation: {
      type: String,
      default: "",
      enum: SEXUAL_ORIENTATIONS
    },
    interestedIn: {
      type: [String],
      enum: GENDERS,
      default: [],
    },
    photos: {
      type: [String],
      validate: { validator: (arr: string[]) => arr.length >= 2 && arr.length <= 4, message: "Upload between 2 and 4 photos" },
      required: true
    },           // max 4 
    premiumPhotos: {
      type: [String],
      default: []
    },
    profileCompletionPercentage: {
      type: Number,
      default: 0
    },
    isCreator: {
      type: Boolean,
      default: false
    },
    bio: {
      type: String,
      default: "",
      maxlength: 80
    },
    interests: {
      type: [String],
      enum: INTERESTS,
      validate: {
        validator: (arr: string[]) => arr.length >= 3 && arr.length <= 5,
        message: "Select between 3 and 5 interests",
      },
      required: true
    },
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", profileSchema);