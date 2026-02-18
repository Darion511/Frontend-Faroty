// "use client";

// import { X, User, Mail, Lock, Bell, Shield, Palette, Save } from "lucide-react";
// import { useState } from "react";
// import Image from "next/image";

// type Props = {
//   onClose: () => void;
// };

// type AdminSettings = {
//   nom: string;
//   prenom: string;
//   email: string;
//   telephone: string;
//   photo: string;
//   notifications: {
//     email: boolean;
//     commandes: boolean;
//     stock: boolean;
//     messages: boolean;
//   };
//   securite: {
//     authentification2FA: boolean;
//     sessionExpiration: string;
//   };
//   apparence: {
//     theme: "clair" | "sombre" | "auto";
//     langue: string;
//   };
// };

// export default function SettingsModal({ onClose }: Props) {
//   const [activeTab, setActiveTab] = useState<
//     "profil" | "notifications" | "securite" | "apparence"
//   >("profil");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   const [settings, setSettings] = useState<AdminSettings>({
//     nom: "Dubois",
//     prenom: "Admin",
//     email: "admin@faroty.com",
//     telephone: "+237 6 XX XX XX XX",
//     photo: "/admin-avatar.jpg",
//     notifications: {
//       email: true,
//       commandes: true,
//       stock: true,
//       messages: false,
//     },
//     securite: {
//       authentification2FA: false,
//       sessionExpiration: "24h",
//     },
//     apparence: {
//       theme: "clair",
//       langue: "fr",
//     },
//   });

//   const handleSave = async () => {
//     setIsLoading(true);
//     try {
//       // Appel API pour sauvegarder les paramètres
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log("Paramètres sauvegardés:", settings);
//       alert("Paramètres sauvegardés avec succès !");
//       onClose();
//     } catch (error) {
//       console.error("Erreur:", error);
//       alert("Erreur lors de la sauvegarde");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSettings({ ...settings, photo: reader.result as string });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-5">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-white">Paramètres</h2>
//               <p className="text-purple-100 text-sm">
//                 Gérez vos préférences et votre compte
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div className="flex h-[calc(90vh-140px)]">
//           {/* Sidebar Tabs */}
//           <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-2">
//             <button
//               onClick={() => setActiveTab("profil")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                 activeTab === "profil"
//                   ? "bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white shadow-lg"
//                   : "text-gray-700 hover:bg-white"
//               }`}
//             >
//               <User className="w-5 h-5" />
//               <span className="font-semibold">Profil</span>
//             </button>

//             <button
//               onClick={() => setActiveTab("notifications")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                 activeTab === "notifications"
//                   ? "bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white shadow-lg"
//                   : "text-gray-700 hover:bg-white"
//               }`}
//             >
//               <Bell className="w-5 h-5" />
//               <span className="font-semibold">Notifications</span>
//             </button>

//             <button
//               onClick={() => setActiveTab("securite")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                 activeTab === "securite"
//                   ? "bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white shadow-lg"
//                   : "text-gray-700 hover:bg-white"
//               }`}
//             >
//               <Shield className="w-5 h-5" />
//               <span className="font-semibold">Sécurité</span>
//             </button>

//             <button
//               onClick={() => setActiveTab("apparence")}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                 activeTab === "apparence"
//                   ? "bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white shadow-lg"
//                   : "text-gray-700 hover:bg-white"
//               }`}
//             >
//               <Palette className="w-5 h-5" />
//               <span className="font-semibold">Apparence</span>
//             </button>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 p-6 overflow-y-auto">
//             {/* PROFIL TAB */}
//             {activeTab === "profil" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">
//                     Informations du profil
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Mettez à jour vos informations personnelles
//                   </p>
//                 </div>

//                 {/* Photo de profil */}
//                 <div className="flex items-center gap-6">
//                   <div className="relative">
//                     <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
//                       {settings.photo ? (
//                         <Image
//                           src={settings.photo}
//                           alt="Photo de profil"
//                           width={96}
//                           height={96}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] flex items-center justify-center text-white text-3xl font-bold">
//                           {settings.prenom.charAt(0)}
//                           {settings.nom.charAt(0)}
//                         </div>
//                       )}
//                     </div>
//                     <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-all">
//                       <svg
//                         className="w-4 h-4 text-gray-700"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handlePhotoChange}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">
//                       Photo de profil
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       PNG, JPG jusqu'à 2MB
//                     </p>
//                   </div>
//                 </div>

