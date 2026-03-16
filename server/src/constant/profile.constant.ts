import { IProfile } from "../type/profile.type";

export const INTERESTS = [
  // self care
  "therapy", 
  "meditation", 
  "retreats", 
  "journaling", 
  "sleeping well",
  "skincare", 
  "yoga", 
  "breathwork", 
  "nature walks", 
  "digital detox",
  "self reflection", 
  "reading", 
  "aromatherapy", 
  "sound healing",

  // sports
  "football", 
  "cricket", 
  "basketball", 
  "swimming", 
  "cycling",
  "gym", 
  "tennis", 
  "badminton", 
  "running", 
  "hiking",
  "skating", 
  "volleyball", 
  "martial arts", 
  "boxing",

  // arts & culture
  "painting", 
  "photography", 
  "theatre", 
  "dancing", 
  "music",
  "poetry", 
  "sculpting", 
  "films", 
  "museums", 
  "literature",
  "fashion", 
  "street art", 
  "writing", 
  "animation",

  // food & drink
  "cooking", 
  "baking", 
  "coffee", 
  "wine", 
  "street food",
  "veganism",
  "food blogging", 
  "smoking", 
  "cocktails", 
  "meal prep",
  "food travel", 
  "desserts", 
  "tea", 
  "fermentation",

  // travel & adventure
  "backpacking", 
  "solo travel", 
  "road trips", 
  "camping", 
  "trekking",
  "beach trips", 
  "mountain trips", 
  "van life", 
  "travel photography", 
  "cruises",
  "cultural trips", 
  "adventure sports", 
  "budget travel", 
  "luxury travel",
] as const;

export const GENDERS = [
  "male",
  "female",
  "trans man",
  "trans woman",
  "non-binary",
  "genderqueer",
  "genderfluid",
  "agender",
  "queer",
  "other",
] as const;

export const FOOD_TYPES = [
  "",
  "vegetarian",
  "non-vegetarian",
  "vegan",
  "eggetarian",
] as const;

export const SKIN_TONES = [
  "",
  "fair",
  "wheatish",
  "dusky",
  "dark",
] as const;

export const STAR_SIGNS = [
  "",
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

export const PRONOUNS = [
  "",
  "he/him",
  "she/her",
  "they/them",
  "he/they",
  "she/they",
  "any",
  "other",
] as const;

export const SEXUAL_ORIENTATIONS = [
  "",
  "gay",
  "lesbian",
  "bisexual",
  "pansexual",
  "asexual",
  "queer",
  "straight",
  "other",
] as const;

export const ABOUT = [
  // personality
  "introvert",
  "extrovert",
  "ambivert",
  "optimist",
  "realist",
  "dreamer",
  "sarcastic",
  "chill",
  "funny",
  "adventurous",
  "curious",
  "creative",
  "playful",
  "bold",
  "shy",
  "confident",
  "sensitive",
  "passionate",

  // lifestyle
  "night owl",
  "early bird",
  "homebody",
  "minimalist",
  "workaholic",
  "spontaneous",
  "organized",
  "laid back",
  "always busy",
  "slow living",
  "city person",
  "beach person",
  "mountain person",

  // social traits
  "good listener",
  "deep thinker",
  "hopeless romantic",
  "old soul",
  "family oriented",
  "loyal",
  "independent",
  "empathetic",
  "supportive",
  "thoughtful",
  "kind hearted",
  "protective",
  "honest",

  // habits & preferences
  "coffee lover",
  "tea lover",
  "dog lover",
  "cat lover",
  "plant lover",
  "nature lover",
  "foodie",
  "gym lover",
  "book lover",
  "music lover",
  "movie buff",
  "series binge watcher",
  "podcast listener",

  // fun lifestyle
  "traveller",
  "party lover",
  "festival lover",
  "road trip lover",
  "adrenaline junkie",
  "sunset lover",
  "sunrise lover",
  "photography lover",

  // values
  "open minded",
  "spiritual",
  "ambitious",
  "goal oriented",
  "positive thinker",
  "self aware",
  "growth mindset"
] as const;

export const LOOKING_FOR = [
  "friendship",
  "something casual",
  "dating",
  "long-term relationship",
  "a life partner",
  "networking",
  "open to see where things go",
] as const;

export const RELIGIONS = [
  "",
  "atheist",
  "agnostic",
  "spiritual",
  "hindu",
  "muslim",
  "christian",
  "sikh",
  "buddhist",
  "jain",
  "jewish",
  "bahai",
  "pagan",
  "other",
  "prefer not to say"
] as const;

// -------------------------------------------------

export const COMPLETION_FIELDS: (keyof IProfile)[] = [
  "firstName", "lastName", "gender", "age", "city", "state",
  "bio", "lookingFor", "interests", "about",
  "photos", "pronouns", "height", "work",
  "religion", "starSign", "sexualOrientation", "interestedIn",
];