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
      min: 18,
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
      default: ""
    },
    state: {
      type: String,
      default: ""
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
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 8,
        message: "Maximum 8 about tags are allowed",
      },
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
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 2,
        message: "Max 2 looking for",
      },
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
      default: [],
      validate: { validator: (arr: string[]) => arr.length >= 2 && arr.length <= 4, message: "Minimum of 2 photos and maximum of 4 photos are allowed for now" },
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
      maxlength: 20
    },
    interests: {
      type: [String],
      enum: INTERESTS,
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 5,
        message: "Max 5 interests allowed",
      },
    },
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", profileSchema);