import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const EndpointTimelineCardItem = ({ resource }: any) => {
  return (
    <div id="endpoint-timeline-card">
      {!!resource.identifier?.length && (
        <TimelineDetailsCardDropdown
          header="Identifiers"
          items={resource.identifier.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item.value} />
          ))}
        />
      )}
       {resource.status && (
        <TimelineDetailsCardItem label="STATUS" value={resource.status} />
      )}
      {resource.connectionType &&
        resource.connectionType.coding &&
        resource.connectionType.coding.length &&
        resource.connectionType.coding[0].display && (
          <TimelineDetailsCardItem
            label="CONNECTION TYPE"
            value={
              resource.connectionType.coding[0].display ||
              resource.connectionType.coding[0].code
            }
          />
        )}
      {resource.name && (
        <TimelineDetailsCardItem label="NAME" value={resource.name} />
      )}

      {!!resource.category?.length && (
        <TimelineDetailsCardDropdown
          header="Category"
          items={resource.category
            .filter(
              (item: any) =>
                item.coding && item.coding.length && item.coding[0].display
            )
            ?.map((x: any) => (
              <TimelineDetailsCardItem
                label="Value"
                value={x.coding[0].display}
              />
            ))}
        />
      )}

      {resource.criticality && (
        <TimelineDetailsCardItem
          label="ADDRESS"
          value={`${resource.address}`}
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

      {resource.period && resource.period.start && (
        <TimelineDetailsCardItem
          label="PERIOD"
          value={formatDatePeriod(resource.period.start,resource.period?.end)}
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
    </div>
  );
};

export default EndpointTimelineCardItem;
