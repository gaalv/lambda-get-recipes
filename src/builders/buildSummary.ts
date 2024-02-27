import { Worksheet } from "exceljs";

export function buildSummary(sheet: Worksheet, recipe: any) {
  const categoryCell = sheet.getCell("A2");
  categoryCell.value = "Categoria";
  categoryCell.font = { bold: true };
  const categoryValueCell = sheet.getCell("B2");
  categoryValueCell.value = recipe.category;
  const performanceCell = sheet.getCell("A3");
  performanceCell.value = "Rendimento";
  performanceCell.font = { bold: true };
  const performanceValueCell = sheet.getCell("B3");
  performanceValueCell.value = recipe.output;
  const timeCell = sheet.getCell("E2");
  timeCell.value = "Tempo";
  timeCell.font = { bold: true };
  const timeValueCell = sheet.getCell("F2");
  timeValueCell.value = recipe.time;
  const difficultyCell = sheet.getCell("E3");
  difficultyCell.value = "Dificuldade";
  difficultyCell.font = { bold: true };
  const difficultyValueCell = sheet.getCell("F3");
  difficultyValueCell.value = recipe.difficulty;
}
