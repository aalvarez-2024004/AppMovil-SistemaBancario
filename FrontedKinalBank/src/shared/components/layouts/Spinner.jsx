export const Spinner = ({ text = "Cargando..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="mt-3 text-gray-600 text-sm">{text}</span>
        </div>
    )
}