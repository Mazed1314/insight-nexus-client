const Vote = ({ que }) => {
  const { question, _id } = que;

  const getValue = (e) => {
    console.log(e.target.value.value);
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">{question}</p>

      <form onSubmit={getValue} className="">
        <label name="value">yes</label>
        <input type="radio" value={"yes"} />
        <label>no</label>
        <input type="radio" value={"no"} />

        <div className="form-control mt-6">
          <button className="btn bg-black text-xl text-white">submit</button>
        </div>
      </form>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
};

export default Vote;
