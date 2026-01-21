export default function ResumePanier() {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 h-fit">
      <h3 className="font-semibold text-lg text-[#8352a5]">Détail du Panier</h3>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Sous-total</span>
        <span>20 000 FCFA</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Frais de livraison</span>
        <span>0 FCFA</span>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-gray-900">
        <span>Total général</span>
        <span>22 000 FCFA</span>
      </div>

      <button className="w-full bg-[#8352a5] text-white py-3 rounded-lg hover:opacity-90">
        Commander
      </button>
    </div>
  );
}
