import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const ImmunizationsCardItem = ({ resource }: any) => {
  return (
    <div id="immunization-timeline-card">
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
      {resource.statusReason?.coding &&
        resource.statusReason?.coding.length &&
        resource.statusReason?.coding[0].display && (
          <TimelineDetailsCardItem
            label="STATUS REASON"
            value={`${resource.statusReason?.coding[0].display}`}
          />
        )}

      {resource.vaccineCode?.coding &&
        resource.vaccineCode?.coding.length &&
        resource.vaccineCode?.coding[0].display && (
          <TimelineDetailsCardItem
            label="VACCINE CODE"
            value={`${resource.vaccineCode?.coding[0].display}`}
          />
        )}
      {resource.occurrenceDateTime && (
        <TimelineDetailsCardItem
          label="OCCURRENCE"
          value={formatDatePeriod(resource.occurrenceDateTime)}
        />
      )}
      {resource.recorded && (
        <TimelineDetailsCardItem
          label="RECORDED"
          value={formatDatePeriod(resource.recorded)}
        />
      )}
      {resource.route?.coding &&
        resource.route?.coding.length &&
        resource.route?.coding[0].display && (
          <TimelineDetailsCardItem
            label="ROUTE"
            value={`${resource.route?.coding[0].display}`}
          />
        )}
      {resource.primarySource && (
        <TimelineDetailsCardItem
          label="PRIMARY SOURCE"
          value={`${resource.primarySource}`}
        />
      )}

      {!!resource.category?.length && (
        <TimelineDetailsCardDropdown
          header="Category"
          items={resource.category.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item} />
          ))}
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
      {resource.onsetDateTime && (
        <TimelineDetailsCardItem
          label="ONSET"
          value={formatDatePeriod(resource.onsetDateTime)}
        />
      )}
      {resource.recordedDate && (
        <TimelineDetailsCardItem
          label="RECORDED DATE"
          value={formatDatePeriod(resource.recordedDate)}
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

      {!!resource.note?.length && (
        <TimelineDetailsCardDropdown
          header="Notes"
          items={resource.note.map((item: any) => (
            <TimelineDetailsCardItem label="Text" value={item.text || ""} />
          ))}
        />
      )}
    </div>
  );
};

export default ImmunizationsCardItem;
