import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const CarePlanTimelineCard = ({ resource }: any) => {
  return (
    <div id="careplan-timeline-card">
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

      {resource.status && resource.status.length > 0 && (
        <TimelineDetailsCardItem label="STATUS" value={`${resource.status}`} />
      )}

      {resource.intent && (
        <TimelineDetailsCardItem label="INTENT" value={resource.intent} />
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
      {resource.period && resource.period.start && (
        <TimelineDetailsCardItem
          label="PERIOD"
          value={formatDatePeriod(resource.period.start)}
        />
      )}
      {resource.recordedDate && (
        <TimelineDetailsCardItem
          label="RECORDED DATE"
          value={formatDatePeriod(resource.period.recordedDate)}
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

      {!!resource.activity?.length && (
        <TimelineDetailsCardDropdown
          header="ACTIVITIES"
          items={resource.activity.map((item: any) => {
            const resultItems = [];

            if (item?.detail?.code) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="Code"
                  value={item?.detail?.code?.text || ""}
                />
              );
            }

            if (item?.detail?.status) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="STATUS"
                  value={item?.detail?.status || ""}
                />
              );
            }

            if (item?.detail?.location && item?.detail?.location.display) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label="LOCATION"
                  value={item?.detail?.location.display || ""}
                />
              );
            }
          })}
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

export default CarePlanTimelineCard;
