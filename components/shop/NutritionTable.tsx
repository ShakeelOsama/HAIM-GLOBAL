const LABELS: Record<string, string> = {
  calories: "Calories",
  fat: "Total Fat",
  saturatedFat: "Saturated Fat",
  transFat: "Trans Fat",
  carbs: "Total Carbohydrates",
  fiber: "Dietary Fiber",
  sugar: "Total Sugars",
  protein: "Protein",
  sodium: "Sodium",
  cholesterol: "Cholesterol",
};

const UNITS: Record<string, string> = {
  calories: "kcal",
  fat: "g",
  saturatedFat: "g",
  transFat: "g",
  carbs: "g",
  fiber: "g",
  sugar: "g",
  protein: "g",
  sodium: "mg",
  cholesterol: "mg",
};

const INDENTED = new Set(["saturatedFat", "transFat", "fiber", "sugar"]);

interface Props {
  nutrition: Record<string, number>;
}

export default function NutritionTable({ nutrition }: Props) {
  const entries = Object.entries(nutrition).filter(
    ([, v]) => v !== undefined && v !== null
  );
  if (entries.length === 0) return null;

  return (
    <div className="border-2 border-stone-900 rounded-xl overflow-hidden text-stone-900">
      <div className="bg-stone-900 text-white px-4 py-3">
        <p className="font-extrabold text-xl leading-none">Nutrition Facts</p>
        <p className="text-stone-400 text-xs mt-1">Per serving</p>
      </div>
      <div className="px-4 pb-4">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([key, value]) => {
              const isIndent = INDENTED.has(key);
              return (
                <tr key={key} className="border-t border-stone-200">
                  <td
                    className={`py-1.5 ${isIndent ? "pl-4 text-stone-600" : "font-semibold"}`}
                  >
                    {LABELS[key] ?? key}
                  </td>
                  <td className="py-1.5 text-right font-bold tabular-nums">
                    {value}
                    {UNITS[key] ?? ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
