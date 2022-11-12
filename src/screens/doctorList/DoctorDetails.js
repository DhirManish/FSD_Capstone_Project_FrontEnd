import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({    
    rating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& > * + *': {
          marginLeft: 8,
        },
      },
  });
const DoctorDetails = (props) => {
    const { doctorDetails } = props
    const classes = useStyles()
    return <Grid item xs key={doctorDetails.id} >
        {doctorDetails &&
        <>
            <Typography gutterBottom variant="body1" component="p" >
                {`Dr. ${doctorDetails.firstName} ${doctorDetails.lastName}`}
            </Typography>
            <Typography  variant="body2" component="p" >
                {`Total Experience: ${doctorDetails.totalYearsOfExp}`}
            </Typography>
            <Typography  variant="body2" component="p" >
                {`Speciality: ${doctorDetails.speciality}`}
            </Typography>
            <Typography  variant="body2" component="p" >
                {`Date of Birth: ${doctorDetails.dob}`}
            </Typography>
            <Typography  variant="body2" component="p" >
                {`City:  ${doctorDetails.address && doctorDetails.address.city}`}
            </Typography>
            <Typography  variant="body2" component="p" >
                {`Email: ${doctorDetails.emailId}`}
            </Typography>
            <Typography  variant="body2" component="p" >
                {`Mobile: ${doctorDetails.mobile}`}
            </Typography>
            <div className={classes.rating}>
                    <Typography component="p" variant="body2">
                        Rating: 
                    </Typography>
                    <Rating name="rating" 
                        defaultValue={doctorDetails.rating} 
                        precision={0.5}
                        readOnly 
                        size="small" 
                    />
                </div>
        </>
        }
    </Grid>
}

export default DoctorDetails