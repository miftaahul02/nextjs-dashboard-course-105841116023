import { generateYAxis } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

// This component is a full component, but we'll include a simple skeleton as a fallback
export default function RevenueChart({ revenue }: { revenue: Revenue[] }) {
  // If no revenue data, return a message or an empty chart.
  if (!revenue || revenue.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-[350px]">
        <p className="text-gray-500">Tidak ada data pendapatan yang tersedia.</p>
      </div>
    );
  }

  // Generate y-axis labels and find the highest amount
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M11.995 2.072a.75.75 0 0 0-.583-.053l-6.848 1.43c-1.229.256-2.072 1.347-2.072 2.658V18.75c0 1.311.843 2.402 2.072 2.658l6.848 1.43a.75.75 0 0 0 .583 0l6.848-1.43c1.229-.256 2.072-1.347 2.072-2.658V4.15c0-1.311-.843-2.402-2.072-2.658l-6.848-1.43a.75.75 0 0 0-.175 0Zm.005 5.928a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V8ZM9.75 8.25a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-7.5ZM6 8.25a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="ml-2 text-sm text-gray-500">
            Last 12 months
          </h3>
        </div>
      </div>
    </div>
  );
}

// You can create a new component for the skeleton or just export the same skeleton as before
export function RevenueChartSkeleton() {
  return (
    <div className="w-full md:col-span-4">
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid h-[350px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
