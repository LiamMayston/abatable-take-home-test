import { useEffect, useState } from "react";
import { Position } from "@/types/portfolio";
import { PositionsTable } from "@/components/PositionsTable";
import { useToast } from "@/hooks/use-toast";
import SummaryCard from "@/components/SummaryCard";

const API_BASE_URL = "http://localhost:4000/api";

const Index = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      setIsLoadingPositions(true);
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      if (!response.ok) throw new Error("Failed to fetch positions");
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to load portfolio positions. Make sure the backend is running.",
        variant: "destructive",
      });
      console.error("Error fetching positions:", error);
    } finally {
      setIsLoadingPositions(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Carbon Portfolio</h1>
          <p className="text-muted-foreground">
            Manage and track your carbon credit positions
          </p>
        </div>
        <SummaryCard />
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Positions</h2>
            {isLoadingPositions ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading positions...
              </div>
            ) : positions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No positions found
              </div>
            ) : (
              <PositionsTable positions={positions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
