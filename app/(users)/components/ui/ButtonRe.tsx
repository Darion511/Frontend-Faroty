"use client";

type ButtonReProps = {
  onReset: () => void;
};

export default function ButtonRe({ onReset }: ButtonReProps) {
  const handleReset = () => {
    localStorage.removeItem("filters");
    onReset();
  };

  return (
    <button
      onClick={handleReset}
      className="flex items-center justify-center border border-gray-300 text-[#8352a5] px-4 py-2 rounded-xl hover:border-purple-600 transition"
    >
      Réinitialiser
    </button>
  );
}
