'use client'
import { DonutChart, Legend } from '@tremor/react';




export default function CarDonutChartUsageExample({carCount}:{carCount:any}) {
  
    const datahero = [
        {
          name: 'Available',
          value: carCount.availableCaras,
        },
        {
          name: 'Reserved',
          value: carCount.ReservedCaras,
        },
        {
          name: 'Sold',
          value: carCount.soldCars,
        }
      ];

  return (
    <div className=" space-y-12 w-[300px]">
    <div className="space-y-3 my-5">
      <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        TOTAL CARS ({carCount.carCount}) 
      </span>
      <div className="flex flex-col justify-center items-center gap-4 my-5 ">
        <DonutChart
         colors={[
             "green",
             "yellow",
             "red",
          ]}
          className='w-[300px]'
          data={datahero}
          variant="pie"
        />
        <Legend
          categories={['Available', 'Reserved','Sold']}
          colors={['green', 'yellow','red']}
          className="max-w-xs"
        />

      </div>
    </div>
  </div>
  );
}