# Pokemon Hatch Rare Event System

Because I am required to make this a separate thing...

## Events

Events have a name, id, and optional data. If there is no data, the data field will be an empty string for ease of use.

| Name         | ID  | Data             | Chance |
| ------------ | --- | ---------------- | ------ |
| `shiny`      | `1` | None             | 1/4096 |
| `suspicious` | `2` | Suspicious trait | 1/100  |
| `strange`    | `3` | Rank             | 1/50   |

For data fields, see the following tables.

Suspicious Traits:

| Suspicious trait    | Weight |
| ------------------- | ------ |
| `"claw marks"`      | 5      |
| `"pale complexion"` | 5      |
| `"mean eyes"`       | 3      |
| `"ravenous hunger"` | 3      |
| `"likes fishing"`   | 1      |

Rank:

| Rank                  | Weight |
| --------------------- | ------ |
| `"strange"`           | 64     |
| `"unremarkable"`      | 32     |
| `"notably dangerous"` | 16     |
| `"wicked nasty"`      | 8      |
| `"epic"`              | 4      |
| `"legendary"`         | 2      |
| `"australian"`        | 1      |

## API

Routes:

- Roll for a rare event

Located at the base address <http://localhost:4512/>

Returns...

- count (how many events happened)
- list (each rare event)
  - id (id of rare event as explained above)
  - data (optional data associated with the event)

EXAMPLE OUTPUTS

```json
{
  "count": "0",
  "list": []
}
```

```json
{
  "count": "3",
  "list": [
    { "name": "shiny", "id": 1, "data": "" },
    { "name": "suspicious", "id": 2, "data": "likes fishing" },
    { "name": "strange", "id": 3, "data": "epic" }
  ]
}
```

## Installation

Install dependencies:

```bash
npm install
```

Run the program:

```bash
npm run start
```
