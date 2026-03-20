
```

# Block Module

## Endpoints
- `GET /block/list` — get my blocked users list
- `POST /block/:targetUserId` — block a user
- `DELETE /block/:targetUserId` — unblock a user

## Rules
- A user cannot block themselves
- Cannot block the same user twice
- Blocked users do not appear in feed

## Pagination
Used in `/block/list`
?page=1&limit=10

```