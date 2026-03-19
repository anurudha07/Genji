
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
  "value": 10
}

Get:
{
  "keys": ["FEED_DISTANCE_BUCKET"]
}

```