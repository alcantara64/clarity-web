import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const MedicationsTimelineCard = ({ resource }: any) => {
  return (
    <div id="medications-timeline-card">
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
      {resource.intent && (
        <TimelineDetailsCardItem label="INTENT" value={resource.intent} />
      )}
      {resource.medicationCodeableConcept?.coding &&
        resource.medicationCodeableConcept?.coding.length &&
        resource.medicationCodeableConcept?.coding[0].display && (
          <TimelineDetailsCardItem
            label="CODEABLECONCENPT "
            value={`${resource.medicationCodeableConcept?.coding[0].display}`}
          />
        )}

      {resource.requester && resource.requester.display && (
        <TimelineDetailsCardItem
          label="REQUESTER"
          value={`${resource.requester.display}`}
        />
      )}
      {resource.authoredOn && (
        <TimelineDetailsCardItem
          label="AUTHORED ON"
          value={formatDatePeriod(resource.authoredOn)}
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

export default MedicationsTimelineCard;
