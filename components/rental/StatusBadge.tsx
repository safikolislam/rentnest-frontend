import { RentalStatus } from "@/lib/types";


const statusStyles: Record<RentalStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-blue-100 text-blue-800",
  REJECTED: "bg-red-100 text-red-800",
  ACTIVE: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
};

const StatusBadge = ({ status }: { status: RentalStatus }) => {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;