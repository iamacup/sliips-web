import axios from 'axios';
import _ from 'lodash';

import { getEnvironment } from '../../../../foundation/utils/utilityFunctions';

// eslint-disable-next-line no-useless-escape
export const optionIDRegex = new RegExp('^options/[0-9]+$', 'i');

export const defaultError =
  'We got a strange response, maybe it is having a bad day :(';

export function getAPIUrl() {
  const env = getEnvironment();

  if (env === 'live') {
    return 'https://api.sliips.com/';
  } else if (env === 'dev') {
    return 'https://beta.sliips.com:5544/';
  } else if (env === 'local') {
    return 'https://local.sliips.com:8080/';
  }

  return '';
}

export function logError(data) {
  axios
    .post(getAPIUrl() + 'api/general/logError', { data })
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      // do nothing
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      // do nothing
    });
}

export function dNc(data) {
  return (
    typeof data !== 'undefined' &&
    data !== null &&
    !(typeof data === 'string' && data.length === 0)
  );
}

/* usage :
const handleScroll = debounce((e) => {
  // do something here
}, 100)
window.addEventListener('scroll', handleScroll) */
export function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return (...args) => {
    callbackArgs = args;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function fireDebouncedResizeEvents(eventName = 'debouncedResizeEvent') {
  const executeFunction = debounce(() => {
    $.event.trigger({ type: eventName }, []);
  }, 201);

  $(window).resize(executeFunction);
}

// todo this function needs to be checked - it is how angular does the calc - https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
export function isNumeric(value) {
  return !Number.isNaN(value - Number.parseFloat(value));
}

export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const pattern = new RegExp(
    '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    'i',
  );

  return pattern.test(email);
}

export function convertDataURIToBinary(dataURI) {
  const BASE64_MARKER = ';base64,';
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return array;
}

export function enableSmoothScroll(selector) {
  require('jquery.easing');

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(selector).bind('click', (event) => {
    const $anchor = $(event.currentTarget);

    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr('href')).offset().top - 50,
        },
        1250,
        'easeInOutExpo',
      );

    event.preventDefault();
  });
}

export function enableWOW() {
  require('animate.css');
  const WOW = require('wowjs');

  // make WOW run
  new WOW.WOW({ live: false }).init();
}

export function setAuthenticationCookie(data) {
  const Cookies = require('js-cookie');
  Cookies.set('authentication', data, { expires: 365 });
}

export function getAuthenticationHeaders(override) {
  const Cookies = require('js-cookie');

  let bearer = null;

  if (dNc(override)) {
    bearer = override;
  } else {
    bearer = Cookies.get('authentication');
  }

  if (dNc(bearer)) {
    return {
      headers: {
        Authorization: 'Bearer ' + bearer,
      },
    };
  }

  return {};
}

export function authenticationCookieExists() {
  const Cookies = require('js-cookie');
  const bearer = Cookies.get('authentication');

  if (dNc(bearer)) {
    return true;
  }

  return false;
}

export function getAuthenticationCookie() {
  const Cookies = require('js-cookie');
  return Cookies.get('authentication');
}

export function deleteAuthenticationCookie() {
  const Cookies = require('js-cookie');
  Cookies.remove('authentication');
}

// the api returns something called 'authStatus' as part of all responses - we should examine it and check that the api has not revoked access or anything every time we hit the API
export function handleAuthStatus(authStatus, dispatch) {
  if (authenticationCookieExists() && authStatus === 'error') {
    deleteAuthenticationCookie();
    dispatch({ type: 'LOGOUT_FINISHED' });
  }
}

export function showCookieMessage() {
  const Cookies = require('js-cookie');
  const cookie = Cookies.get('eucookiemessage');

  if (dNc(cookie)) {
    return false;
  }

  return true;
}

export function setCookieMessageShownCookie() {
  const Cookies = require('js-cookie');
  Cookies.set('eucookiemessage', 'true', { expires: 365 });
}

export function nl2br(str, isXhtml) {
  const breakTag =
    isXhtml || typeof isXhtml === 'undefined' ? '<br />' : '<br>';
  return (str + '').replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + breakTag + '$2',
  );
}

export function makeQuestionIDHTMLPropSafe(id) {
  return id.replace('/', '');
}

export function formatQuestionObjectForSending(obj) {
  const arr = Object.entries(obj);

  if (arr.length > 0) {
    const sendData = [];

    arr.forEach((value) => {
      const arr2 = Object.entries(value[1].answer);
      const answer = {};

      arr2.forEach((value2) => {
        answer[value2[0]] = {
          optionValue: value2[1].optionValue,
          optionID: value2[1].optionID,
        };
      });

      // todo this is not ok because answerValue is no longer formatted like this???
      sendData.push({ questionID: value[0], answer });
    });

    return sendData;
  }

  return null;
}

export function deactivateSticky(target) {
  $(target)
    .trigger('sticky_kit:detach')
    .data('sticky-turned-off', 'yes');
}

export function activateNonMobileSticky(target, options, dissableWidth = 992) {
  const jqueryElement = $(target);

  // initial setup
  if ($(window).width() >= dissableWidth) {
    jqueryElement.stick_in_parent(options);
    jqueryElement.data('sticky-turned-off', 'no');
  } else {
    jqueryElement.data('sticky-turned-off', 'yes');
  }
}

