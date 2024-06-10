// images
import dustbin from "../../assets/images/dustbin.svg";
import ticketArrows from "../../assets/images/topArrow.svg";
import pencil from "../../assets/images/pencil.svg";

const HostTicketCard = () => {
  return (
    <div className="tickets">
      <div className="ticketLeft">
        <h3>Tier 1</h3>
        <p>£ 25</p>
        <p>9 Available</p>
      </div>
      <div className="ticketRight">
        <img src={dustbin} alt="" />
        <div className="ticketArrows">
          <img src={ticketArrows} alt="" />
          <img src={pencil} alt="" />
          <img src={ticketArrows} className="arrowTwo" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HostTicketCard;
