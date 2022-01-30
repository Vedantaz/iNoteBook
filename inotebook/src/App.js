import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

function App() {
    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                    </Routes>
                </Router>
            </NoteState>
        </>
    );
}

export default App;
