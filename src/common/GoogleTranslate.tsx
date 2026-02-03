// // // components/LanguageSwitcher.tsx
// // import { useEffect } from "react";
// // import "./languageSwitcher.css"
// //  const LanguageSwitcher = () => {
// //   useEffect(() => {
// //     const addGoogleTranslateScript = () => {
// //       if (document.getElementById("google-translate-script")) return;

// //       const script = document.createElement("script");
// //       script.id = "google-translate-script";
// //       script.src =
// //         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
// //       script.async = true;
// //       document.body.appendChild(script);

// //       const inlineScript = document.createElement("script");
// //       inlineScript.innerHTML = `
// //         function googleTranslateElementInit() {
// //           new google.translate.TranslateElement({
// //             pageLanguage: 'en',
// //             includedLanguages: 'en,nl',
// //             layout: google.translate.TranslateElement.InlineLayout.SIMPLE
// //           }, 'google_translate_element');
// //         }
// //       `;
// //       document.body.appendChild(inlineScript);
// //     };

// //     addGoogleTranslateScript();
// //   }, []);

// //   return <div id="google_translate_element" className="text-sm  fixed top-[30rem] left-[10rem] w-[20rem]"></div>;
// // };

// // export default LanguageSwitcher;



// import React, { useEffect } from 'react';
// import './GoogleTranslate.css';

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Add Google Translate script only if it doesn't exist
//     if (!document.getElementById('google-translate-script')) {
//       // Define the callback function first
//       window.googleTranslateElementInit = function() {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,nl', // Add more languages as needed, comma-separated
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//             autoDisplay: false
//           },
//           'google_translate_element'
//         );
//       };
      
//       // Create and append the script
//       const script = document.createElement('script');
//       script.id = 'google-translate-script';
//       script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       document.body.appendChild(script);
//     }
    
//     // Clean up function for useEffect
//     return () => {
//       // Only remove the init function, not the script
//       // to prevent issues with other components using the script
//       if (window.googleTranslateElementInit) {
//         window.googleTranslateElementInit = undefined;
//       }
//     };
//   }, []);

//   return (
//     <div className="translate-container">
//       <div id="google_translate_element"></div>
//     </div>
//   );
// };

// export default GoogleTranslate;