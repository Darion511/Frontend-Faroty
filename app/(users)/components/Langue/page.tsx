import Image from "next/image";

export default function LangSelect() {
  return (
    <div className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm cursor-pointer hover:shadow transition">
      <Image src="/image 7.png" alt="Langue" width={18} height={18} />
      <select className="bg-transparent outline-none cursor-pointer">
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
