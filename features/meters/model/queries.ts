import { GetMetersRes, Meter } from "./types";

const MOCK_METERS: Meter[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i + 1),
  meter_number: `EL-MN-${2080 + i}`,
  type: "electric",
  status: "active",
  direction: "outgoing",
  consumer: i % 3 === 0 ? { id: `c-${i}`, name: "John Doe" } : undefined,
  current_reading: 23.43 + i * 1.5,
  created_at: new Date().toISOString().split("T")[0],
}));

export const getMeters = async (page = 1, page_size = 10): Promise<GetMetersRes> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const start = (page - 1) * page_size;
  const end = start + page_size;
  const data = MOCK_METERS.slice(start, end);

  return {
    count: MOCK_METERS.length,
    next: end < MOCK_METERS.length ? "next" : null,
    previous: page > 1 ? "prev" : null,
    total_pages: Math.ceil(MOCK_METERS.length / page_size),
    data,
  };
};
