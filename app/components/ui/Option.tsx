export default function DeliveryOption({
  title,
  desc,
  price,
}: {
  title: string;
  desc: string;
  price: string;
}) {
  return (
    <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-purple-600 transition">
      <div className="flex items-start gap-3">
        <input
          type="radio"
          name="delivery"
          className="mt-1 accent-purple-600"
        />
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
        {price}
      </span>
    </label>
  );
}
