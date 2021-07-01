import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const PrescriptionsTimelineCard = ({ resource }: any) => {
  return (
    <div id="prescriptions-timeline-card">
      {!!resource.identifier?.length && (
        <TimelineDetailsCardDropdown
          header="Identifiers"
          items={resource.identifier.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item.value} />
          ))}
        />
      )}

      {resource.intent && (
        <TimelineDetailsCardItem label="INTENT" value={resource.intent} />
      )}

      {resource.type && resource.type && (
        <TimelineDetailsCardItem label="Type" value={resource.type} />
      )}

      {resource.criticality && (
        <TimelineDetailsCardItem
          label="CRITICALITY"
          value={`${resource.criticality}`}
        />
      )}

      {resource.status && resource.status.length > 0 && (
        <TimelineDetailsCardItem label="STATUS" value={`${resource.status}`} />
      )}

      {resource.category &&
        resource.category?.length > 0 &&
        resource.category[0] &&
        resource.category[0].coding[0] && (
          <TimelineDetailsCardItem
            label="CATEGORY"
            value={`${resource.category[0].coding[0].code}`}
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

      {resource.effectiveDateTime && (
        <TimelineDetailsCardItem
          label="EFFECTIVE"
          value={formatDatePeriod(
            `${new Date(resource.effectiveDateTime).toDateString()}`
          )}
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

      {!!resource.reaction?.length && (
        <TimelineDetailsCardDropdown
          header="Reaction"
          items={resource.reaction.map((item: any) => {
            const resultItems = [];

            if (
              !!item.substance?.length &&
              item.substance[0].coding &&
              item.substance[0].coding.length &&
              item.substance[0].coding.display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="SUBSTANCE"
                  value={item.substance[0].coding.display}
                />
              );
            }

            if (
              !!item.manifestation?.length &&
              item.manifestation[0].coding &&
              item.manifestation[0].coding.length &&
              item.manifestation[0].coding.display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="MANIFESTATION"
                  value={item.manifestation[0].coding.display}
                />
              );
            }
          })}
        />
      )}
    </div>
  );
};

export default PrescriptionsTimelineCard;