export function initialiseNonMobileSticky(
  target,
  options,
  onStickFunction = null,
  onUnstickFunction = null,
  dissableWidth = 992,
) {
  const jqueryElement = $(target);

  activateNonMobileSticky(target, options, dissableWidth);

  // handle events
  if (dNc(onStickFunction)) {
    jqueryElement.on('sticky_kit:stick', onStickFunction);
  }

  if (dNc(onUnstickFunction)) {
    jqueryElement.on('sticky_kit:unstick', onUnstickFunction);
  }

  // hangle resizing
  const executeFunction = debounce(() => {
    if (
      $(window).width() < dissableWidth &&
      jqueryElement.data('sticky-turned-off') === 'no'
    ) {
      deactivateSticky(target);

      if (dNc(onUnstickFunction)) {
        onUnstickFunction();
      }
    } else if (
      $(window).width() >= dissableWidth &&
      jqueryElement.data('sticky-turned-off') === 'yes'
    ) {
      jqueryElement.stick_in_parent(options);
      jqueryElement.data('sticky-turned-off', 'no');

      if (dNc(onStickFunction)) {
        onStickFunction();
      }
    }
  }, 277);

  $(window).resize(executeFunction);
}

export function currencySymbolLookup(currencyCode) {
  let currencySymbol = '';

  if (currencyCode === 'USD') {
    currencySymbol = '$';
  } else if (currencyCode === 'GBP') {
    currencySymbol = '£';
  } else if (currencyCode === 'EUR') {
    currencySymbol = '€';
  } else {
    currencySymbol = '???';
  }

  return currencySymbol;
}

export function getUsefulQuestionBits(options, answer) {
  const answerBits = [];
  const errorBits = [];

  Object.keys(options).forEach((value) => {
    // make sure the object is empty
    answerBits[value] = {};

    if (dNc(answer[value])) {
      // populate teh answer object if it exists
      answerBits[value] = answer[value];

      // and also check to see if this answer has any error messages against it
      if (dNc(answer[value].errorMessage)) {
        errorBits.push(answer[value].errorMessage);
      }
    }
  });

  return { answerBits, errorBits };
}

// this is used to fix the dropdown parent bug in select2 - basically if it is in a modal it needs to be fixed
// this is a problem as it can cause some significant errors when swap out the HTML element before this routeine is finished
export function select2GetCorrectParent(select2Element) {
  let dropdownParent = null;
  let p = $(select2Element);

  while (!p.is('html') && dNc(select2Element)) {
    p = p.parent();

    if (p.hasClass('modal')) {
      dropdownParent = p;
      break;
    }
  }

  return dropdownParent;
}

export function select2EnableOpenOnFocus(input) {
  const select2Item = $(input)
    .parent()
    .find('.select2-selection');

  if (select2Item.length === 1) {
    select2Item.on('focus', () => {
      $(input).select2('open');
    });
  }
}

export function getUsefulAnswerBits(answerData) {
  const keys = Object.keys(answerData);

  if (keys.length === 1) {
    return answerData[keys[0]];
  } else if (keys.length > 1) {
    const results = [];

    keys.forEach((value) => {
      results.push({ name: value, data: answerData[value] });
    });

    return results;
  }

  // todo handle properly
  console.log('this is an error condition - should have an answer!');
  return null;
}

export function getQuestionIdentifiers(options) {
  const keys = Object.keys(options);

  if (keys.length === 1) {
    return keys[0];
  } else if (keys.length > 1) {
    return keys;
  }

  // todo handle properly
  console.log('error state todo - should only get 1 part in utilities');
  return null;
}

export function setSelect2Value(domNode, optionValue, optionID) {
  const $option = $(domNode).find(
    'option:contains(' + optionValue.replace("'", "\\'") + ')',
  );

  if ($option.length === 1) {
    // we found the option is in the list, so we just trigger it to be 'shown' / 'selected'
    $(domNode)
      .val($option.val())
      .trigger('change');
  } else {
    // the option is not in the list so we need to add it
    let newOption = null;

    if (optionIDRegex.test(optionID) === true) {
      // if the optionID is a real optionID, then we make the thing with it
      newOption = new Option(optionValue, optionID, true, true);
    } else {
      // otherwise we need to use a uniqueId
      newOption = new Option(optionValue, _.uniqueId(), true, true);
    }

    $(domNode)
      .append(newOption)
      .trigger('change');
  }
}

export function setQuestionToErrorFromAPIData(
  payload,
  dispatch,
  questionAction,
) {
  const arr = Object.entries(payload);

  arr.forEach((value) => {
    const instance = Object.entries(value[1]);
    const questionID = value[0];

    instance.forEach((error) => {
      const questionPart = error[0];
      const errorMessage = error[1][0]; // it is technically possible for the API to send more than 1 error back for a part, but UI does not handle this and just ignores by showing only the 0th one

      dispatch(
        questionAction.doSetQuestionError(
          questionID,
          errorMessage,
          questionPart,
        ),
      );
    });
  });
}

// remove all of the HTML entities from a string
export function encodeEntities(s) {
  return $('<div/>').text(s).html();
}

// convert the html entities to HTML markup in a string
export function decodeEntities(s) {
  return $('<div/>').html(s).text();
}

export function nextElementInArray(array, currentElement) {
  for (let a = 0; a < array.length; a++) {
    if (array[a] === currentElement) {
      if ((a + 1) < array.length) {
        return array[a + 1];
      }
    }
  }

  return null;
}

export function nextIndexInArray(array, currentElement) {
  for (let a = 0; a < array.length; a++) {
    if (array[a] === currentElement) {
      if ((a + 1) < array.length) {
        return a + 1;
      }
    }
  }

  return null;
}

