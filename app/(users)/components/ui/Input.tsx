type Props = {
  onChange: (value: string) => void;
};

export default function Input({ onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Rechercher un produit..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-100 rounded-lg px-4 py-2"
    />
  );
}
