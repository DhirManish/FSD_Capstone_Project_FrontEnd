import React,{ useState, useContext, useEffect } from "react";
import { MyContext } from "../Controller";
import { Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getUserAppointments } from "../../common/utils/HttpConnector";

const useStyles = makeStyles({
    paper : {
        textAlign:'left',
        margin: '15px',
        padding: '20px',
        cursor: 'pointer'
    }
  });
const Appointment = (props) => { 
    const context = useContext(MyContext)
    if(!context.isAuthenticated){
        return <div>
            <Typography variant="body1" component="p" >
                Login to see appointments
            </Typography>
        </div>
    }   
    return <AppointmentList {...context} />
}

const AppointmentList = (props) => {
    const [userAppointmentList, setUserAppointmentsList] = useState([])
    const classes = useStyles()
    useEffect(() => {
        getUserAppointments().then(data => setUserAppointmentsList(data))
    },[])

    return (
        <div>
            {
                userAppointmentList.length > 0
                && 
                userAppointmentList.map((appointment, index) => {
                    const appointmentRatingData = {
                        appointmentId: appointment.appointmentId,
                        doctorId: appointment.doctorId
                    }
                    return (
                        <Paper className={classes.paper} key={`appointment_${appointment.appointmentId}`}>
                            <Typography gutterBottom variant="body1" component="p" >
                                {appointment.doctorName}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="p">
                                {`Date: ${appointment.appointmentDate}`}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="p">
                                {`Symptoms: ${appointment.symptoms}`}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="p">
                                {`Prior Medical History: ${appointment.priorMedicalHistory}`}
                            </Typography>
                            <br />
                            <br />
                            <Button variant='contained' color="primary"  onClick={() =>props.showPopup("AppointmentRating",appointmentRatingData)}>Rate Appointment</Button>
                        </Paper>
                    )
                })
            }
        </div>
    )
}

export default Appointment