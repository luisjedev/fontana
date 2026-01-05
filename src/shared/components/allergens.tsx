import {
	Bean,
	Carrot,
	CircleDot,
	Droplets,
	Egg,
	Fish,
	Flower,
	GlassWater,
	Milk,
	Nut,
	Shell,
	Wheat,
} from "lucide-react";

export type AllergenName =
	| "Gluten"
	| "Crustáceos"
	| "Huevos"
	| "Pescado"
	| "Cacahuetes"
	| "Soja"
	| "Leche"
	| "Frutos de cáscara"
	| "Apio"
	| "Mostaza"
	| "Granos de sésamo"
	| "Dióxido de azufre y sulfitos"
	| "Altramuces"
	| "Moluscos";

export const ALLERGEN_ICONS: Record<AllergenName, React.ElementType> = {
	Gluten: Wheat,
	Crustáceos: Shell, // Representación genérica
	Huevos: Egg,
	Pescado: Fish,
	Cacahuetes: Nut,
	Soja: Bean,
	Leche: Milk,
	"Frutos de cáscara": Nut, // Reutilizamos Nut o usamos Leaf si queremos distinguir
	Apio: Carrot, // Lucide no tiene apio específico, Carrot es lo más cercano visualmente a vegetal alargado
	Mostaza: GlassWater, // Dificil, usaremos un icono genérico o tal vez Droplets por salsa
	"Granos de sésamo": CircleDot, // Semillas
	"Dióxido de azufre y sulfitos": Droplets, // Preservativos liquidos/quimicos
	Altramuces: Flower, // Lupins son flores/legumbres
	Moluscos: Shell, // Similar a crustaceos, usaremos Shell
};

export const ALLERGEN_LIST: AllergenName[] = [
	"Gluten",
	"Crustáceos",
	"Huevos",
	"Pescado",
	"Cacahuetes",
	"Soja",
	"Leche",
	"Frutos de cáscara",
	"Apio",
	"Mostaza",
	"Granos de sésamo",
	"Dióxido de azufre y sulfitos",
	"Altramuces",
	"Moluscos",
];
