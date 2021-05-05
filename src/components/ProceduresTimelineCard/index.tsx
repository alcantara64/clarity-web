import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const ProceduresTimelineCard = ({ resource }: any) => {
  return (
    <div id="procedures-timeline-card">
      {!!resource.identifier?.length && (
        <TimelineDetailsCardDropdown
          header="Identifiers"
          items={resource.identifier.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item.value} />
          ))}
        />
      )}
      {!!resource.instantiatesCanonical?.length && (
        <TimelineDetailsCardDropdown
          header="INSTANTIATE CANONICAL"
          items={resource.instantiatesCanonical.map((item: any) => (
            <TimelineDetailsCardItem label="STATUS" value={item.status} />
          ))}
        />
      )}{" "}
      {resource.status && (
        <TimelineDetailsCardItem label="Status" value={resource.status} />
      )}
      {resource.criticality && (
        <TimelineDetailsCardItem
          label="CRITICALITY"
          value={`${resource.criticality}`}
        />
      )}
      {resource.statusReason &&
        resource.statusReason?.coding &&
        resource.statusReason?.coding.length &&
        resource.statusReason?.coding[0].display && (
          <TimelineDetailsCardItem
            label="STATUS REASONING"
            value={`${resource.statusReason?.coding[0].display}`}
          />
        )}
      {resource.code?.coding &&
        resource.code?.coding.length &&
        resource.code?.coding[0].display && (
          <TimelineDetailsCardItem
            label="CODE"
            value={`${resource.code?.coding[0].display}`}
          />
        )}
      {resource.performedDateTime && (
        <TimelineDetailsCardItem
          label="PERFORMED"
          value={formatDatePeriod(resource.performedDateTime)}
        />
      )}
      {resource.search && (
        <TimelineDetailsCardItem label="SEARCH" value={resource.search} />
      )}
    </div>
  );
};

export default ProceduresTimelineCard;
