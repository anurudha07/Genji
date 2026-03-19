
```

# Auth Module

## Endpoints
- `POST /auth/send-otp` — send OTP to phone
- `POST /auth/verify-otp` — verify OTP, get JWT
- `POST /auth/google` — google login, get JWT

## Headers
Authorization: Bearer <TOKEN>

## Security
- OTP hashed with bcrypt, expires in 5 min
- Blocked 30 min after 5 wrong attempts
- Rate limited to 8 requests / 30 mins / IP blocking
- Phone normalized to `+91XXXXXXXXXX`

## Rules
- User must verify OTP to login
- New user is created automatically on first login
- Only users with role `user` can login here
- Admin users cannot login via user auth API

```