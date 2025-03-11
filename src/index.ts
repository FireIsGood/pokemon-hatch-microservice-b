import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

type ChanceData = { name: string; id: number; chance: number };

const eventTable: ChanceData[] = [
  { name: "shiny", id: 1, chance: 4096 },
  { name: "suspicious", id: 2, chance: 100 },
  { name: "strange", id: 3, chance: 20 },
];

type WeightedData = { data: string; weight: number };

const suspiciousTraitTable: WeightedData[] = [
  { data: "claw marks", weight: 5 },
  { data: "pale complexion", weight: 5 },
  { data: "mean eyes", weight: 3 },
  { data: "ravenous hunger", weight: 3 },
  { data: "likes fishing", weight: 1 },
];

const rankTable: WeightedData[] = [
  { data: "strange", weight: 64 },
  { data: "unremarkable", weight: 32 },
  { data: "notably dangerous", weight: 16 },
  { data: "wicked nasty", weight: 8 },
  { data: "epic", weight: 4 },
  { data: "legendary", weight: 2 },
  { data: "australian", weight: 1 },
];

// Rolls for a specific item of a ranked data table
function rollWeightedData(data: WeightedData[]): WeightedData {
  // Get the total weight to start from
  const weightList = data.map((item) => item.weight);
  const weightTotal = weightList.reduce((prev, curr) => prev + curr, 0);

  // Subtract off weight until we get a value that matches
  let weightOffset = Math.floor(Math.random() * weightTotal);
  const index = weightList.findIndex((value) => {
    if (weightOffset < value) return true;
    weightOffset -= value;
    return false;
  });

  return data[index];
}

// Filters items based on their chance to occur
function rollChanceData(data: ChanceData[]): ChanceData[] {
  const filteredData = data.filter(
    (item) => Math.floor(Math.random() * item.chance) === 0,
  );
  return filteredData;
}

app.get("/", (c) => {
  const triggeredEvents = rollChanceData(eventTable);
  const eventList = triggeredEvents.map((event) => {
    let data = "";
    if (event.id === 2) {
      data = rollWeightedData(suspiciousTraitTable).data;
    }
    if (event.id === 3) {
      data = rollWeightedData(rankTable).data;
    }
    return { name: event.name, id: event.id, data };
  });
  return c.json({ count: eventList.length, list: eventList });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
