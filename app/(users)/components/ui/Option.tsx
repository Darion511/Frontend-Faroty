type Props = {
  title: string;
  desc: string;
  price: string;
  selected?: boolean;
  onSelect?: () => void;
};

export default function DeliveryOption({
  title,
  desc,
  price,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-lg p-4 cursor-pointer transition ${
        selected
          ? "border-[#8352a5] bg-purple-50"
          : "border-gray-300 hover:border-[#8352a5]"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
        <span className="font-semibold text-[#8352a5]">{price}</span>
      </div>
    </div>
  );
}
