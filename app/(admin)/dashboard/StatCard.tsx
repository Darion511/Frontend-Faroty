export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      {/* Icône */}
      <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
        {icon}
      </div>

      {/* Texte */}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