//                 {/* Informations */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Prénom
//                     </label>
//                     <input
//                       type="text"
//                       value={settings.prenom}
//                       onChange={(e) =>
//                         setSettings({ ...settings, prenom: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Nom
//                     </label>
//                     <input
//                       type="text"
//                       value={settings.nom}
//                       onChange={(e) =>
//                         setSettings({ ...settings, nom: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="email"
//                         value={settings.email}
//                         onChange={(e) =>
//                           setSettings({ ...settings, email: e.target.value })
//                         }
//                         className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Téléphone
//                     </label>
//                     <input
//                       type="tel"
//                       value={settings.telephone}
//                       onChange={(e) =>
//                         setSettings({ ...settings, telephone: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Mot de passe */}
//                 {/* <div className="pt-4 border-t">
//                   <button
//                     onClick={() => setShowPasswordModal(true)}
//                     className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
//                   >
//                     <Lock className="w-5 h-5" />
//                     Modifier le mot de passe
//                   </button>
//                 </div> */}
//               </div>
//             )}

//             {/* NOTIFICATIONS TAB */}
//             {activeTab === "notifications" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">
//                     Préférences de notifications
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Gérez comment vous souhaitez être notifié
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   {/* Email notifications */}
//                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                     <div className="flex items-center gap-3">
//                       <Mail className="w-5 h-5 text-purple-600" />
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           Notifications par email
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Recevoir des notifications par email
//                         </p>
//                       </div>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.notifications.email}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             notifications: {
//                               ...settings.notifications,
//                               email: e.target.checked,
//                             },
//                           })
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                     </label>
//                   </div>

//                   {/* Commandes */}
//                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                     <div className="flex items-center gap-3">
//                       <Bell className="w-5 h-5 text-purple-600" />
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           Nouvelles commandes
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Être notifié des nouvelles commandes
//                         </p>
//                       </div>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.notifications.commandes}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             notifications: {
//                               ...settings.notifications,
//                               commandes: e.target.checked,
//                             },
//                           })
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                     </label>
//                   </div>

//                   {/* Stock */}
//                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                     <div className="flex items-center gap-3">
//                       <Bell className="w-5 h-5 text-purple-600" />
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           Alertes de stock
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Être notifié quand le stock est bas
//                         </p>
//                       </div>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.notifications.stock}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             notifications: {
//                               ...settings.notifications,
//                               stock: e.target.checked,
//                             },
//                           })
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                     </label>
//                   </div>

//                   {/* Messages */}
//                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                     <div className="flex items-center gap-3">
//                       <Bell className="w-5 h-5 text-purple-600" />
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           Messages clients
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           Être notifié des nouveaux messages
//                         </p>
//                       </div>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.notifications.messages}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             notifications: {
//                               ...settings.notifications,
//                               messages: e.target.checked,
//                             },
//                           })
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* SÉCURITÉ TAB */}
//             {activeTab === "securite" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">
//                     Sécurité du compte
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Protégez votre compte administrateur
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   {/* 2FA */}
//                   <div className="p-4 bg-gray-50 rounded-xl">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center gap-3">
//                         <Shield className="w-5 h-5 text-purple-600" />
//                         <div>
//                           <p className="font-semibold text-gray-900">
//                             Authentification à deux facteurs
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             Ajoutez une couche de sécurité supplémentaire
//                           </p>
//                         </div>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={settings.securite.authentification2FA}
//                           onChange={(e) =>
//                             setSettings({
//                               ...settings,
//                               securite: {
//                                 ...settings.securite,
//                                 authentification2FA: e.target.checked,
//                               },
//                             })
//                           }
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                       </label>
//                     </div>
//                     {settings.securite.authentification2FA && (
//                       <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
//                         Configurer maintenant →
//                       </button>
//                     )}
//                   </div>

//                   {/* Expiration de session */}
//                   <div className="p-4 bg-gray-50 rounded-xl">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       Expiration de la session
//                     </label>
//                     <select
//                       value={settings.securite.sessionExpiration}
//                       onChange={(e) =>
//                         setSettings({
//                           ...settings,
//                           securite: {
//                             ...settings.securite,
//                             sessionExpiration: e.target.value,
//                           },
//                         })
//                       }
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                     >
//                       <option value="1h">1 heure</option>
//                       <option value="12h">12 heures</option>
//                       <option value="24h">24 heures</option>
//                       <option value="7j">7 jours</option>
//                       <option value="30j">30 jours</option>
//                     </select>
//                   </div>

