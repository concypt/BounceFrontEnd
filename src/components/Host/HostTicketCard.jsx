import PropTypes from "prop-types";
// images
import dustbin from "../../assets/images/dustbin.svg";
import ticketArrows from "../../assets/images/topArrow.svg";
import pencil from "../../assets/images/pencil.svg";

const HostTicketCard = ({
  ticket,
  orgCommition,
  isCurrent,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
}) => {

  return (
    <div className={`tickets ${isCurrent}`}>
      <div className="ticketLeft">
        <h3 className={ticket.status ? "active" : ""}>{ticket.name}</h3>
        <p>£ {ticket.price}</p>
        <p>{ticket.quantity} Available</p>
      </div>
      <div className="ticketRight">
        <img src={dustbin} alt="Delete" onClick={onDelete} />
        <div className="ticketArrows">
          <img src={ticketArrows} alt="Move Up" onClick={onMoveUp} />
          <img src={pencil} alt="Edit" onClick={onEdit} />
          <img
            src={ticketArrows}
            className="arrowTwo"
            alt="Move Down"
            onClick={onMoveDown}
          />
        </div>
      </div>
    </div>
  );
};
HostTicketCard.propTypes = {
  ticket: PropTypes.object,
  isCurrent: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
};
export default HostTicketCard;
