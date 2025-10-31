import { useState } from 'react';
import ViewToggle from '../ViewToggle';

export default function ViewToggleExample() {
  const [view, setView] = useState<"week" | "month">("week");

  return (
    <div className="p-4">
      <ViewToggle view={view} onViewChange={setView} />
      <p className="mt-4 text-sm text-muted-foreground">Current view: {view}</p>
    </div>
  );
}
