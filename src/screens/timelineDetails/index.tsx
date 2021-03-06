import { useHistory } from "react-router";
import { getTimelineNameResource } from "../../factories/utils";

//import encounterIcon from "../../images/encounter-icon.svg";

import "./index.less";
import { CLAIMS_AND_CLINICAL_RESOURCE } from "../../constants/constants";
import SecondaryButton from "../../components/SecondaryButton";
import Button from "../../components/Button";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import ClaimsTimelineCard from "../../components/ClaimsTimelineCard";
import ProceduresTimelineCard from "../../components/ProceduresTimelineCard";
import AllergyTimelineCard from "../../components/AlergyTimelineCard";
import ConidtionsTimelineCardItem from "../../components/ConditionsTimelineCard";
import ImmunizationsCardItem from "../../components/ImmunizationTimelineCard";
import MedicationsTimelineCard from "../../components/MedicationsTimelineCard";
import PrescriptionsTimelineCard from "../../components/PrescriptionsTimelineCard";
import ObservationsTimelineCard from "../../components/ObservationsTimelineCard";
import CarePlanTimelineCard from "../../components/CardPlanTimelineCard";
import DiagnosticReportTimelineCard from "../../components/DiagnosticReportTimelineCard";
import JSONTree from "react-json-tree";
import { getResourceImage } from "../../util/Timeline.util";
import HealthCareServiceTimelineCard from "../../components/HealthCareServiceCard";
import ListCardItem from "../../components/ListCard";
const TimelineDetails = () => {
  const history = useHistory();

  const { timelineData }: any = history.location.state;

  const { resource } = timelineData;

  const [showRawData, setShowRawData] = useState(false);

  const RawDataView = ({
    content = "",
    show = false,
    handleClose = () => {},
  }) => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        dialogClassName="modal-90w"
        scrollable
        className="view-data-modal"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title className="header-title">Raw JSON Output</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="body-content">
            <JSONTree
              data={content}
              theme={{
                extend: "monokai",
                tree: {
                  backgroundColor: "#F3F6F9",
                },
                valueText: {
                  flex: 1,
                  flexWrap: "wrap",
                },
              }}
            ></JSONTree>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const renderDetailsContent = (resource: any) => {
    const { resourceType } = resource;
    switch (resourceType) {
      case CLAIMS_AND_CLINICAL_RESOURCE.claims:
        return <ClaimsTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.allergy:
        return <AllergyTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.procedure:
        return <ProceduresTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.immunization:
        return <ImmunizationsCardItem resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.condition:
        return <ConidtionsTimelineCardItem resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.medication:
        return <MedicationsTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.prescription:
        return <PrescriptionsTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.observation:
        return <ObservationsTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.carePlan:
        return <CarePlanTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.diagnosticReport:
        return <DiagnosticReportTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.healthcare:
        return <HealthCareServiceTimelineCard resource={resource} />;
      case CLAIMS_AND_CLINICAL_RESOURCE.list:
        return <ListCardItem resource={resource} />;
      default:
        return null || <div>No data found</div>;
    }
  };

  return (
    <div id="app-timeline-details">
      {
        <RawDataView
          show={showRawData}
          content={resource}
          handleClose={() => {
            setShowRawData(false);
          }}
        />
      }
      <div className="top-section">
        <SecondaryButton
          label="Back"
          className="back-button"
          onClick={() => {
            history.goBack();
          }}
        />

        <Button
          label="View Raw Data"
          className="view-button"
          onClick={() => {
            setShowRawData(true);
          }}
        />
      </div>
      <div className="details-header-container">
        <span className="header-title">
          {getTimelineNameResource(resource?.resourceType)}
        </span>

        <img
          src={getResourceImage(resource?.resourceType)}
          className="header-logo"
          alt="resource"
        />
      </div>
      <div className="details-content">{renderDetailsContent(resource)}</div>
    </div>
  );
};

export default TimelineDetails;
