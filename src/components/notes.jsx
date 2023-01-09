import React, {Component} from "react";
import Note from "./note"

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes:[],
            note_input:''
        };
        //ensuring that methods have access to internal scope
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({note_input: event.target.value});
        document.getElementById("noteInput").focus();
    }
    
    //removes all notes with specific text -> should probably be switched to id
    handleSubmit(event) {
        if(this.state.note_input){
            this.props.addNoteToDB(this.state.note_input)
            this.setState({note_input:""});
            event.preventDefault();
        }
    }

    handleEdit(toEdit) {
        let temp = this.state.notes.filter(note => note.id === toEdit);
        console.log(temp[0].note)
        this.setState({note_input:temp[0].note});
        this.props.removeNoteFromDB(toEdit);
        
    }

    handleDelete(toDel){
        this.props.removeNoteFromDB(toDel)
    } 

    render() { 
        const inputStyle = {
            backgroundColor:"rgba(0, 0, 0, 0.0)",
            borderWidth:"0px",
            color:localStorage.getItem("secondary_colour"),
            width:"27vw",
            height:"50px",
            background: "transparent",
            borderBottom: "1px solid "+localStorage.getItem("secondary_colour"),
            outlineWidth:"0",
            paddingLeft:"5px",
            marginBottom:"20px",
        };
        const inputDivStyle = {
            marginBottom: "10px",
            position : "absolute",
            bottom   : "0",
            
        };
        const listStyle = {
            height: "90vh",
            overflow:"hidden", 
            overflowY:"scroll"
        }

        const placeholders = ["call the dentist...","take out the trash...","call mom...","taxes...","some text...","...","clean car...","take dog on walk...",]
        var placeholder = placeholders[Math.floor(Math.random() * placeholders.length)]

        //child state updates any time parent changes
        //this keeps parent, child and databse in sync -> child is just a copy of parent
        this.state.notes = this.props.getNotes();

        //generates all notes from initial db
        var note_elem  = this.state.notes.map( note => < Note note={note.note} key={note.id} onClick={()=>this.handleEdit(note.id)} onDelete={() => this.handleDelete(note.id)}/>);
        return(
            <div style={{width:"30vw",float:"right"}}>
                <nav style = {listStyle} className="list-group d-flex flex-column">
                    {note_elem}
                </nav>
                <form onSubmit={this.handleSubmit}>
                    <div style={inputDivStyle}>
                        <input id="noteInput" autoComplete={"off"}style={inputStyle} placeholder={placeholder}type="text" value={this.state.note_input} onChange={e => this.handleChange(e)} />
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Notes;