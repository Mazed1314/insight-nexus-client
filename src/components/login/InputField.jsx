const InputField = ({ label, type, placeholder, register, icon }) => {
  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register}
      />
      {icon && <span className="absolute top-3 right-3 text-xl">{icon}</span>}
    </div>
  );
};

export default InputField;
