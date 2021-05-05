import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const DiagnosticReportTimelineCard = ({ resource }: any) => {
  return (
    <div id="diagnostic-report-timeline-card">
      {!!resource.identifier?.length && (
        <TimelineDetailsCardDropdown
          header="Identifiers"
          items={resource.identifier.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item.value} />
          ))}
        />
      )}

      {resource.code &&
        resource.code.coding &&
        resource.code.coding.length &&
        (resource.code.coding[0].display || resource.code.coding[0].code) && (
          <TimelineDetailsCardItem
            label="CODE"
            value={
              resource.code.coding[0].display || resource.code.coding[0].code
            }
          />
        )}

      {resource.type && resource.type && (
        <TimelineDetailsCardItem label="Type" value={resource.type} />
      )}

      {!!resource.category?.length && (
        <TimelineDetailsCardDropdown
          header="Category"
          items={resource.category
            .filter(
              (item: any) =>
                item.coding && item.coding.length && item.coding[0].display
            )
            .map((x: any) => (
              <TimelineDetailsCardItem
                label="Value"
                value={x.coding[0].display}
              />
            ))}
        />
      )}

      {resource.criticality && (
        <TimelineDetailsCardItem
          label="CRITICALITY"
          value={`${resource.criticality}`}
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

      {!!resource.encounter?.length && (
        <TimelineDetailsCardDropdown
          header="Encounter"
          items={resource.encounter.map((item: any) => (
            <TimelineDetailsCardItem label="" value={item.reference} />
          ))}
        />
      )}

      {resource.effectiveDateTime && (
        <TimelineDetailsCardItem
          label="EFFECTIVE"
          value={formatDatePeriod(resource.effectiveDateTime)}
        />
      )}
      {resource.issued && (
        <TimelineDetailsCardItem
          label="ISSUED"
          value={formatDatePeriod(resource.issued)}
        />
      )}
      {resource.recorder &&
        resource.recorder.practitioner &&
        resource.recorder.practitioner.name && (
          <TimelineDetailsCardItem
            label="RECORDER"
            value={resource.recorder.practitioner.name}
          />
        )}

      {!!resource.performer?.length && (
        <TimelineDetailsCardDropdown
          header="PERFORMER"
          items={resource.performer.map((item: any) => (
            <TimelineDetailsCardItem label="Text" value={item?.display || ""} />
          ))}
        />
      )}
    </div>
  );
};

export default DiagnosticReportTimelineCard;
