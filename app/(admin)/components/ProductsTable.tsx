export default function ProductsTable() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-[#8352a5]">
          <tr>
            <th className="p-3 text-left">Produit</th>
            <th className="p-3">Catégorie</th>
            <th className="p-3">Marque</th>
            <th className="p-3">Prix</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td className="p-3">Cartouche Epson XP-235</td>
            <td className="p-3 text-center">Consommables</td>
            <td className="p-3 text-center">Epson</td>
            <td className="p-3 text-center">1 300 FCFA</td>
            <td className="p-3 text-center text-green-600">En stock</td>
            <td className="p-3 text-center space-x-2">
              <button className="text-blue-500">Modifier</button>
              <button className="text-red-500">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
