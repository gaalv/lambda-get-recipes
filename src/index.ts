import ExcelJS from "exceljs";
import {
  buildHeader,
  buildIngredients,
  buildInstructions,
  buildSummary,
  buildWorksheet,
} from "./builders";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { setColumnsDefaultWidth } from "./utils";
import { Recipe } from "./types";

export async function handler(event: APIGatewayProxyEventV2) {
  if (!event.body) {
    return {
      statusCode: 400,
      body: {
        message: "Empty body",
      },
    };
  }

  const { recipes } = JSON.parse(event.body) as { recipes: Recipe[] };

  const workbook = new ExcelJS.Workbook();

  recipes.map((recipe) => {
    const sheet = buildWorksheet(workbook, recipe.name);

    buildHeader(sheet, recipe.name);

    buildSummary(sheet, recipe);

    buildIngredients(sheet, recipe.ingredients);

    buildInstructions(sheet, recipe.preparationSteps);

    setColumnsDefaultWidth(sheet, 15);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return {
    statusCode: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="receitas.xlsx"',
    },
    //@ts-ignore
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
}
