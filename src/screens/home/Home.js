import React,{ useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "../../common/tabContainer/TabContainer"
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    tabs: {
        "& .MuiTabs-indicator": {
          backgroundColor: "#3f50b5"
        }
      
      }
  });
const Home = (props) => { 
    const classes  = useStyles()
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, value) => setTabValue(value);
    return <div> 
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" centered  className={classes.tabs}>
            <Tab label="Doctors"/>
            <Tab label="Appointment"/>
        </Tabs>
       {tabValue === 0 && (
           <TabContainer>
               <DoctorList/>
           </TabContainer>
       )}
       {tabValue === 1 && (
           <TabContainer>
               <Appointment/>
           </TabContainer>
       )}
    </div>
}
export default Home