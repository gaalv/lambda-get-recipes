import { Worksheet } from "exceljs";

export function buildHeader(sheet: Worksheet, recipeName: string) {
  sheet.mergeCells("A1:F1");
  const headerCell = sheet.getCell("A1");
  headerCell.value = recipeName;
  headerCell.alignment = { horizontal: "center" };
  headerCell.font = { size: 12, color: { argb: "FFFFFFFF" } };
  headerCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "C45428" },
  };
}
