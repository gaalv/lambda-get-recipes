export interface Ingredient {
  id: string | number[];
  name: string;
  isFlour: boolean;
}

export interface Recipe {
  id: string | number[];
  name: string;
  type: RecipeType;
  output: string;
  difficulty: Difficulty;
  time: string;
  category: string;
  ingredients: RecipeIngredient[];
  preparationSteps: PreparationStep[];
  observation: string;
  selected?: boolean;
}

export interface RecipeIngredient extends Ingredient {
  weight: number;
  percentage: number;
}

export interface PreparationStep {
  id: string | number[];
  description: string;
}

export enum RecipeType {
  WEIGHT = "WEIGHT",
  PERCENTAGE = "PERCENTAGE",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
