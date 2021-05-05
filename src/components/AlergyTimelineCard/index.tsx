import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const AllergyTimelineCard = ({ resource }: any) => {
  return (
    <div id="allergy-timeline-card">
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
        (resource.clinicalStatus.coding[0].display ||
          resource.clinicalStatus.coding[0].code) && (
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
          items={resource.category.map((item: any) => (
            <TimelineDetailsCardItem label="Value" value={item} />
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
              !!item.substance &&
              item.substance.coding &&
              item.substance.coding.length &&
              item.substance.coding[0].display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="SUBSTANCE"
                  value={item.substance.coding[0].display}
                />
              );
            }

            if (
              !!item.manifestation?.length &&
              item.manifestation[0].coding &&
              item.manifestation[0].coding.length &&
              item.manifestation[0].coding[0].display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="MANIFESTATION"
                  value={item.manifestation[0].coding[0].display}
                />
              );
            }

            if (!!item.severity) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="SEVERITY"
                  value={item.severity}
                />
              );
            }

            return resultItems;
          })}
        />
      )}
    </div>
  );
};

export default AllergyTimelineCard;
