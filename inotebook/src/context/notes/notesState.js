import NoteContext from "./notesContext";
import { useState } from "react";
const NoteState = () => {
    const state = {
        "name": "Babu",
        "class": "class hain yein yaar",
    }
    const [first, setfirst] = useState(state);
    update = () => {
        setTimeout(() => {
            setState({
                "name": "Larri",
                "class": "18794"
            })
        }, 1000);
    }
    return (

        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;