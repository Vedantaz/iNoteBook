import NoteContext from "./notesContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:8000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)
    // Get all notes 
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const Json = await response.json()
        setNotes(Json);
    }
    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        // after adding the note , clear the title , text, tag.
    }
    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id }); // notes renew kro ek condition ke sath.
        setNotes(newNotes);
    }
    // Edit a Note
    const updateNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;          //constant element ko nhi , newNotes[array ] ko change krna hain .
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        };
        setNotes(newNotes);

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;