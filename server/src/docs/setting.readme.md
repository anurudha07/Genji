
```

# Setting Module

## Purpose
Stores dynamic configuration

## Endpoints
- POST /admin/v1/setting/update-value
- GET /admin/v1/setting/value

## Rules
- One document per key
- Only valid keys allowed
- Value type is validated

## Example

Update:
{
  "key": "FEED_DISTANCE_BUCKET",
  "value": [20, 50, 70, 90, 120]
}

Get:
{
  "keys": ["FEED_DISTANCE_BUCKET"]
}

-------------

## Feed Distance Bucket
- Key: FEED_DISTANCE_BUCKET
- Value: array of numbers e.g. [50, 100]
- Defines km boundaries for feed distance sorting
- Default: [50, 100] if not set

```