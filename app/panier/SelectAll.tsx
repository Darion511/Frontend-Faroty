export default function SelectAll() {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="accent-[#8352a5]" />
        Tout sélectionner
      </label>

      <button className="bg-[#8352a5] text-white px-4 py-2 rounded-lg text-sm">
        Supprimer
      </button>
    </div>
  );
}
