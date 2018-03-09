import React from 'react';

import { dNc } from '../../../../content/scripts/custom/utilities';

export function getBinaryRowReallyTiny(percentageComplete, leftTag, rightTag) {
  const progressBarClassName = 'progress-bar progress-bar-purple';

  return (
    <div className="text-center">
      <div className="row flex-v-center-xs">
        <div className="col-xs-12">
          <div className="progress">
            <div
              className={progressBarClassName}
              role="progressbar"
              aria-valuenow={percentageComplete}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentageComplete + '%' }}
            >
              <span className="sr-only">{percentageComplete}% Complete</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex-v-center-xs">
        <div className="col-xs-6 text-left">
          <h6>{leftTag}</h6>
        </div>
        <div className="col-xs-6 text-right">
          <h6>{rightTag}</h6>
        </div>
      </div>
    </div>
  );
}

export function getBinaryRowTiny(percentageComplete, leftTag, rightTag) {
  const progressBarClassName = 'progress-bar progress-bar-purple';

  return (
    <div className="text-center">
      <div className="row flex-v-center-xs">
        <div className="col-xs-12">
          <div className="progress">
            <div
              className={progressBarClassName}
              role="progressbar"
              aria-valuenow={percentageComplete}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentageComplete + '%' }}
            >
              <span className="sr-only">{percentageComplete}% Complete</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex-v-center-xs">
        <div className="col-xs-6 text-left">
          <h5>{leftTag}</h5>
        </div>
        <div className="col-xs-6 text-right">
          <h5>{rightTag}</h5>
        </div>
      </div>
    </div>
  );
}

export function getBinaryRowIcons(
  leftIconClass,
  rightIconClass,
  leftTag,
  rightTag,
  percentageComplete,
) {
  const leftClassName =
    'fa ' + leftIconClass + ' wow bounceIn text-purple responsive-fa';
  const rightClassName =
    'fa ' + rightIconClass + ' wow bounceIn text-purple responsive-fa';

  const progressBarClassName = 'progress-bar progress-bar-purple';

  return (
    <div className="text-center">
      <div className="row flex-v-center-xs">
        <div className="col-xs-2">
          <i className={leftClassName} />
          <h5>{leftTag}</h5>
        </div>
        <div className="col-xs-8">
          <div className="progress">
            <div
              className={progressBarClassName}
              role="progressbar"
              aria-valuenow={percentageComplete}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentageComplete + '%' }}
            >
              <span className="sr-only">{percentageComplete}% Complete</span>
            </div>
          </div>
        </div>
        <div className="col-xs-2">
          <i className={rightClassName} />
          <h5>{rightTag}</h5>
        </div>
      </div>
    </div>
  );
}

export function getBinaryRowLRDesc(
  leftIconClass,
  rightIconClass,
  leftTag,
  rightTag,
  percentageComplete,
  leftDesc,
  rightDesc,
) {
  const leftClassName =
    'fa ' + leftIconClass + ' wow bounceIn text-purple responsive-fa';
  const rightClassName =
    'fa ' + rightIconClass + ' wow bounceIn text-purple responsive-fa';

  const progressBarClassName = 'progress-bar progress-bar-purple';

  return (
    <div className="text-center">
      <div className="row flex-v-center-xs">
        <div className="col-xs-2">
          <i className={leftClassName} />
          <h5 style={{ marginBottom: '0' }}>{leftTag}</h5>
        </div>
        <div className="col-xs-8">
          <div className="progress">
            <div
              className={progressBarClassName}
              role="progressbar"
              aria-valuenow={percentageComplete}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentageComplete + '%' }}
            >
              <span className="sr-only">{percentageComplete}% Complete</span>
            </div>
          </div>
        </div>
        <div className="col-xs-2">
          <i className={rightClassName} />
          <h5 style={{ marginBottom: '0' }}>{rightTag}</h5>
        </div>
      </div>
      <div className="row flex-v-center-sm">
        <div className="col-sm-5 text-left">{leftDesc}</div>
        <div className="col-sm-2">
          {/* <i className="fa fa-arrow-left responsive-fa text-purple fa-3x" style={{ marginRight: '-2px' }} /><i className="fa fa-arrow-right responsive-fa text-purple" style={{ marginLeft: '-2px' }} /> */}
        </div>
        <div className="col-sm-5 text-right">{rightDesc}</div>
      </div>
    </div>
  );
}

export function getBinaryRow(
  leftIconClass,
  rightIconClass,
  leftTag,
  rightTag,
  percentageComplete,
  title,
  descriptionTitle,
  description,
) {
  const leftClassName =
    'fa ' + leftIconClass + ' wow bounceIn text-purple responsive-fa';
  const rightClassName =
    'fa ' + rightIconClass + ' wow bounceIn text-purple responsive-fa';

  const progressBarClassName = 'progress-bar progress-bar-purple';

  /* if (percentageComplete <= 40) {
      progressBarClassName += ' progress-red';
    } else if (percentageComplete > 40 && percentageComplete <= 60) {
      progressBarClassName += ' progress-orange';
    } else {
      progressBarClassName += ' progress-green';
    } */

  let titleElement = null;

  if (dNc(title)) {
    titleElement = <h4>{title}</h4>;
  }

  return (
    <div className="text-center">
      {titleElement}
      <div className="row flex-v-center-xs">
        <div className="col-xs-2">
          <i className={leftClassName} />
          <h5>{leftTag}</h5>
        </div>
        <div className="col-xs-8">
          <div className="progress">
            <div
              className={progressBarClassName}
              role="progressbar"
              aria-valuenow={percentageComplete}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: percentageComplete + '%' }}
            >
              <span className="sr-only">{percentageComplete}% Complete</span>
            </div>
          </div>
        </div>
        <div className="col-xs-2">
          <i className={rightClassName} />
          <h5>{rightTag}</h5>
        </div>
      </div>
      <div>
        <h5>
          <strong>{descriptionTitle}</strong>
        </h5>
        <h5 className="text-muted">{description}</h5>
      </div>
    </div>
  );
}

export function collapse(target) {
  const div = $(target);
  const icon = $(target + 'icon');

  if (div.hasClass('in')) {
    div.collapse('hide');
    icon.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
  } else {
    div.collapse('show');
    icon.removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
  }
}
