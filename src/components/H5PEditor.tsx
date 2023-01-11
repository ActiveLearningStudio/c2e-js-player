/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
//import h5p1 from '../test.json'
type Props = {
  h5p: any;
};
declare global {
  interface Window {
    H5PIntegration?: any;
    H5P?: any;
  }
}
const H5PEditor = ({ h5p }: Props) => {

  useEffect(() => {
    if (h5p) {
      window.H5P = window.H5P || {};
      //window.H5P.preventInit = true;
      window.H5PIntegration = h5p.settings;
      const h5pWrapper: any = document.getElementById('curriki-h5p-wrapper');
      h5pWrapper.innerHTML = h5p.embed_code.trim();
      const newStyles = h5p.settings.core.styles.concat(h5p.settings.loadedCss);
      const newScripts = h5p.settings.core.scripts.concat(
        h5p.settings.loadedJs
      );

      // Load H5P assets

      loadAssets(newStyles, newScripts);
    }
  }, [h5p]);

  const loadAssets = (styles: any, scripts: any) => {
    styles.forEach((style: any) => {
      const link = document.createElement('link');
      link.href = style;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
    scripts.forEach((script: any) => {
      const element = document.createElement('script');
      element.onload = () => {
        console.log(`Assets loaded: ${element.src}`);
      };
      element.src = script;
      element.async = false;
      document.body.appendChild(element);
    });
  };
  return (
    <div>
      <div id="curriki-h5p-wrapper">Loading...</div>
    </div>
  );
};

export default H5PEditor;
