const Input = ({ id, text, value, handleChange }) => {
  return (
    <div className="flex flex-col items-start font-semibold text-black/80">
      <label htmlFor={id}>{text}</label>
      <input
        type="datetime-local"
        className="p-2 shadow-sm border border-transparent hover:shadow-lg focus:shadow-lg shadow-black/30 rounded-lg duration-200 outline-none focus:border-green-600"
        value={value}
        name={id}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
