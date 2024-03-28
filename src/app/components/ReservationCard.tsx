import React from 'react'

interface reservationData {
          id: String,    
          userID: String,
          userName: String,
          userEmail:String,
          carID: String,
          time: Date,
          car: {
            id: String,
            carName: String,
            Img: string[],
            brand: String,
            price: Number,
            Fuel: String,
            Mileage: Number,
            model: String,
            Plate: String,
            type: String,
            Transmission: String,
            Color: String,
            Availability: String,
            Seat: Number,
            KmsDone: Number,
            ownerShip: Number,
            Year: Number
          }
}

const ReservationCard = ({data}:{data:reservationData}) => {
  return (
    <div className='w-[100%]  ' >
        <div className='flex flex-col' >
            <div className='text-muted-foreground py-2'>Reservation ID : <span >{data.id}</span> </div>
            <div className='flex justify-around'>
                <div>
                    <img src={data.car.Img[0]} className='w-[300px]' alt="" />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='my-3 w-[200px] font-semibold text-xl'> {data.car.carName} </div>
                    <div className='font-semibold text-lg'> ₹ {data.car.price.toLocaleString()} </div>
                    <div className='font-semibold'>Reserved on - <br/> {data.time.toLocaleDateString()} {data.time.toLocaleTimeString()} </div>
                </div>
                    
                <div className='flex flex-col gap-4 w-[350px]'>
                    <div className='font-semibold text-lg'>
                        AMOUNT RECIEVED - ₹ {(data.car.price as number / 5).toFixed(2)}
                    </div>
                    <div className='font-semibold text-lg'>
                        PAY ₹ {((data.car.price as number / 5)* 4).toFixed() } MORE TO MAKE THIS YOURS
                    </div>
                    <div className=' border w-[200px] text-center border-slate-400 font-semibold cursor-pointer bg-red-500 hover:bg-red-700 text-white  p-2 rounded-md border-opacity-55  text-sm duration-300 transition-all hover:border-opacity-100'>
                        Cancel Reservation
                    </div>
                    <div className=' border w-[200px] text-center border-slate-400 font-semibold cursor-pointer bg-blue-500 hover:bg-blue-700 text-white  p-2 rounded-md border-opacity-55 text-sm  duration-300 transition-all hover:border-opacity-100'>
                        Purchase this Car
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ReservationCard