import React from 'react'

import { Dexie } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'

import Notes from "./components/notes";
import Clock from "./components/clock";
import Settings from "./components/settings";
import Sketch from "./components/sketch"

import { ReactP5Wrapper } from "react-p5-wrapper";


var initNotes = [];

const db = new Dexie('NotesDB')
db.version(1).stores({
    notes: '++id, text'
})
const { notes } = db

const App = () =>{

    const allNotes = useLiveQuery(() => notes.toArray(), [])
    //to be passed to notes component to handle adding a note to the db
    const addNote = async (event) => {
        const note_input = document.querySelector('#noteInput');
        await notes.add({
            note: note_input.value,
            completed: false
        });
    }

    const deleteNote = async (id) => {
        notes.delete(id);
    }

    function getNotes() {
        if(allNotes){
            return allNotes
        } else{
            return [];
        }
    }

    function initializeLocalStorageSettings(){
        if(!localStorage.getItem("clock_style")) localStorage.setItem("clock_style","en-GB");
        if(!localStorage.getItem("light_mode")) localStorage.setItem("light_mode","off");
        if(!localStorage.getItem("primary_colour")) localStorage.setItem("primary_colour","#1d2d44");
        if(!localStorage.getItem("secondary_colour")) localStorage.setItem("secondary_colour","white");
    }

    
    initializeLocalStorageSettings()
    return (
        // three column layout - contianer fluid fills the view 
        <div style={{height:"100vh", width:"100vw", backgroundColor:localStorage.getItem("primary_colour")}} className="bigDiv container-fluid" >
            <div className="row " >
                <div className="col">
                    <Settings />
                    <ReactP5Wrapper sketch={Sketch} style={{zIndex:"-1"}} />
                </div>
                <div className="col" >
                    < Clock/>
                </div>
                <div className="col text-center">
                    < Notes notes={initNotes} addNoteToDB={addNote} removeNoteFromDB={deleteNote} getNotes={getNotes}/>
                <div/>
            </div>
        </div>
    </div>
    )
}

export default App;