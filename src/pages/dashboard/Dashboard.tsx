import React, { useEffect, useState } from 'react'

import Body from '../../components/dashboard/body.tsx'
import ColorCharger from '../../components/accesibilidad/colorChanger.jsx'
function Dashboard(){


    return(
      <div>
         <ColorCharger/>
        <Body>
        
        </Body>
      </div>
    );
  }


export default Dashboard