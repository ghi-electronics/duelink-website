 // src/components/MyPopup.js
    import React, { useState } from 'react';
    import styles from './MyPopup.module.css'; 
    import BrevoForm from '@site/src/components/BrevoForm';


    function MyPopup({ onClose }) {
      return (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            
            <BrevoForm />

           <button id="closeButton">Close</button>
          </div>


        <script>
            document.getElementById('closeButton').addEventListener('click', function() {
                window.close()});
        </script> 
       

        </div>
        
      );
    }

    export default MyPopup;