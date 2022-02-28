import React from 'react'

import imgprofil from "../assets/images/profil.PNG";
import '../assets/styles/Header.css'


function Header() {
  return (
    <nav>
      <div>
          <select name="example" className="header-location">
            <option selected hidden disabled>
              Lash Studio Gunawarman
            </option>
            <option value="B">B</option>
            <option value="-">Other</option>
          </select>
      </div>
      <img src={imgprofil} alt="profile"></img>
    </nav>
  )
}

export default Header