import claimsIcon from '../images/claims-icon.svg';
import alergyIcon from '../images/alergy-icon.svg';
import proceduresIcon from '../images/procedures-icon.svg';
import immunizationIcon from '../images/immunisation-icon.svg';
import conditionsIcon from '../images/conditions-icon.svg';
import medicationsIcon from '../images/medications-icon.svg';
import prescriptionsIcon from '../images/prescription-icon.svg';
import observationIcon from '../images/observation-icon.svg';
import carePlanIcon from '../images/careplan-icon.svg';
import diagnosticIcon from '../images/diagnostic-icon.svg';
import encounterIcon from '../images/encounter-icon.svg';
import insuranceIcon from '../images/insurance-icon.svg';
import healthcareIcon from '../images/healthcare-icon.svg';
import organizationIcon from '../images/organization-icon.svg';
import practicionerIcon from '../images/practicioner-icon.svg';
import affiliationIcon from '../images/affiliation-icon.svg';
import locationIcon from '../images/location-icon.svg';
import roleIcon from '../images/role-icon.svg';
import documentIcon from '../images/document-icon.svg';
import ListIcon from '../images/list.svg';
import KnowledgeIcon from '../images/knowledge.svg';
import { CLAIMS_AND_CLINICAL_RESOURCE } from '../constants/constants';

export const getResourceImage = (resourceName: string) => {
    switch (resourceName) {
      case CLAIMS_AND_CLINICAL_RESOURCE.allergy:
        return alergyIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.carePlan:
        return carePlanIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.claims:
        return claimsIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.condition:
        return conditionsIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.diagnosticReport:
        return diagnosticIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.documentReference:
        return documentIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.immunization:
        return immunizationIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.medication:
        return medicationsIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.observation:
        return observationIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.prescription:
        return prescriptionsIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.procedure:
        return proceduresIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.encounter:
        return encounterIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.insurance:
        return insuranceIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.healthcare:
        return healthcareIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.organization:
        return organizationIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.practitioner:
        return practicionerIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.role:
        return roleIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.location:
        return locationIcon;

      case CLAIMS_AND_CLINICAL_RESOURCE.affiliation:
        return affiliationIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.list:
        return ListIcon;
      case CLAIMS_AND_CLINICAL_RESOURCE.knowledge:
        return KnowledgeIcon;

      default:
        return '';
    }
  };