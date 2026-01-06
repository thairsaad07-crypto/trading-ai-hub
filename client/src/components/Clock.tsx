import { useEffect, useState } from "react";
import { Calendar, Clock as ClockIcon } from "lucide-react";

export default function Clock() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time as HH:MM:SS
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);

      // Format date as YYYY/MM/DD
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      setDate(`${year}/${month}/${day}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 px-4 py-2 rounded bg-card/50 border border-border">
      <div className="flex items-center gap-2">
        <Calendar width={16} height={16} className="text-cyan-400" />
        <span className="text-sm font-bold text-cyan-400 data-text">{date}</span>
      </div>
      <div className="w-px h-6 bg-border" />
      <div className="flex items-center gap-2">
        <ClockIcon width={16} height={16} className="text-purple-400 animate-pulse" />
        <span className="text-sm font-bold text-purple-400 data-text">{time}</span>
      </div>
    </div>
  );
}
