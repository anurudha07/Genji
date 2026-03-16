
```

# Follow Module

## Endpoints
- `GET /follow/followers-list` — get my followers list
- `GET /follow/following-list` — get list of users I follow
- `GET /follow/counts/:userId` — get follower and following counts for a user
- `POST /follow/request/:targetUserId` — send a follow request
- `POST /follow/response/:targetUserId` — accept or decline a follow request
- `PATCH /follow/withdrawal/:targetUserId` — withdraw a follow request
- `DELETE /follow/remove/:targetUserId` — remove someone from my followers list
- `DELETE /follow/:targetUserId` — unfollow a user I follow

## Follow Status
- `pending` — follow request sent, waiting for response
- `accepted` — follow relationship active
- `declined` — request declined or follower removed
- `withdrawal` — request withdrawn or user unfollowed

## Pagination
Used in:
- `/follow/followers-list`
- `/follow/following-list`

Query params:
```
?page=1
&limit=20
```

## Rules
- A user cannot follow themselves
- Only one follow document exists per user pair
- Follow requests must be accepted before appearing in followers/following lists
- Removing a follower sets status to `declined`
- Unfollowing a user sets status to `withdrawal`

```