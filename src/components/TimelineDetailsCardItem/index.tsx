import "./index.less";

const TimelineDetailsCardItem = ({ label = "", value = "" }) => {
  return (
    <div id="timeline-details-card-item">
      <span>{label}</span>

      <span>{value}</span>
    </div>
  );
};

export default TimelineDetailsCardItem;
