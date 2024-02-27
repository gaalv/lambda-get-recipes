import { Worksheet } from "exceljs";

export function setColumnsDefaultWidth(sheet: Worksheet, value: number) {
  sheet.columns.forEach((column) => {
    column.width = value;
  });
}
