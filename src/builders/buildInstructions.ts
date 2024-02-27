import { Worksheet } from "exceljs";

export function buildInstructions(sheet: Worksheet, instructions: any[]) {
  sheet.addRow(["Modo de preparo"]);
  const instructionsRow = sheet.lastRow;
  sheet.mergeCells(`A${instructionsRow?.number}:F${instructionsRow?.number}`);
  const instructionsCell = sheet.getCell(`A${instructionsRow?.number}`);
  instructionsCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "C45428" },
  };
  instructionsCell.font = { color: { argb: "FFFFFFFF" } };

  instructions.map(({ description }, i) => {
    sheet.addRow([`${i + 1}. ${description}`]);
    sheet.mergeCells(`A${sheet.lastRow?.number}:F${sheet.lastRow?.number}`);
  });
}
