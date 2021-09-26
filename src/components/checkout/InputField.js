const InputField = ({label, name, isRequired, value, change}) => {
    return (
        <div className="mt-4 flex-1">
            <label htmlFor={name} className="block text-gray-700 font-bold">{label}</label>
            <input required={isRequired} type="text" id={name}
                   name={name}
                   value={value} onChange={change}
                   className="mt-1 rounded border shadow bg-white w-full py-2 px-3 text-gray-700
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
    )
}

export default InputField;
