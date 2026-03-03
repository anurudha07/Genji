
```

# Auth Module

## Endpoints
- `POST /auth/send-otp` — send OTP to phone
- `POST /auth/verify-otp` — verify OTP, get JWT
- `POST /auth/google` — google login, get JWT

## Security
- OTP hashed with bcrypt, expires in 5 min
- Blocked 30 min after 5 wrong attempts
- Rate limited to 8 requests / 30 mins / IP blocking
- Phone normalized to `+91XXXXXXXXXX`

## Env
```env
SECRET_TOKEN=
GOOGLE_CLIENT_ID=
MONGODB_URI=

```