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

import {
  CLAIMS_AND_CLINICAL_RESOURCE,
  TimelineResources,
} from "../../constants/constants";

import "./index.less";
import TimelineList from "../../components/TimelineList";
import { useHistory } from "react-router";
import { ROUTES } from "../../constants/routes";
import { getTimelineNameResource } from "../../factories/utils";
import { observer } from "mobx-react-lite";

const TimeLine = observer(() => {
  const { patientStore, payerStore } = useStores();

  const { selectedResource } = patientStore;

  const [isLoading, setIsLoading] = useState(false);

  // const [currentResource, setCurrentResource] = useState(
  //   patientStore.selectedResource
  // );

  const [resourceData, setResourceData]: any = useState(null);

  const history = useHistory();
  useEffect(() =>{
    const defaultPayer = payerStore.defaultPayer();
    if(!defaultPayer?.is_connected){
      history.push(ROUTES.oauth)
    }
  },[])

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const defaultPayer = payerStore.defaultPayer();

      const resp = await patientStore
        .getFhirData(selectedResource, defaultPayer?._id)
        .catch(() => {});

      if (resp.kind == "ok") {
        setResourceData(resp.data);
      } else {
        setResourceData(null);
      }

      setIsLoading(false);
    })();
  }, [patientStore.selectedResource]);

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

  const onTimelineClick = (item: any) => {
    history.push(ROUTES.timeLineDetails, {
      timelineData: item,
    });
  };

  return (
    <div id="app-timeline">
      {isLoading && <Loading />}
      <div className="resource-container">
        {TimelineResources.map((item) => (
          <ResourceItem
            key={item.name}
            resourceName={item.resource}
            name={item.name}
            color={item.color}
            selected={selectedResource == item.resource}
            onClick={() => {
              patientStore.setSelectedResource(item.resource);
            }}
          />
        ))}
      </div>

      <div className="timeline-content">
        <h5 className="timeline-title">
          {getTimelineNameResource(selectedResource)}
        </h5>

        <TimelineList
          data={resourceData?.entry || []}
          itemClick={onTimelineClick}
        />
      </div>
    </div>
  );
});

export default TimeLine;