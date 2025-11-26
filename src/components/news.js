import React, { useEffect } from 'react';

function News() {
  useEffect(() => {
    // You might need to add Brevo's form script here.
    // For simple HTML, Brevo usually provides a small script
    // to handle form submission.
  }, []);

  
  const formMarkup = `
<iframe width="600" height="360" src="https://forums.ghielectronics.com/c/duelink/31" frameborder="0" scrolling="auto" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>
`;


  return (
    <div dangerouslySetInnerHTML={{ __html: formMarkup }} />
  );
}

export default News


