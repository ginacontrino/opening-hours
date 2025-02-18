import { daysOfWeek } from '../../constants';
import { OpeningHoursByDay, TimePeriod } from '../../types';
import { getIsToday } from '../../utils/time/getIsToday';
import { Clock as ClockIcon } from '../icons/Clock';
import { formatReadableTimeFromSeconds } from '../../utils/time/formatReadableTimeFromSeconds';

import './OpeningHours.css';

type OpeningHoursProps = {
  hours: OpeningHoursByDay;
  animated?: boolean; 
};

const Times = ({ times }: { times: TimePeriod[] }) => (
  <>
    {times.map(([open, close], i) => (
      <time key={i} dateTime={`${open}-${close}`}>
        {formatReadableTimeFromSeconds(open)} {' - '} {formatReadableTimeFromSeconds(close)}
      </time>
    ))}
  </>
);

export function OpeningHours({ hours, animated }: OpeningHoursProps) {
  const getExceptionalHoursLabel = (holiday?: string, isExceptional?: boolean) => {
    if (holiday) return `Holiday hours (${holiday})`;
    if (isExceptional) return 'Special hours';
    return null;
  };

  return (
    <aside className={`card ${animated ? 'animated' : ''}`}>
      <header className="card-header">
        <ClockIcon aria-hidden="true" />
        <h3>Opening hours</h3>
      </header>

      <ul className="opening-hours-list">
        {daysOfWeek.map((day) => {
          const { times = [], holiday, isExceptional } = hours[day] || {};
          const exceptionalHoursLabel = getExceptionalHoursLabel(holiday, isExceptional);

          return (
            <li key={day}>
              <span className="day">
                {day}
                {getIsToday(day) && <span className="today">Today</span>}
              </span>
              <div className="times">
                {times.length > 0 ? (
                  <Times times={times} />
                ) : (
                  <div className="closed-day">Closed</div>
                )}
                {exceptionalHoursLabel && (
                  <div className="exceptional-hours">{exceptionalHoursLabel}</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
