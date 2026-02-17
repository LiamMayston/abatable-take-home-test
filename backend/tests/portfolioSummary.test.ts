import { computeSummary } from "../src/services/portfolioSummary";
import { Position, PositionStatus } from "../src/types";

const filterByStatus = (positions: Position[], status: PositionStatus) =>
  positions.filter((p) => p.status === status);

describe("computeSummary", () => {
  it("should handle empty array", () => {
    const result = computeSummary([]);
    expect(result).toEqual({
      totalTonnes: 0,
      totalValue: 0,
      averagePricePerTonne: 0,
    });
  });

  it("should calculate correct totals for single position", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Test Project",
        tonnes: 100,
        pricePerTonne: 25,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(100);
    expect(result.totalValue).toBe(2500);
    expect(result.averagePricePerTonne).toBe(25);
  });

  it("should calculate weighted average correctly for multiple positions", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project A",
        tonnes: 1000,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Project B",
        tonnes: 100,
        pricePerTonne: 30,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(1100);
    expect(result.totalValue).toBe(23000);
    expect(result.averagePricePerTonne).toBeCloseTo(20.909, 2);
  });

  it("should handle positions with zero tonnes", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project A",
        tonnes: 100,
        pricePerTonne: 25,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Project B",
        tonnes: 0,
        pricePerTonne: 30,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(100);
    expect(result.totalValue).toBe(2500);
    expect(result.averagePricePerTonne).toBe(25);
  });
});

describe("filtering by status", () => {
  const positions: Position[] = [
    { id: "1", projectName: "Project A", tonnes: 100, pricePerTonne: 20, status: "available", vintage: 2023 },
    { id: "2", projectName: "Project B", tonnes: 200, pricePerTonne: 30, status: "available", vintage: 2023 },
    { id: "3", projectName: "Project C", tonnes: 50, pricePerTonne: 40, status: "retired", vintage: 2022 },
    { id: "4", projectName: "Project D", tonnes: 150, pricePerTonne: 10, status: "retired", vintage: 2022 },
  ];

  it("should summarise only available positions", () => {
    const result = computeSummary(filterByStatus(positions, "available"));

    expect(result.totalTonnes).toBe(300);
    expect(result.totalValue).toBe(8000);
    expect(result.averagePricePerTonne).toBeCloseTo(26.667, 2);
  });

  it("should summarise only retired positions", () => {
    const result = computeSummary(filterByStatus(positions, "retired"));

    expect(result.totalTonnes).toBe(200);
    expect(result.totalValue).toBe(3500);
    expect(result.averagePricePerTonne).toBe(17.5);
  });

  it("should return empty summary when no positions match the filter", () => {
    const available = positions.filter((p) => p.status === "available");
    const result = computeSummary(filterByStatus(available, "retired"));

    expect(result).toEqual({ totalTonnes: 0, totalValue: 0, averagePricePerTonne: 0 });
  });
});
