export const CLAIMS_AND_CLINICAL_RESOURCE = {
  claims: "ExplanationOfBenefit",
  allergy: "AllergyIntolerance",
  condition: "Condition",
  medication: "MedicationRequest",
  prescription: "MedicationStatement",
  immunization: "Immunization",
  procedure: "Procedures",
  carePlan: "CarePlan",
  diagnosticReport: "DiagnosticReport",
  documentReference: "DocumentReference",
  observation: "Observation",
};

export const AUTH_GRANT_TYPES = {
  password: "password",
  authorizationCode: "authorization_code",
  clientCredentials: "client_credentials",
  implicit: "implicit",
};

export const TimelineResources = [
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

export const TimelineDateFormat = "D MMM, YYYY";
