import ExcelJS from "exceljs";
import {
  buildHeader,
  buildIngredients,
  buildInstructions,
  buildSummary,
  buildWorksheet,
} from "./builders";
import { setColumnsDefaultWidth } from "./utils";

const fakeRecipe = {
  id: "123",
  name: "Spaghetti Carbonara",
  type: "WEIGHT",
  output: "4 servings",
  difficulty: "MEDIUM",
  time: "30 minutes",
  category: "Italian",
  ingredients: [
    { name: "Spaghetti", weight: "400", unit: "g", percentage: "100" },
    { name: "Eggs", weight: "400", unit: "g", percentage: "100" },
    {
      name: "Pancetta or guanciale",
      weight: "400",
      unit: "g",
      percentage: "100",
    },
    { name: "Parmesan cheese", weight: "400", unit: "g", percentage: "100" },
    { name: "Black pepper", weight: "400", unit: "g", percentage: "100" },
    { name: "Salt", weight: "400", unit: "g", percentage: "100" },
  ],
  preparationSteps: [
    {
      stepNumber: 1,
      description:
        "Boil water in a large pot, add salt, and cook spaghetti until al dente.",
    },
    {
      stepNumber: 2,
      description:
        "In a bowl, whisk eggs, grated Parmesan cheese, and black pepper.",
    },
    {
      stepNumber: 3,
      description: "In a pan, fry diced pancetta until crispy.",
    },
    {
      stepNumber: 4,
      description:
        "Drain spaghetti, add it to the pan with pancetta, and mix well.",
    },
    {
      stepNumber: 5,
      description:
        "Remove the pan from heat, quickly pour in the egg mixture, and stir until creamy.",
    },
    {
      stepNumber: 6,
      description:
        "Serve immediately, garnished with extra Parmesan cheese and black pepper.",
    },
  ],
  observation:
    "This classic Italian pasta dish is rich, creamy, and satisfying.",
  selected: true, // Just for demonstration, can be omitted or set to false
};
const fakeRecipe2 = {
  id: "456",
  name: "Grilled Chicken Salad",
  type: "WEIGHT",
  output: "2 servings",
  difficulty: "MEDIUM",
  time: "20 minutes",
  category: "Salad",
  ingredients: [
    { name: "Chicken breasts", weight: "400", unit: "g", percentage: "100" },
    { name: "Lettuce", weight: "400", unit: "g", percentage: "100" },
    { name: "Tomatoes", weight: "400", unit: "g", percentage: "100" },
    { name: "Cucumbers", weight: "400", unit: "g", percentage: "100" },
    { name: "Red onion", weight: "400", unit: "g", percentage: "100" },
    { name: "Olive oil", weight: "400", unit: "g", percentage: "100" },
    { name: "Lemon juice", weight: "400", unit: "g", percentage: "100" },
    { name: "Salt", weight: "400", unit: "g", percentage: "100" },
    { name: "Black pepper", weight: "400", unit: "g", percentage: "100" },
  ],
  preparationSteps: [
    { stepNumber: 1, description: "Preheat grill to medium-high heat." },
    {
      stepNumber: 2,
      description:
        "Season chicken breasts with salt and pepper, then grill until cooked through, about 6-7 minutes per side.",
    },
    {
      stepNumber: 3,
      description: "Chop lettuce, tomatoes, cucumbers, and red onion.",
    },
    { stepNumber: 4, description: "Slice grilled chicken breasts." },
    {
      stepNumber: 5,
      description:
        "In a large bowl, combine lettuce, tomatoes, cucumbers, and red onion.",
    },
    {
      stepNumber: 6,
      description:
        "Drizzle olive oil and lemon juice over the salad, season with salt and pepper, and toss to combine.",
    },
    {
      stepNumber: 7,
      description: "Top the salad with sliced grilled chicken breasts.",
    },
    { stepNumber: 8, description: "Serve immediately." },
  ],
  observation:
    "This refreshing salad with grilled chicken is perfect for a light and healthy lunch.",
  selected: false, // Just for demonstration, can be omitted or set to false
};
const fakeRecipe3 = {
  id: [789, 890],
  name: "Banana Pancakes",
  type: "WEIGHT",
  output: "6 pancakes",
  difficulty: "MEDIUM",
  time: "15 minutes",
  category: "Breakfast",
  ingredients: [
    { name: "Bananas", weight: "400", unit: "g", percentage: "100" },
    { name: "Eggs", weight: "400", unit: "g", percentage: "100" },
    { name: "Flour", weight: "400", unit: "g", percentage: "100" },
    { name: "Milk", weight: "400", unit: "g", percentage: "100" },
    { name: "Baking powder", weight: "400", unit: "g", percentage: "100" },
    { name: "Salt", weight: "400", unit: "g", percentage: "100" },
    { name: "Butter", weight: "400", unit: "g", percentage: "100" },
    { name: "Maple syrup", weight: "400", unit: "g", percentage: "100" },
  ],
  preparationSteps: [
    { stepNumber: 1, description: "In a bowl, mash bananas until smooth." },
    {
      stepNumber: 2,
      description:
        "Add eggs, flour, milk, baking powder, and salt to the mashed bananas, and whisk until well combined.",
    },
    {
      stepNumber: 3,
      description:
        "Heat a non-stick skillet or griddle over medium heat and melt a little butter.",
    },
    {
      stepNumber: 4,
      description: "Pour 1/4 cup of batter onto the skillet for each pancake.",
    },
    {
      stepNumber: 5,
      description:
        "Cook until bubbles form on the surface, then flip and cook until golden brown on the other side.",
    },
    { stepNumber: 6, description: "Repeat with the remaining batter." },
    { stepNumber: 7, description: "Serve warm with maple syrup." },
  ],
  observation:
    "These fluffy banana pancakes are a delicious and easy breakfast option.",
  selected: false, // Just for demonstration, can be omitted or set to false
};

const recipeArr = [fakeRecipe, fakeRecipe2, fakeRecipe3];

export async function handler() {
  const workbook = new ExcelJS.Workbook();

  recipeArr.map((recipe) => {
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
