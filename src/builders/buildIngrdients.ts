import { Worksheet } from "exceljs";
import { RecipeIngredient } from "../types";

export function buildIngredients(
  sheet: Worksheet,
  ingredients: RecipeIngredient[]
) {
  sheet.mergeCells("A5:C5");
  const ingredientsCell = sheet.getCell("A5");
  ingredientsCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "C45428" },
  };
  ingredientsCell.value = "Ingredientes";
  ingredientsCell.font = { color: { argb: "FFFFFFFF" } };
  const percentage = sheet.getCell("D5");
  percentage.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "C45428" },
  };
  percentage.value = "Porcentagem";
  percentage.font = { color: { argb: "FFFFFFFF" } };
  const unit = sheet.getCell("E5");
  unit.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "C45428" },
  };
  unit.value = "Un. de Medida";
  unit.font = { color: { argb: "FFFFFFFF" } };
  unit.alignment = { vertical: "middle", horizontal: "center" };
  const weight = sheet.getCell("F5");
  weight.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "C45428" },
  };
  weight.value = "Peso";
  weight.font = { color: { argb: "FFFFFFFF" } };

  ingredients.map((i) => {
    sheet.addRow([i.name, "", "", i.percentage, "g", i.weight]);

    sheet.mergeCells(`A${sheet.lastRow?.number}:C${sheet.lastRow?.number}`);
  });
}
