import { useContext } from "react";
import {
  AccordionContext,
  useAccordionToggle,
  Accordion,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./index.less";

function ContextAwareToggle({ children, eventKey, callback }: any) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <div className="toggle-header" onClick={decoratedOnClick}>
      {isCurrentEventKey ? (
        <FontAwesomeIcon icon={faCaretDown} className="toggle-icon" />
      ) : (
        <FontAwesomeIcon icon={faCaretRight} className="toggle-icon" />
      )}

      {children}
    </div>
  );
}

const TimelineDetailsCardDropdown = ({ items, header }: any) => {
  return (
    <Accordion defaultActiveKey="0" id="timeline-details-dropdown-item">
      <ContextAwareToggle eventKey="1">
        <span className="header-title">{header}</span>
      </ContextAwareToggle>

      <Accordion.Collapse eventKey="1">
        <div className="dropdown-content">
          {items?.map((x: any) => (
            <p>{x}</p>
          ))}
        </div>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default TimelineDetailsCardDropdown;
