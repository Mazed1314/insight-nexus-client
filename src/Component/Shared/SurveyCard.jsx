const SurveyCard = () => {
  const survey_category = "heath";
  function setCardBg() {
    if (survey_category === "education") {
      document.getElementById("card_bg").classList.add("bg-green-400");
    }
    //     if (survey_category === "heath") {
    //       document.getElementById("card_bg").classList.add("bg-blue-400");
    //     }
  }
  setCardBg();
  return (
    <div id="card_bg" className="card w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Survey Title</h2>
        <p>survey question</p>
        <div className="flex justify-center gap-5">
          <button className="btn btn-sm rounded-sm">Vote</button>
          <button className="btn btn-sm rounded-sm">Details</button>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
