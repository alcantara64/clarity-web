import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useStores } from "../../models";

import claimsIcon from "../../images/claims-icon.svg";
import alergyIcon from "../../images/alergy-icon.svg";
import proceduresIcon from "../../images/procedures-icon.svg";
import immunizationIcon from "../../images/immunisation-icon.svg";
import conditionsIcon from "../../images/conditions-icon.svg";
import medicationsIcon from "../../images/medications-icon.svg";
import prescriptionsIcon from "../../images/prescription-icon.svg";
import observationIcon from "../../images/observation-icon.svg";
import carePlanIcon from "../../images/careplan-icon.svg";
import diagnosticIcon from "../../images/diagnostic-icon.svg";
import documentIcon from "../../images/document-icon.svg";
import encounterIcon from "../../images/encounter-icon.svg";
import { CLAIMS_AND_CLINICAL_RESOURCE } from "../../constants/constants";

import "./index.less";
import TimelineList from "../../components/TimelineList";

const resources = [
  {
    name: "Claims",
    color: "#6BE38D",
    resource: "ExplanationOfBenefit",
    displayKeys: ["Substance", "Date"],
    screen: "ClaimsScreen",
  },
  {
    name: "Allergy",
    color: "#FFC657",
    resource: "AllergyIntolerance",
    displayKeys: ["Substance", "Date"],
    screen: "AllergyScreen",
  },
  {
    name: "Procedures",
    color: "#FF7C53",
    resource: "Procedures",
    displayKeys: ["Name", "Date Performed"],
    screen: "ProcedureScreen",
  },
  {
    name: "Immunizations",
    color: "#FFC657",
    resource: "Immunization",
    displayKeys: ["Vaccine Code", "Date Administered"],
    screen: "ImmunizationScreen",
  },
  {
    name: "Conditions",
    color: "#A56BD2",
    resource: "Condition",
    displayKeys: ["Condition", "Date"],
    screen: "ConditionScreen",
  },
  {
    name: "Medication",
    color: "#6BE38D",
    resource: "MedicationStatement",
    displayKeys: ["Medication", "Date Prescribed"],
    screen: "MedicationScreen",
  },
  {
    name: "Prescription",
    color: "#FF7C53",
    resource: "MedicationRequest",
    displayKeys: ["Medication", "Date Prescribed"],
    screen: "PrescriptionScreen",
  },
  {
    name: "Observation",
    color: "#FFC657",
    resource: "Observation",
    displayKeys: ["Date observed", ""],
    screen: "ObservationScreen",
  },
  {
    name: "CarePlan",
    color: "#A56BD2",
    resource: "CarePlan",
    displayKeys: ["Activities", "Timing"],
    screen: "CareplanScreen",
  },
  {
    name: "DiagnosticReport",
    color: "#6BE38D",
    resource: "DiagnosticReport",
    displayKeys: ["Category", "Date"],
    screen: "DiagnosticReportScreen",
  },
  {
    name: "DocumentReference",
    color: "#FF7C53",
    resource: "DocumentReference",
    displayKeys: ["Category", "Date Created"],
    screen: "DocumentReferenceScreen",
  },
];

const TimeLine = () => {
  const { patientStore, payerStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  const [currentResource, setCurrentResource] = useState(
    "ExplanationOfBenefit"
  );

  const [resourceData, setResourceData]: any = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const defaultPayer = payerStore.defaultPayer();

      const resp = await patientStore
        .getFhirData(currentResource, defaultPayer?._id)
        .catch(() => {});

      if (resp.kind == "ok") {
        setResourceData(resp.data);
      } else {
        setResourceData(null);
      }

      setIsLoading(false);
    })();
  }, [currentResource]);

  const getResourceImage = (resourceName: string) => {
    if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.allergy) return alergyIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.carePlan)
      return carePlanIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.claims)
      return claimsIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.condition)
      return conditionsIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.diagnosticReport)
      return diagnosticIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.documentReference)
      return documentIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.immunization)
      return immunizationIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.medication)
      return medicationsIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.observation)
      return observationIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.prescription)
      return prescriptionsIcon;
    else if (resourceName == CLAIMS_AND_CLINICAL_RESOURCE.procedure)
      return proceduresIcon;

    return "";
  };

  const getNameResource = (resourceName: string) => {
    return resources?.find((x) => x.resource == resourceName)?.name;
  };

  const ResourceItem = ({
    name,
    color,
    resourceName,
    selected,
    onClick = () => {},
  }: any) => {
    return (
      <div
        className="resource-item"
        style={{ backgroundColor: selected ? "#F5F6F8" : "transparent" }}
        onClick={onClick}
      >
        <div
          className="resource-image-container"
          style={{ backgroundColor: color }}
        >
          <img src={getResourceImage(resourceName)} alt={name} />
        </div>
        <span className="resource-name"> {name}</span>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app-timeline">
      <div className="resource-container">
        {resources.map((item) => (
          <ResourceItem
            key={item.name}
            resourceName={item.resource}
            name={item.name}
            color={item.color}
            selected={currentResource == item.resource}
            onClick={() => {
              setCurrentResource(item.resource);
            }}
          />
        ))}
      </div>

      <div className="timeline-content">
        <h5 className="timeline-title">{getNameResource(currentResource)}</h5>

        <TimelineList data={resourceData?.entry || []} resourceName={""} />
      </div>
    </div>
  );
};

export default TimeLine;
