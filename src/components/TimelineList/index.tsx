import * as React from "react";

import emptyResourceLogo from "../../images/empty-resource.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./index.less";

const TimelineList = ({ data, itemClick = (item: any) => {} }: any) => {
  const getItemDisplay = (entry: any) => {
    let resourceDate = "";
    if (
      entry.resource.item?.length &&
      entry.resource.item[0].servicedPeriod?.start
    ) {
      resourceDate = entry.resource.item[0].servicedPeriod.start;
    }

    if (!resourceDate && entry.resource.billablePeriod?.start) {
      resourceDate = entry.resource.billablePeriod.start;
    }

    if (!resourceDate && entry.resource.item?.length === 1) {
      resourceDate = entry.resource.item[0].servicedDate;
    }

    if (!resourceDate && entry.resource.onsetDateTime) {
      resourceDate = entry.resource.onsetDateTime;
    }

    if (!resourceDate && entry.resource.performedDateTime) {
      resourceDate = entry.resource.performedDateTime;
    }

    if (!resourceDate && entry.resource.occurrenceDateTime) {
      resourceDate = entry.resource.occurrenceDateTime;
    }

    /** if (entry.resource.intent) {
            resourceDate = entry.resource.intent;
          } * */

    if (!resourceDate && entry.resource.effectiveDateTime) {
      resourceDate = entry.resource.effectiveDateTime;
    }

    if (!resourceDate && entry.resource.period && entry.resource.period.start) {
      resourceDate = entry.resource.period.start;
      console.log(resourceDate);
    }

    if (resourceDate) {
      const dateObject = new Date(resourceDate);
      if (isNaN(dateObject.getTime())) {
        return "_";
      }
      return dateObject.toLocaleString("en-US", {
        dateStyle: "long",
      });
    }
    return "-";
  };
  const getItemStatus = (entry: any) => {
    if (entry.resource.status) {
      return entry.resource.status;
    }
    if (
      entry.resource.clinicalStatus &&
      entry.resource.clinicalStatus.coding &&
      entry.resource.clinicalStatus.coding.length &&
      (entry.resource.clinicalStatus.coding[0].display ||
        entry.resource.clinicalStatus.coding[0].code)
    ) {
      if (
        (entry.resource.clinicalStatus.coding[0].display &&
          entry.resource.clinicalStatus.coding[0].display.length > 7) ||
        (entry.resource.clinicalStatus.coding[0].code &&
          entry.resource.clinicalStatus.coding[0].code.length > 7)
      ) {
        return (
          `${entry.resource.clinicalStatus.coding[0].display.substring(
            0,
            9
          )}...` ||
          `${entry.resource.clinicalStatus.coding[0].code.substring(0, 9)}...`
        );
      }
      return (
        entry.resource.clinicalStatus.coding[0].display ||
        entry.resource.clinicalStatus.coding[0].code
      );
    }
    return "";
  };

  const EmptyResourceView = () => {
    return (
      <div id="timeline-list">
        <div className="empty-container">
          <img
            src={emptyResourceLogo}
            alt="empty resource"
            className="empty-logo"
          />
          <h5 className="empty-text">No data to display</h5>
        </div>
      </div>
    );
  };

  const TimelineItem = ({ item, onClick = () => {} }: any) => {
    return (
      <div className="timeline-item" onClick={onClick}>
        <p className="timeline-date">{getItemDisplay(item)}</p>
        <div
          className="timeline-status-container"
          style={{
            color: getItemStatus(item) === "active" ? "#12A771" : "#F36060",
          }}
        >
          {getItemStatus(item)}
          <FontAwesomeIcon icon={faChevronRight} className="timeline-icon" />
        </div>
      </div>
    );
  };

  if (!data.length) {
    return <EmptyResourceView />;
  }

  return (
    <div id="timeline-list">
      {data.map((item: any, index: any) => (
        <TimelineItem
          key={index}
          item={item}
          onClick={() => {
            itemClick(item);
          }}
        />
      ))}
    </div>
  );
};

export default TimelineList;
