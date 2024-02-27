import { Workbook } from "exceljs";

export function buildWorksheet(workbook: Workbook, sheetName: string) {
  return workbook.addWorksheet(sheetName);
}
