'use client'
import { DonutChart, Legend } from '@tremor/react';

export default function DonutChartUsageExample({userCount,generalUsers,AdminUsers}:{userCount:any,generalUsers:number,AdminUsers:number}) {
    
    const dataFormatter = (number: number) =>  ` ${number.toString()}`;
    const datahero = [
        {
          name: 'Users',
          value: generalUsers,
        },
        {
          name: 'Admin',
          value: AdminUsers,
        }
      ];

  return (
    <div className=" space-y-12 w-[300px]">
    <div className="space-y-3 my-5">
      <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        TOTAL USERS ({userCount})
      </span>
      <div className="flex flex-col justify-center items-center gap-4 my-5 ">
        <DonutChart
         colors={[
             "blue",
             "green",
          ]}
          className='w-[300px]'
          data={datahero}
          variant="pie"
        />
        <Legend
          categories={['Users', 'Admin']}
          colors={['yellow', 'green']}
          className="max-w-xs"
        />
      </div>
    </div>
  </div>
  );
}