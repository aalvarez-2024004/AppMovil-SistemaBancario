export const Badge = ({ value }) => {
    const colors = {
        ACTIVE:    "bg-emerald-100 text-emerald-700",
        INACTIVE:  "bg-red-100 text-red-600",
        FROZEN:    "bg-blue-100 text-blue-700",
        ACTIVA:    "bg-emerald-100 text-emerald-700",
        BLOQUEADA: "bg-red-100 text-red-600",
        AHORRO:    "bg-sky-100 text-sky-700",
        MONETARIA: "bg-blue-100 text-blue-800",
        CREDITO:   "bg-amber-100 text-amber-700",
        GTQ:       "bg-teal-100 text-teal-700",
        USD:       "bg-blue-100 text-blue-700",
        EUR:       "bg-indigo-100 text-indigo-700",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${colors[value] ?? "bg-gray-100 text-gray-600"}`}>
            {value}
        </span>
    );
};