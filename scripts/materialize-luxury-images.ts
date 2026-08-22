import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import jet1 from "../src/data/luxury/jet1";
import jet2 from "../src/data/luxury/jet2";
import jet3 from "../src/data/luxury/jet3";
import table1 from "../src/data/luxury/table1";
import table2 from "../src/data/luxury/table2";
import table3 from "../src/data/luxury/table3";
import command1 from "../src/data/luxury/command1";
import command2 from "../src/data/luxury/command2";
import command3 from "../src/data/luxury/command3";
import learning1 from "../src/data/luxury/learning1";
import learning2 from "../src/data/luxury/learning2";
import learning3 from "../src/data/luxury/learning3";

const outputDir = join(process.cwd(), "public", "images");
await mkdir(outputDir, { recursive: true });

const images = {
  "jet.avif": jet1 + jet2 + jet3,
  "table.avif": table1 + table2 + table3,
  "command.avif": command1 + command2 + command3,
  "learning.avif": learning1 + learning2 + learning3,
};

await Promise.all(
  Object.entries(images).map(([name, base64]) =>
    writeFile(join(outputDir, name), Buffer.from(base64, "base64")),
  ),
);

console.log(`Materialized ${Object.keys(images).length} luxury AVIF assets.`);
