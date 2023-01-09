import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';


function Settings(props){
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const lightModeChangeValue = (event) => {
        if(event.target.checked){
            localStorage.setItem("light_mode","on");
            localStorage.setItem("primary_colour", "white");
            localStorage.setItem("secondary_colour", "#1d2d44");
            window.location.reload();
        } else{
            localStorage.setItem("light_mode","off")
            localStorage.setItem("primary_colour", "#1d2d44");
            localStorage.setItem("secondary_colour", "white");
            window.location.reload();
        }
    }
    
    const clockStyleChangeValue = (event) => {
        if(event.target.checked){
            localStorage.setItem("clock_style","en-US");
         } else{
             localStorage.setItem("clock_style","en-GB")
         }
    }

    const buttonStyle = {
        width: "max-content",
        opacity: "80%",
        borderWidth: "0",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: localStorage.getItem("secondary_colour")
    };

    let clockSwitch;
    if(localStorage.getItem("clock_style") == "en-US"){
        clockSwitch = <input className="form-check-input" type="checkbox" role="switch" onChange={clockStyleChangeValue} id="flexSwitchCheckDefault" checked/>;
    } else{
        clockSwitch = <input className="form-check-input" type="checkbox" role="switch" onChange={clockStyleChangeValue} id="flexSwitchCheckDefault"/>;
    }

    let lightModeSwitch;
    if(localStorage.getItem("light_mode") == "on"){
        lightModeSwitch = <input className="form-check-input" type="checkbox" role="switch" onChange={lightModeChangeValue} id="flexSwitchCheckDefault" checked/>
    } else{
        lightModeSwitch = <input className="form-check-input" type="checkbox" role="switch" onChange={lightModeChangeValue} id="flexSwitchCheckDefault" />
    }

    return(
        <div>
            <Button style={buttonStyle} onClick={handleShow}>
                <FontAwesomeIcon icon={faGear}/>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-check form-switch">
                        {lightModeSwitch}
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{color:"black"}}>Light Mode</label>
                    </div>
                    <div className="form-check form-switch">
                        {clockSwitch}
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{color:"black"}}>12 hour clock</label>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Settings;