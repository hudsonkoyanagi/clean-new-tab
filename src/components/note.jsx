import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



function Note(props){
    const buttonStyle = {
        width: "max-content",
        opacity: "80%",
        borderWidth: "0",
        color: localStorage.getItem("secondary_colour"),
        backgroundColor: "rgba(0, 0, 0, 0.0)",
      };
      const noteStyle = {
        borderRadius: "20px",
        marginBottom: "1%",
        overflowWrap: "break-word",
        backgroundColor:"rgba(0, 0, 0, 0.0)",
        borderWidth:"2px",
        borderColor: localStorage.getItem("secondary_colour"),
        color: localStorage.getItem("secondary_colour"),
        marginTop:"10px",
        fontSize:"100%"
      };
    return (
        <div className="list-group list-group-flush d-flex flex-row">
            <a style={noteStyle}href="#"className="overflow-auto list-group-item list-group-item-action" onClick={()=>props.onClick(props.note)}> {props.note} </a>
            <button style={buttonStyle}  className="noteDeleteButton list-group-item list-group-item-action" onClick={()=>props.onDelete(props.note)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        
        </div>
    );
}

export default Note;