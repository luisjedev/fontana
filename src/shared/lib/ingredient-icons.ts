import type { LucideIcon } from "lucide-react";
import {
	Beef,
	Candy,
	Carrot,
	Circle,
	Coffee,
	Egg,
	Fish,
	Flame,
	Grape,
	IceCream,
	Leaf,
	Milk,
	Nut,
	Scale,
	Soup,
	Wheat,
	Wine,
} from "lucide-react";

export const INGREDIENTS_ICONS: Record<string, LucideIcon> = {
	// Beverages
	coffee: Coffee,
	cafe: Coffee,
	milk: Milk,
	leche: Milk,
	wine: Wine,
	vino: Wine,
	water: Circle,
	agua: Circle,

	// Baking & Grains
	wheat: Wheat,
	trigo: Wheat,
	flour: Wheat,
	harina: Wheat,
	bread: Wheat,
	pan: Wheat,
	sugar: Candy,
	azucar: Candy,

	// Proteins
	meat: Beef,
	carne: Beef,
	beef: Beef,
	chicken: Beef,
	pollo: Beef,
	fish: Fish,
	pescado: Fish,
	egg: Egg,
	huevo: Egg,

	// Vegetables & Fruits
	carrot: Carrot,
	zanahoria: Carrot,
	vegetable: Leaf,
	vegetales: Leaf,
	salad: Leaf,
	ensalada: Leaf,
	fruit: Grape,
	fruta: Grape,
	tomato: Circle,
	tomate: Circle, // Often represented as round/red if color allows, using Circle as fallback

	// Dairy (other than milk)
	cheese: Circle,
	queso: Circle, // Can use specific color in UI
	butter: Circle,
	mantequilla: Circle,

	// Misc
	salt: Scale,
	sal: Scale,
	ice: IceCream,
	hielo: IceCream,
	spicy: Flame,
	picante: Flame,
	soup: Soup,
	sopa: Soup,
	nut: Nut,
	nuez: Nut,
};

export const DEFAULT_INGREDIENT_ICON = Circle;
