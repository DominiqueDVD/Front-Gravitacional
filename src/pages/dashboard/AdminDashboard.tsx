import React, { useEffect, useState } from 'react'

import Body from '../../components/adminDashboard/body.tsx'
import ColorCharger from '../../components/accesibilidad/colorChanger.jsx'
function AdminDashboard(){


    return(
      <div>
         <ColorCharger/>
        <Body>
        
        </Body>
      </div>
    );
  }


export default AdminDashboard