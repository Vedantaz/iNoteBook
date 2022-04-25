import React, { useContext } from 'react';
import notesContext from '../context/notes/notesContext';
const Noteitem = (props) => {
    const context = useContext(notesContext);
    const { deleteNote } = context;
    const { note, editNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success"); }}></i>
                        <i className="fas fa-edit mx-2" onClick={() => { editNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Noteitem;