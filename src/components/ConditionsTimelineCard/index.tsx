import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const ConidtionsTimelineCardItem = ({ resource }: any) => {
  return (
    <div id="conditions-timeline-card">
      {!!resource.identifier?.length && (
        <TimelineDetailsCardDropdown
          header="Identifiers"
          items={resource.identifier.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item.value} />
          ))}
        />
      )}
      {resource.clinicalStatus &&
        resource.clinicalStatus.coding &&
        resource.clinicalStatus.coding.length &&
        resource.clinicalStatus.coding[0].display && (
          <TimelineDetailsCardItem
            label="Clinical Status"
            value={
              resource.clinicalStatus.coding[0].display ||
              resource.clinicalStatus.coding[0].code
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
    </div>
  );
};

export default ConidtionsTimelineCardItem;
