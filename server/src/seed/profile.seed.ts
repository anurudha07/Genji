import mongoose from "mongoose";
import User from "../model/auth.model";
import Profile from "../model/profile.model";

const MONGO_URI = "mongodb://localhost:27017/genji-api";

const MY_LNG = 88.1418691;
const MY_LAT = 24.9893512;

// random number between min and max
const rand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

// pick one random item from array
const pick = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// pick 4 random unique items from array
const pick4 = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 4);
};

// pick 3 random unique items from array
const pick3 = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 3);
};

// generate coordinates 0-300km away
// 1 degree = ~111km so 2.7 degrees = ~300km
const nearbyCoords = () => {
    const latOffset = rand(0, 2.7);
    const lngOffset = rand(0, 2.7);
    const lat = MY_LAT + (Math.random() > 0.5 ? latOffset : -latOffset);
    const lng = MY_LNG + (Math.random() > 0.5 ? lngOffset : -lngOffset);
    return [parseFloat(lng.toFixed(4)), parseFloat(lat.toFixed(4))];
};

const MALE_NAMES = [
    "Arjun", "Rahul", "Karan", "Dev", "Rohan", "Nikhil", "Vikram",
    "Aditya", "Akash", "Amit", "Ravi", "Manish", "Deepak", "Rajesh",
    "Vivek", "Ankit", "Rohit", "Gaurav", "Sumit", "Varun", "Ajay",
    "Vijay", "Sanjay", "Manoj", "Yogesh", "Pankaj", "Dinesh", "Tarun",
];

const FEMALE_NAMES = [
    "Priya", "Sneha", "Ananya", "Isha", "Meera", "Tara", "Kavya",
    "Nisha", "Pooja", "Divya", "Anjali", "Neha", "Shreya", "Riya",
    "Simran", "Komal", "Payal", "Swati", "Nidhi", "Preeti", "Sonia",
    "Deepika", "Kriti", "Sakshi", "Mansi", "Tanvi", "Diya", "Aisha",
];

const LAST_NAMES = [
    "Sharma", "Verma", "Patel", "Singh", "Kumar", "Gupta", "Mehta",
    "Nair", "Iyer", "Rao", "Joshi", "Shah", "Desai", "Bose", "Pillai",
    "Reddy", "Menon", "Kapoor", "Tiwari", "Mishra", "Pandey", "Yadav",
];

const CITIES = [
    "Kolkata|West Bengal", "Siliguri|West Bengal", "Asansol|West Bengal",
    "Durgapur|West Bengal", "Burdwan|West Bengal", "Cooch Behar|West Bengal",
    "Patna|Bihar", "Muzaffarpur|Bihar", "Gaya|Bihar", "Bhagalpur|Bihar",
    "Dhanbad|Jharkhand", "Ranchi|Jharkhand", "Jamshedpur|Jharkhand",
    "Agartala|Tripura", "Purnia|Bihar",
];

const ABOUT_OPTIONS = [
    "introvert", "extrovert", "ambivert", "optimist", "realist",
    "dreamer", "sarcastic", "chill", "funny", "adventurous",
    "curious", "creative", "playful", "bold", "shy",
    "confident", "sensitive", "passionate", "night owl", "early bird",
    "homebody", "workaholic", "spontaneous", "laid back", "city person",
    "good listener", "deep thinker", "hopeless romantic", "old soul",
    "loyal", "independent", "empathetic", "kind hearted", "honest",
    "coffee lover", "dog lover", "foodie", "gym lover", "book lover",
    "music lover", "traveller", "nature lover", "open minded", "ambitious",
    "goal oriented", "self aware", "thoughtful", "supportive",
];

const INTEREST_OPTIONS = [
    "football", "cricket", "basketball", "swimming", "cycling",
    "gym", "tennis", "badminton", "running", "hiking",
    "painting", "photography", "dancing", "music", "poetry",
    "films", "literature", "fashion", "writing",
    "cooking", "baking", "coffee", "street food", "tea",
    "backpacking", "solo travel", "road trips", "camping", "trekking",
    "beach trips", "yoga", "meditation", "reading", "journaling",
];

const LOOKING_FOR_OPTIONS = [
    "friendship", "something casual", "dating",
    "long-term relationship", "a life partner",
    "networking", "open to see where things go",
];

const BIOS = [
    "Love hiking and coffee", "Foodie and traveller", "Tech guy who loves music",
    "Artist and dreamer", "Gym and travel", "Books and chai",
    "Musician at heart", "Theatre and poetry lover", "Cyclist and photographer",
    "Yoga and sunsets", "Foodie and coder", "Dance and fashion",
    "Cricket and biryani", "Coffee and sunrises", "Gym rat and foodie",
    "Trekker and camper", "Startup guy", "Art and music",
    "Wanderer", "Beach and books", "Adventure seeker", "Coffee addict",
];

const seed = async () => {

    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await User.deleteMany({ email: /seed/ });
    await Profile.deleteMany({});
    console.log("Cleared old seed data");

    for (let i = 0; i < 100; i++) {

        const gender = i % 2 === 0 ? "male" : "female";
        const firstName = gender === "male" ? pick(MALE_NAMES) : pick(FEMALE_NAMES);
        const lastName = pick(LAST_NAMES);

        // "Kolkata|West Bengal" → city = "Kolkata", state = "West Bengal"
        const cityState = pick(CITIES).split("|");
        const city = cityState[0];
        const state = cityState[1];

        const user = await User.create({
            email: `seed${i + 1}@seed.com`,
            name: firstName + " " + lastName,
            role: "user",
        });

        await Profile.create({
            userId: user._id,
            firstName,
            lastName,
            age: Math.floor(rand(18, 35)),
            gender,
            city,
            state,
            country: "India",
            bio: pick(BIOS),
            about: pick4(ABOUT_OPTIONS),
            interests: pick3(INTEREST_OPTIONS),
            lookingFor: [pick(LOOKING_FOR_OPTIONS)],
            photos: [
                `https://picsum.photos/seed/${i * 2 + 1}/400`,
                `https://picsum.photos/seed/${i * 2 + 2}/400`,
            ],
            location: {
                type: "Point",
                coordinates: nearbyCoords(),
            },
            hasLocationPermission: true,
        });

        console.log(`${i + 1}/100 — ${firstName} ${lastName}`);
    }

    console.log("Done");
    await mongoose.disconnect();
};

seed().catch(err => {
    console.error("Seed failed:", err.message);
    process.exit(1);
});