import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { PortfolioSummary } from '@/types/portfolio';
import { toast } from '@/hooks/use-toast'

type StatusFilter = 'all' | 'available' | 'retired';

const API_BASE_URL = "http://localhost:4000/api";


const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
};

const fetchSummary = async (filter: StatusFilter): Promise<PortfolioSummary> => {
    const url = filter === 'all'
        ? `${API_BASE_URL}/portfolio/summary`
        : `${API_BASE_URL}/portfolio/summary?status=${filter}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch summary");
    return response.json();
};

const SummaryCard = () => {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    const { data: summary, isLoading, error, isError } = useQuery({
        queryKey: ['portfolio-summary', statusFilter],
        queryFn: () => fetchSummary(statusFilter),
    });

    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description:
                    "Failed to load portfolio summary. Make sure the backend is running.",
                variant: "destructive",
            });
            console.error("Error fetching summary:", error);
        }
    }, [isError, error]);

    return (
        <div className='flex-col gap-4 pb-8'>
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            {isError && <div>Failed to load. Please try again later</div>}
            {!isError && <>
                <RadioGroup
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                    className="flex gap-6 mb-4"
                >
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="available" id="available" />
                        <Label htmlFor="available">Available</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="retired" id="retired" />
                        <Label htmlFor="retired">Retired</Label>
                    </div>
                </RadioGroup>

                <Card>
                    <CardContent className="grid grid-cols-3 gap-6 pt-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Value</p>
                            {isLoading ? <Skeleton className="h-6 w-32 mt-1 bg-muted-foreground/20" /> : <p className="text-2xl font-semibold">{`${formatCurrency(summary.totalValue)}`}</p>}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Tonnes</p>
                            {isLoading ? <Skeleton className="h-6 w-32 mt-1 bg-muted-foreground/20" /> : <p className="text-2xl font-semibold">{`${formatNumber(summary.totalTonnes)} t`}</p>}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Price per Tonne</p>
                            {isLoading ? <Skeleton className="h-6 w-32 mt-1 bg-muted-foreground/20" /> : <p className="text-2xl font-semibold">{`${formatCurrency(summary.averagePricePerTonne)}`}</p>}
                        </div>
                    </CardContent>
                </Card>
            </>}
        </div>
    )
}

export default SummaryCard
