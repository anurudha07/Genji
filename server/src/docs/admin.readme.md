
```

# Admin Module

## Endpoints
- `POST /admin/v1/auth/send-otp` — send OTP to admin
- `POST /admin/v1/auth/verify-otp` — verify OTP and login
- `POST /admin/v1/setting/update-value` — update setting value
- `GET /admin/v1/setting/value` — get setting values

## Headers
Authorization: Bearer <TOKEN>

## Access Control
- Only users with role `admin` can access these APIs
- JWT token required in headers

## Security
- OTP hashed with bcrypt, expires in 5 min
- Blocked 30 min after 5 wrong attempts
- Rate limited to 8 requests / 30 mins / IP blocking
- Phone normalized to `+91XXXXXXXXXX`

## Settings
- Admin can update system-wide configuration
- Each setting key is unique (one document per key)
- Supports dynamic values (number, string, boolean, array, object)
- Uses upsert → creates setting if not exists
- Supports fetching multiple keys at once

## Rules
- Admin must exist in DB with role `admin`
- Invalid token → 401 Unauthorized
- Wrong role → 403 Access denied
- Only valid setting keys are allowed

```