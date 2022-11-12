import React,{ useState, useEffect,useContext } from "react";
import Typography from '@material-ui/core/Typography';
import { getDoctors, getSpeciality } from "../../common/utils/HttpConnector";
import DoctorTile from "./DoctorTile";
import SelectField from "../../common/form/SelectField";
import { makeStyles } from '@material-ui/core/styles';
import { MyContext } from "../Controller";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '20px'
    }
  });

const DoctorList = (props) => {
    const classes = useStyles();
    const [doctorsList, setDoctorsList] = useState([])
    const [specialistMenuData, setSpecialistMenuData] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("")
    const { isAuthenticated, showPopup } = useContext(MyContext)
    useEffect(()=>{
        const filter = { speciality: selectedFilter}
        getDoctors(filter).then((response) => {
            setDoctorsList(response)
          })
          .catch((err) => {
            console.log(err);
          });
    },[selectedFilter])

    useEffect(()=>{
        getSpeciality().then((response) => {
            setSpecialistMenuData(response)
          })
          .catch((err) => {
            console.log(err);
          });
    },[])
    return (
    <Grid 
      container
      alignItems="center"
      direction="column"
      justifyContent="space-evenly"
      className={classes.root}

    >
        <Typography gutterBottom variant="body1" component="p">
            Select Speciality :
        </Typography>
        <SelectField 
          menudata={specialistMenuData} 
          handleSelection={(e) => setSelectedFilter(e.target.value)} 
          selectedValue={selectedFilter} 
          variant="filled"
          />
        {doctorsList.length > 0 &&
            doctorsList.map(( doctor,index) =>{
                return <DoctorTile 
                         doctorData={doctor} 
                         key={`doctor_tile_${index}`} 
                         {...props} 
                         isAuthenticated={isAuthenticated}
                         showPopup={showPopup}
                         />
            })
        }
    </Grid>
    )
}

export default DoctorList