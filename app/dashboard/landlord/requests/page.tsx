import { getLandlordRequests } from "@/lib/api/landlordRequest";
import RequestCard from "@/components/rental/RequestCard";

const LandlordRequestsPage = async () => {
  const { data: requests } = await getLandlordRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rental Requests</h1>
        <p className="text-muted-foreground">
          {requests.length} request{requests.length !== 1 && "s"} received
        </p>
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">
          No rental requests yet.
        </p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordRequestsPage;  