import ButtonM from "../components/ui/ButtonM";
import InputA from "../components/ui/InputA";
import DeliveryOption from "../components/ui/Option";
import ResumePanier from "../panier/ResumePanier";
export default function AdresseLivraison() {
  return (
    <section className=" max-w-7xl mt-10 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ÉTAPE 1 */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex flex-col bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-[#8352a5] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                1
              </span>
              Adresse de livraison
            </h2>
            <ButtonM />
          </div>

          {/* FORMULAIRE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputA label="Nom" />
            <InputA label="Prénom" />
            <InputA label="Numéro de téléphone" />
            <InputA label="Adresse électronique (facultatif)" />
            <InputA label="Ville" />
            <InputA label="Quartier" />
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-[#8352a5] hover:bg-[#6b428a] text-white px-6 py-2 rounded-lg transition">
              Enregistrer et continuer
            </button>
          </div>
        </div>
        {/* ÉTAPE 2 */}
        <div className="flex flex-col bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <span className="bg-[#8352a5] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                2
              </span>
              Mode de livraison
            </h2>
            <ButtonM />
          </div>

          <div className="space-y-4">
            <DeliveryOption
              title="Livraison à domicile"
              desc="Recevez votre commande chez vous"
              price="+ 0 FCFA"
            />
            <DeliveryOption
              title="Retrait en magasin"
              desc="Venez récupérer votre commande"
              price="+ 0 FCFA"
            />
          </div>
        </div>
      </div>
      <ResumePanier />
    </section>
  );
}
