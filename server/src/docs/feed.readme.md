
```
# Feed Module

## Endpoints
- `GET /feed` — get paginated user feed

## Query Params
?page=1&limit=20

## Feed Logic
- Blocked users are excluded
- Users with accepted, pending or declined follow status are hidden
- Withdrawn follows reappear in feed
- Logged in user never appears in their own feed

## Location Logic
- If no location permission → all users shuffled randomly with distance null
- If location available → users sorted into distance buckets then shuffled within each bucket
- Users with no location go at the end
- Bucket boundaries controlled by FEED_DISTANCE_BUCKET setting (default 50km, 100km)

## Pagination
Handled by getPagination util

```