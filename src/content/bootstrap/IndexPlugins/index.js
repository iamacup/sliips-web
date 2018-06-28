
import React from 'react';

import { getEnvironment } from '../../../foundation/utils/utilityFunctions';

const result = {
  headTop: [],
  headBottom: [],
  bodyTop: [],
  bodyBottom: [],
};

/*
  HEAD TOP SCRIPTS
*/

// google
if (getEnvironment() === 'dev') {
  const obj1 = (<script key="1" async src="https://www.googletagmanager.com/gtag/js?id=UA-106881570-1" />);
  result.headTop.push(obj1);

  const obj2 = (
    <script
      key="2"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());

                gtag('config', 'UA-106881570-1');`,
        }}
    />);
  result.headTop.push(obj2);
} else if (getEnvironment() === 'live') {
  const obj1 = (<script key="3" async src="https://www.googletagmanager.com/gtag/js?id=UA-106988497-1" />);
  result.headTop.push(obj1);

  const obj2 = (
    <script
      key="4"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)};
                gtag('js', new Date());

                gtag('config', 'UA-106988497-1');`,
        }}
    />);
  result.headTop.push(obj2);
}

// font
result.headTop.push(<link key="5" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800" rel="stylesheet" type="text/css" />);

// Bootstrap Stylesheets
result.headTop.push(<link key="6" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />);

// Fontawesome Stylesheets
result.headTop.push(<link key="7" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />);

// Select2 Stylesheets
result.headTop.push(<link key="8" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/css/select2.min.css" rel="stylesheet" />);

// Slider Stylesheets
result.headTop.push(<link key="9" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.0/css/bootstrap-slider.min.css" rel="stylesheet" />);

/*
  HEAD BOTTOM SCRIPTS
*/

// Facebook pixel
if (getEnvironment() === 'live') {
  const obj1 = (
    <script
      key="10"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '937953946290028');
          
          fbq('track', 'PageView');`,
        }}
    />);
  result.headBottom.push(obj1);
}

/*
  BODY TOP SCRIPTS
*/

// We include a bunch of shim/sham for old browser support
result.bodyTop.push(<script key="11" src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js" />);
result.bodyTop.push(<script key="12" src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js" />);
result.bodyTop.push(<script key="13" src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js" />);
result.bodyTop.push(<script key="14" src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js" />);
result.bodyTop.push(<script key="15" src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-sham.min.js" />);

// eCharts uses INTL a lot and IE9 needs a pollyfill for it
result.bodyTop.push(<script key="16" src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en" />);

// Jquery CDN
result.bodyTop.push(<script key="17" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />);

/*
  BODY BOTTOM SCRIPTS
*/

// Select2 JS *
result.bodyBottom.push(<script key="18" src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/js/select2.min.js" />);

// Slider JS
result.bodyBottom.push(<script key="19" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.0/bootstrap-slider.min.js" />);

// PDF.JS CDN - NOTE this version must match that in the PDF reader worker definition in payslip upload
result.bodyBottom.push(<script key="20" src="https://unpkg.com/pdfjs-dist@1.9.638/build/pdf.min.js" />);

// sticky kit
result.bodyBottom.push(<script key="21" src="https://unpkg.com/sticky-kit@1.1.3/dist/sticky-kit.min.js" />);

// inputmask was added as it stopped working after minification for some reason - would like to put this back into the bundle if possible!
result.bodyBottom.push(<script key="24" src="https://unpkg.com/inputmask@3.3.11/dist/min/jquery.inputmask.bundle.min.js" />);

// intercom
if (getEnvironment() === 'live' || getEnvironment() === 'beta') {
  // intercom
  const obj1 = (
    <script
      key="22"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.intercomSettings = {
            app_id: "dhcbzii2"
          };`,
        }}
    />);
  result.bodyBottom.push(obj1);

  const obj2 = (
    <script
      key="23"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        // eslint-disable-next-line quotes
        __html: `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/dhcbzii2';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>`,
        }}
    />);
  result.bodyBottom.push(obj2);
}

export default result;
