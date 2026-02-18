import { Pencil, Eye, Trash2 } from "lucide-react";
import { Category } from "@/app/types/product";

type Props = {
  category: Category;
  onDelete: (id: string) => void;
};

export default function CategoryRow({ category, onDelete }: Props) {
  return (
    <tr className="hover:bg-purple-50 transition-all duration-200">
      {/* Nom */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-lg flex items-center justify-center text-white font-bold">
            {category.name.charAt(0)}
          </div>
          <span className="font-semibold text-gray-900">{category.name}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-8 py-5">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all group"
            title="Supprimer"
          >
            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </td>
    </tr>
  );
}
