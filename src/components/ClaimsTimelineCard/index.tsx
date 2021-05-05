import moment from "moment";
import { TimelineDateFormat } from "../../constants/constants";
import { formatDatePeriod } from "../../factories/utils";
import TimelineDetailsCardDropdown from "../TimelineDetailsCardDropdown";

import TimelineDetailsCardItem from "../TimelineDetailsCardItem";
import "./index.less";

const ClaimsTimelineCard = ({ resource }: any) => {
  console.log(resource);

  return (
    <div id="claims-timeline-card">
      {!!(Array.isArray(resource.contained) && resource.contained.length) && (
        <TimelineDetailsCardItem
          label="Clinical Status"
          value={resource.contained[0].status}
        />
      )}

      {resource.type &&
        Array.isArray(resource.type.coding) &&
        resource.type.coding.length > 0 &&
        (resource.type.coding[0].display || resource.type.coding[0].code) && (
          <TimelineDetailsCardItem
            label="TYPE"
            value={
              resource.type.coding[0].display || resource.type.coding[0].code
            }
          />
        )}

      {resource.subType &&
        !!Array.isArray(resource.subType.coding) &&
        resource.subType.coding.length > 0 &&
        (resource.subType.coding[0].display ||
          resource.subType.coding[0].code) && (
          <TimelineDetailsCardItem
            label="SUBTYPE"
            value={
              resource.subType.coding[0].display ||
              resource.subType.coding[0].code
            }
          />
        )}

      {!!resource.use && (
        <TimelineDetailsCardItem label="USE" value={resource.use} />
      )}

      {resource.created && (
        <TimelineDetailsCardItem
          label="CREATED"
          value={formatDatePeriod(resource.created)}
        />
      )}
      {resource.totalCost?.value && (
        <TimelineDetailsCardItem
          label="Total Cost"
          value={`${resource.totalCost.value} ${resource.totalCost.code}`}
        />
      )}

      {resource.payment?.amount && (
        <TimelineDetailsCardItem
          label="Payment"
          value={`${resource.payment.amount.value} ${resource.payment.amount.code}`}
        />
      )}

      {resource.payee &&
        resource.payee.type &&
        resource.payee.type.coding[0] &&
        resource.payee.type.coding[0].code && (
          <TimelineDetailsCardItem
            label="Payee"
            value={resource.payee.type.coding[0].code}
          />
        )}

      {resource.outcome && (
        <TimelineDetailsCardItem label="Outcome" value={resource.outcome} />
      )}

      {resource.insurer && resource.insurer.reference && (
        <TimelineDetailsCardItem
          label="Insurer"
          value={resource.insurer.reference}
        />
      )}

      {resource.provider && resource.provider.display && (
        <TimelineDetailsCardItem
          label="Provider"
          value={resource.provider.display}
        />
      )}

      {resource.payment &&
        resource.payment.type &&
        resource.payment.type.coding &&
        resource.payment.type.coding[0].code && (
          <TimelineDetailsCardItem
            label="Payment"
            value={resource.payment.type.coding[0].code}
          />
        )}

      {resource.procedure &&
        resource.procedure[0] &&
        resource.procedure[0].procedureCodeableConcept &&
        resource.procedure[0].procedureCodeableConcept.coding[0] &&
        resource.procedure[0].procedureCodeableConcept.coding[0].display && (
          <TimelineDetailsCardItem
            label="Procedure"
            value={
              resource.procedure[0].procedureCodeableConcept.coding[0].display
            }
          />
        )}

      {resource.billablePeriod && (
        <TimelineDetailsCardItem
          label="Billable Period"
          value={formatDatePeriod(
            resource.billablePeriod.start,
            resource.billablePeriod.end
          )}
        />
      )}
      {!!resource.supportingInfo?.length &&
        resource.supportingInfo[0].category && (
          <TimelineDetailsCardDropdown
            header="SUPPORTING INFO"
            items={resource.supportingInfo[0].category.coding.map(
              (x: any) => x.code || x.display
            )}
          />
        )}

      {!!resource.insurance?.length && (
        <TimelineDetailsCardDropdown
          header="Insurance"
          items={resource.insurance.map(
            (x: any) =>
              (
                <TimelineDetailsCardItem
                  label="Coverage"
                  value={x.coverage?.display}
                />
              ) || <TimelineDetailsCardItem label="Focal" value={x.focal} />
          )}
        />
      )}

      {!!resource.total?.length && (
        <TimelineDetailsCardDropdown
          header="Total"
          items={resource.total
            .filter(
              (item: any) =>
                item.category.coding[0].code &&
                item.amount.value &&
                item.amount.currency
            )
            ?.map((x: any) => (
              <TimelineDetailsCardItem
                label={x.category.coding[0].code}
                value={`${x.amount.currency} ${x.amount.value}`}
              />
            ))}
        />
      )}

      {!!resource.careTeam?.length && (
        <TimelineDetailsCardDropdown
          header="Care Team"
          items={resource.careTeam.map((item: any) => (
            <TimelineDetailsCardItem
              label="Role"
              value={item.role?.coding[0]?.display}
            />
          ))}
        />
      )}

      {!!(Array.isArray(resource.contained) && resource.contained.length) && (
        <TimelineDetailsCardItem
          label="Type"
          value={resource.contained[0].resourceType}
        />
      )}

      {!!resource.diagnosis?.length && (
        <TimelineDetailsCardDropdown
          header="Diagnosis"
          items={resource.careTeam.map((item: any) => (
            <TimelineDetailsCardItem
              label={item.diagnosisCodeableConcept?.coding[0]?.display || ""}
              value={item.diagnosisCodeableConcept?.coding[0]?.code || ""}
            />
          ))}
        />
      )}

      {!!resource.disposition && (
        <TimelineDetailsCardItem
          label="Disposition"
          value={resource.disposition}
        />
      )}

      {resource.hospitalization && (
        <TimelineDetailsCardItem
          label="Hospitalization"
          value={formatDatePeriod(
            resource.hospitalization.start,
            resource.hospitalization.end
          )}
        />
      )}

      {!!resource.item?.length && (
        <TimelineDetailsCardDropdown
          header="Item"
          items={resource.item.map((item: any) => {
            const resultItems = [];

            if (
              !!item.category?.coding.length &&
              item.category?.coding[0].display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label={"Category"}
                  value={item.category?.coding[0].display || ""}
                />
              );
            }
            if (
              !!item.productOrService?.coding.length &&
              item.productOrService?.coding[0].display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label={"Product or Service"}
                  value={item.productOrService?.coding[0].display || ""}
                />
              );
            }
            if (!!item.servicedDate) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label={"Serviced date"}
                  value={formatDatePeriod(item.servicedDate)}
                />
              );
            }
            if (
              !!item.adjudication.length &&
              item.adjudication[0].category.coding.length &&
              item.adjudication[0].category.coding[0].display
            ) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label={"Adjudication"}
                  value={item.adjudication[0].category.coding[0].display || ""}
                />
              );
            }
            if (!!item.quantity?.value) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label={"Quantity"}
                  value={item.quantity.value}
                />
              );
            }
            if (!!item.revenue?.coding?.length) {
              resultItems.push(
                <TimelineDetailsCardItem
                  label={"Revenue"}
                  value={item.revenue.coding[0]?.display}
                />
              );
            }

            return resultItems;
          })}
        />
      )}
      {!!resource.benefitBalance?.length && (
        <TimelineDetailsCardDropdown
          header="Benefit Balance"
          items={resource.benefitBalance.map((item: any) => (
            <TimelineDetailsCardDropdown
              header={item.category?.coding[0]?.display || ""}
              items={item.financial.map((finan: any) => (
                <TimelineDetailsCardItem
                  label={finan.type?.coding[0]?.display || ""}
                  value={finan.usedUnsignedInt || ""}
                />
              ))}
            />
          ))}
        />
      )}
    </div>
  );
};

export default ClaimsTimelineCard;
