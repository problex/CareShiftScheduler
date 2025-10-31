import ShiftCard from '../ShiftCard';

export default function ShiftCardExample() {
  return (
    <div className="p-4 space-y-4 max-w-sm">
      <ShiftCard 
        timeSlot="7am - 3pm" 
        category="pe-home" 
        onDelete={() => console.log('Delete PE Home shift')} 
      />
      <ShiftCard 
        timeSlot="3pm - 11pm" 
        category="paul" 
        onDelete={() => console.log('Delete Paul shift')} 
      />
    </div>
  );
}
