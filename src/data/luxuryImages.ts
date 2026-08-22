import jet1 from "./luxury/jet1";
import jet2 from "./luxury/jet2";
import jet3 from "./luxury/jet3";
import table1 from "./luxury/table1";
import table2 from "./luxury/table2";
import table3 from "./luxury/table3";
import command1 from "./luxury/command1";
import command2 from "./luxury/command2";
import command3 from "./luxury/command3";
import learning1 from "./luxury/learning1";
import learning2 from "./luxury/learning2";
import learning3 from "./luxury/learning3";

const avif = (...parts: string[]) => `data:image/avif;base64,${parts.join("")}`;

export const luxuryImages = {
  jet: avif(jet1, jet2, jet3),
  table: avif(table1, table2, table3),
  command: avif(command1, command2, command3),
  learning: avif(learning1, learning2, learning3),
} as const;
