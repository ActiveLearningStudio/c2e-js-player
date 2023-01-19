/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from "react";
// import scriptag from '../h5p/h5p-core/js/jquery.js'
type Props = {
  h5p: any;
};
declare global {
  interface Window {
    H5PIntegration?: any;
    H5P?: any;
  }
}
const OfflineH5P = ({ h5p }: Props) => {
  console.log("h5p", h5p);
  useEffect(() => {
    if (h5p) {
      window.H5P = window.H5P || {};
      //window.H5P.preventInit = true;
      window.H5PIntegration = h5p.settings;
      const h5pWrapper: any = document.getElementById("curriki-h5p-wrapper");
      h5pWrapper.innerHTML = h5p.embed_code.trim();
      const newStyles = h5p.settings.core.styles.concat(h5p.settings.loadedCss);
      const newScripts = h5p.settings.core.scripts.concat(h5p.settings.loadedJs);

      // Load H5P assets

      loadAssets(newStyles, newScripts);
    }
  }, [h5p]);

  const loadAssets = (styles: any, scripts: any) => {
    // styles.forEach((style: any) => {
    //   const link = document.createElement("link");
    //   link.href = style;
    //   link.type = "text/css";
    //   link.rel = "stylesheet";
    //   document.head.appendChild(link);
    // });
    // all style head
    // style 1
    const link = document.createElement("link");
    link.href = "h5p/laravel-h5p/css/laravel-h5p.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    // style 2
    const link1 = document.createElement("link");
    link1.href = "h5p/h5p-core/styles/h5p.css";
    link1.type = "text/css";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
    // style 3
    const link3 = document.createElement("link");
    link3.href = "h5p/h5p-core/styles/h5p-confirmation-dialog.css";
    link3.type = "text/css";
    link3.rel = "stylesheet";
    document.head.appendChild(link3);
    // style 4
    const link4 = document.createElement("link");
    link4.href = "h5p/h5p-core/styles/h5p-core-button.css";
    link4.type = "text/css";
    link4.rel = "stylesheet";
    document.head.appendChild(link4);
    // all scripts
    const element = document.createElement("script");
    element.onload = () => {
      console.log(`Assets loaded: ${element.src}`);
    };
    element.src = "h5p/h5p-core/js/jquery.js";
    console.log(`Assets loaded again: ${element.src}`);
    element.async = false;
    document.body.appendChild(element);
    // script 1
    const element1 = document.createElement("script");
    element1.onload = () => {
      console.log(`Assets loaded: ${element1.src}`);
    };
    element1.src = "h5p/h5p-core/js/h5p.js";
    element1.async = false;
    document.body.appendChild(element1);
    //script 2
    const element2 = document.createElement("script");
    element2.onload = () => {
      console.log(`Assets loaded: ${element2.src}`);
    };
    element2.src = "h5p/h5p-core/js/h5p-event-dispatcher.js";
    element2.async = false;
    document.body.appendChild(element2);
    //script 3
    const element3 = document.createElement("script");
    element3.onload = () => {
      console.log(`Assets loaded: ${element3.src}`);
    };
    element3.src = "h5p/h5p-core/js/h5p-x-api.js";
    element3.async = false;
    document.body.appendChild(element3);
    //script 4
    const element4 = document.createElement("script");
    element4.onload = () => {
      console.log(`Assets loaded: ${element4.src}`);
    };
    element4.src = "h5p/h5p-core/js/h5p-x-api-event.js";
    element4.async = false;
    document.body.appendChild(element4);
    //script 5
    const element5 = document.createElement("script");
    element5.onload = () => {
      console.log(`Assets loaded: ${element5.src}`);
    };
    element5.src = "h5p/h5p-core/js/h5p-content-type.js";
    element5.async = false;
    document.body.appendChild(element5);
    //script 6
    // const element6 = document.createElement("script");
    // element6.onload = () => {
    //   console.log(`Assets loaded: ${element6.src}`);
    // };
    // element6.src = 'h5p/h5p-core/js/ejs_production.js"';
    // element6.async = false;
    // document.body.appendChild(element6);
    //script 7
    const element7 = document.createElement("script");
    element7.onload = () => {
      console.log(`Assets loaded: ${element7.src}`);
    };
    element7.src = "h5p/h5p-core/js/h5p-action-bar.js";
    element7.async = false;
    document.body.appendChild(element7);
    //script 8
    const element8 = document.createElement("script");
    element8.onload = () => {
      console.log(`Assets loaded: ${element8.src}`);
    };
    element8.src = "h5p/h5p-core/js/h5p-confirmation-dialog.js";
    element8.async = false;
    document.body.appendChild(element8);
    //script 9
    // const element9 = document.createElement("script");
    // element9.onload = () => {
    //   console.log(`Assets loaded: ${element9.src}`);
    // };
    // element9.src = "h5p/h5p-core/js/handle-xapi.js";
    // element9.async = false;
    // document.body.appendChild(element9);
    //script 10
    const element10 = document.createElement("script");
    element10.onload = () => {
      console.log(`Assets loaded: ${element10.src}`);
    };
    element10.src = "h5p/h5p-core/js/request-queue.js";
    element10.async = false;
    document.body.appendChild(element10);
    //script 11
    const element11 = document.createElement("script");
    element11.onload = () => {
      console.log(`Assets loaded: ${element11.src}`);
    };
    element11.src = "h5p/h5p-editor/scripts/h5peditor-editor.js";
    element11.async = false;
    document.body.appendChild(element11);
    //script 12
    const element12 = document.createElement("script");
    element12.onload = () => {
      console.log(`Assets loaded: ${element12.src}`);
    };
    element12.src = "h5p/laravel-h5p/js/laravel-h5p.js";
    element12.async = false;
    document.body.appendChild(element12);
    //script 13
    const element13 = document.createElement("script");
    element13.onload = () => {
      console.log(`Assets loaded: ${element13.src}`);
    };
    element13.src = "libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.9";
    element13.async = false;
    document.body.appendChild(element13);
    //script 14
    const element14 = document.createElement("script");
    element14.onload = () => {
      console.log(`Assets loaded: ${element14.src}`);
    };
    element14.src = "libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.9";
    element14.async = false;
    document.body.appendChild(element14);
    //script 15
    const element15 = document.createElement("script");
    element15.onload = () => {
      console.log(`Assets loaded: ${element15.src}`);
    };
    element15.src = "libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.9";
    element15.async = false;
    document.body.appendChild(element15);
    //script 16
    const element16 = document.createElement("script");
    element16.onload = () => {
      console.log(`Assets loaded: ${element16.src}`);
    };
    element16.src = "libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.9";
    element16.async = false;
    document.body.appendChild(element16);
    //script 17
    const element17 = document.createElement("script");
    element17.onload = () => {
      console.log(`Assets loaded: ${element17.src}`);
    };
    element17.src = "libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.9";
    element17.async = false;
    document.body.appendChild(element17);
    //script 18
    const element18 = document.createElement("script");
    element18.onload = () => {
      console.log(`Assets loaded: ${element18.src}`);
    };
    element18.src = "libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.9";
    element18.async = false;
    document.body.appendChild(element16);
    //script 19
    const element19 = document.createElement("script");
    element19.onload = () => {
      console.log(`Assets loaded: ${element19.src}`);
    };
    element19.src = "libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.9";
    element19.async = false;
    document.body.appendChild(element19);
    //script 20
    const element20 = document.createElement("script");
    element20.onload = () => {
      console.log(`Assets loaded: ${element20.src}`);
    };
    element20.src = "libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.9";
    element20.async = false;
    document.body.appendChild(element20);
    //script 21
    const element21 = document.createElement("script");
    element21.onload = () => {
      console.log(`Assets loaded: ${element21.src}`);
    };
    element21.src = "libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.9";
    element21.async = false;
    document.body.appendChild(element21);
    //script 22
    const element22 = document.createElement("script");
    element22.onload = () => {
      console.log(`Assets loaded: ${element22.src}`);
    };
    element22.src = "libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.9";
    element22.async = false;
    document.body.appendChild(element22);
    //script 23
    const element23 = document.createElement("script");
    element23.onload = () => {
      console.log(`Assets loaded: ${element23.src}`);
    };
    element23.src = "libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.9";
    element23.async = false;
    document.body.appendChild(element23);
  };
  return (
    <div>
      <div id="curriki-h5p-wrapper">Loading...</div>
    </div>
  );
};

export default OfflineH5P;