//                   {/* Activité récente */}
//                   <div className="p-4 bg-gray-50 rounded-xl">
//                     <h4 className="font-semibold text-gray-900 mb-3">
//                       Activité récente
//                     </h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">
//                           Dernière connexion
//                         </span>
//                         <span className="font-semibold">
//                           Aujourd'hui, 14:32
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Appareil</span>
//                         <span className="font-semibold">Windows • Chrome</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">IP</span>
//                         <span className="font-semibold">192.168.1.1</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* APPARENCE TAB */}
//             {activeTab === "apparence" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">
//                     Personnalisation
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Personnalisez l'apparence de votre interface
//                   </p>
//                 </div>

//                 {/* Thème */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Thème
//                   </label>
//                   <div className="grid grid-cols-3 gap-4">
//                     <button
//                       onClick={() =>
//                         setSettings({
//                           ...settings,
//                           apparence: { ...settings.apparence, theme: "clair" },
//                         })
//                       }
//                       className={`p-4 border-2 rounded-xl transition-all ${
//                         settings.apparence.theme === "clair"
//                           ? "border-purple-500 bg-purple-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <div className="w-full h-20 bg-white rounded-lg mb-2 border border-gray-200"></div>
//                       <p className="text-sm font-semibold">Clair</p>
//                     </button>

//                     <button
//                       onClick={() =>
//                         setSettings({
//                           ...settings,
//                           apparence: { ...settings.apparence, theme: "sombre" },
//                         })
//                       }
//                       className={`p-4 border-2 rounded-xl transition-all ${
//                         settings.apparence.theme === "sombre"
//                           ? "border-purple-500 bg-purple-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <div className="w-full h-20 bg-gray-900 rounded-lg mb-2"></div>
//                       <p className="text-sm font-semibold">Sombre</p>
//                     </button>

//                     <button
//                       onClick={() =>
//                         setSettings({
//                           ...settings,
//                           apparence: { ...settings.apparence, theme: "auto" },
//                         })
//                       }
//                       className={`p-4 border-2 rounded-xl transition-all ${
//                         settings.apparence.theme === "auto"
//                           ? "border-purple-500 bg-purple-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                     >
//                       <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 rounded-lg mb-2"></div>
//                       <p className="text-sm font-semibold">Auto</p>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Langue */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Langue
//                   </label>
//                   <select
//                     value={settings.apparence.langue}
//                     onChange={(e) =>
//                       setSettings({
//                         ...settings,
//                         apparence: {
//                           ...settings.apparence,
//                           langue: e.target.value,
//                         },
//                       })
//                     }
//                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                   >
//                     <option value="fr">Français</option>
//                     <option value="en">English</option>
//                     <option value="es">Español</option>
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             disabled={isLoading}
//             className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-100 transition-all disabled:opacity-50"
//           >
//             Annuler
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={isLoading}
//             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 flex items-center gap-2"
//           >
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     fill="none"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   />
//                 </svg>
//                 Enregistrement...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5" />
//                 Enregistrer
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Modal de changement de mot de passe */}
//       {showPasswordModal && (
//         <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
//       )}
//     </div>
//   );
// }

// // Modal de changement de mot de passe
// function ChangePasswordModal({ onClose }: { onClose: () => void }) {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPasswords, setShowPasswords] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       alert("Les mots de passe ne correspondent pas");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       alert("Mot de passe modifié avec succès !");
//       onClose();
//     } catch (error) {
//       console.error("Erreur:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md">
//         <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-4 rounded-t-3xl">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold text-white">
//               Modifier le mot de passe
//             </h3>
//             <button
//               onClick={onClose}
//               className="text-white hover:bg-white/20 rounded-lg p-2"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Mot de passe actuel
//             </label>
//             <input
//               type={showPasswords ? "text" : "password"}
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Nouveau mot de passe
//             </label>
//             <input
//               type={showPasswords ? "text" : "password"}
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirmer le mot de passe
//             </label>
//             <input
//               type={showPasswords ? "text" : "password"}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
//             />
//           </div>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={showPasswords}
//               onChange={(e) => setShowPasswords(e.target.checked)}
//               className="w-4 h-4 text-purple-600 rounded"
//             />
//             <span className="text-sm text-gray-700">
//               Afficher les mots de passe
//             </span>
//           </label>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50"
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
//             >
//               {isLoading ? "Modification..." : "Modifier"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
