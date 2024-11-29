import React, { useEffect, useState } from 'react'

import Body from '../components/dashboard/body.tsx'
import MainContent from '../components/dashboard/mainContent.tsx';
import ColorCharger from '../components/accesibilidad/colorChanger.jsx'
function Dashboard(){


    return(
      <div>
         <ColorCharger/>
        <Body>
        
        </Body>
        {/* <MainContent></MainContent> */}
      </div>
    );
  }


export default Dashboard