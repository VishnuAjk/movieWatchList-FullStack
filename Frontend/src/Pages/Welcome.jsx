import React from 'react'
import welcomeStyle from "../styles/welcomePage.module.css";
const Welcome = () => {
  return (
    <div className={welcomeStyle.welcomeMessageContainer}>
        <img src="https://s3-alpha.figma.com/hub/file/1412369903/18d0cff3-dabe-42c8-a797-405554f7eb8e-cover.png" alt="poster" />
        <p>Sign In to Create Your List of Fav Movies Here...! </p>      
    </div>
  )
}

export default Welcome;
