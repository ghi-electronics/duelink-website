import React, { useEffect } from 'react';

function BrevoForm() {
  useEffect(() => {
    // You might need to add Brevo's form script here.
    // For simple HTML, Brevo usually provides a small script
    // to handle form submission.
  }, []);

  
  const formMarkup = `
<iframe width="600" height="360" src="https://31f1477e.sibforms.com/serve/MUIFAC4sL8pEHxh7tzhZNkK_jS9RoyG-0QA8exidmgXX8bOQQrEj5lTy76pT98vSkuwE9kwaC8fiY6leUnI6LeTo8INzzNqDcz0fIS1g5nYNlg3btIKIrTJH4lfqs6L7RkCnhENvZqYYY8zx_e-p9oVZx-tSACJeIiYRml0CZ82IPbzIESVaEtkxuzAT8hU2BjpeGvfN8QvHIElg" frameborder="0" scrolling="auto" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>
  `;


  return (
    <div dangerouslySetInnerHTML={{ __html: formMarkup }} />
  );
}

export default BrevoForm


