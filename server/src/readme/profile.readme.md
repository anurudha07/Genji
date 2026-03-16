
```

# Profile Module

## Endpoints
- `GET /profile/me` — get my profile
- `PUT /profile/me` — create or update profile
- `GET /profile/:id` — view someone's full profile (premium locked)
- `GET /profile/card/:id` — simplified explore card
- `POST /profile/photo` — upload photos (max 4)
- `DELETE /profile/photo` — delete a photo
- `POST /profile/premium-photo` — upload premium photos (creators only, max 12)
- `DELETE /profile/premium-photo` — delete a premium photo

## Photo Rules
- Min 2, max 4 regular photos
- Premium photos — creators only, unlocked if paid
- Accepted formats: jpg, png
- Max file size: 5MB per photo

## Profile Completion
- Auto calculated on every save
- Based on filled fields: name, gender, age, city, bio, photos, interests, etc

## Env
```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


```
