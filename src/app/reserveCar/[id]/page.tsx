import React from 'react'
import NavMenu from '../../components/NavMenu'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { getServerSession } from 'next-auth'

async function getData() {

}

const page = async () => {

    const session = await getServerSession(authOptions)

    if (session === null) {
        toast("Please Login to access this resource")
        return redirect('/')
    }

    return (
        <div>
            <NavMenu />
            <div className="w-screen p-4">
                <h2 className='font-semibold text-3xl'>Congratulations on Your First Car Reservation!</h2>
                <p className='text-lg font-semibold'>
                    Dear {session.user?.name},
                    <br />
                    We're thrilled to inform you that your reservation for your first car with HorsePower Cartel has been successfully received! 🚗
                </p>
                <div className="reservation-details">
                    <h3 className='text-md font-semibold'>Reservation Details:</h3>
                    <p>
                        {/* <strong>Car Model:</strong> {modelName} */}
                        <br />
                        {/* <strong>Color:</strong> {color} */}
                        <br />
                        {/* <strong>Reservation Number:</strong> {reservationNumber} */}
                        <br />
                        {/* <strong>Reservation Date:</strong> {reservationDate} */}
                    </p>
                </div>
                <h3>What's Next?</h3>
                <ol>
                    <li><strong>Confirmation Email:</strong> You will receive a confirmation email shortly with all the reservation details.</li>
                    <li><strong>Personalized Assistance:</strong> Our team will reach out to you within the next 24 hours to discuss the next steps and assist you with any queries you may have.</li>
                    <li><strong>Schedule a Test Drive:</strong> If you haven't had a chance to test drive your reserved car yet, we'll arrange a convenient time for you to experience it firsthand.</li>
                </ol>
                <div className="exclusive-benefits">
                    <h3>Exclusive Benefits for Reserving with Us:</h3>
                    <ul>
                        <li><strong>Priority Access:</strong> You'll be among the first to get behind the wheel of your dream car.</li>
                        <li><strong>Special Offers:</strong> Stay tuned for exclusive offers and deals reserved just for our valued customers like you.</li>
                        <li><strong>Dedicated Support:</strong> Our team is committed to providing you with exceptional service every step of the way.</li>
                    </ul>
                </div>
                <p>
                    <strong>Stay Connected:</strong> Follow us on [Social Media Handles] for the latest updates, car tips, and exciting announcements!
                </p>
                <p>
                    Thank you for choosing [Your Dealership Name] for your automotive needs. We're honored to be a part of your journey towards owning your dream car.
                    <br />
                    If you have any immediate questions or concerns, feel free to contact us at [Contact Information].
                </p>
                <p>Best Regards,</p>
                <p>[Your Name]<br />[Your Position]<br />[Your Dealership Name]</p>
            </div>
        </div>
    )
}

export default page