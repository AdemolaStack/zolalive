import { useCountdown } from "../../utils/countdown";

const Countdown = ({ kickoff, status, variant = "compact" }) => {
  const { days, hours, minutes, seconds, isLive } = useCountdown(kickoff);

  // If live
  if (isLive || status === "live") {
    return <span className="live-badge">LIVE</span>;
  }

  // Featured variant — segmented boxes
  if (variant === "featured") {
    const segments = [
      { label: "Days", value: days },
      { label: "Hrs", value: hours },
      { label: "Min", value: minutes },
      { label: "Sec", value: seconds },
    ];

    return (
      <div className="countdown-featured">
        {segments.map((seg, i) => (
          <div key={seg.label} className="countdown-segment">
            <span className="countdown-value">{seg.value}</span>
            <span className="countdown-label">{seg.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Compact variant — inline text
  const parts = [];
  if (parseInt(days) > 0) parts.push(`${parseInt(days)}d`);
  parts.push(`${parseInt(hours)}h`);
  parts.push(`${parseInt(minutes)}m`);

  return (
    <span className="upcoming-badge">
      {parts.join(" ")}
    </span>
  );
};

export default Countdown;