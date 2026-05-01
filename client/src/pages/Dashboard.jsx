import React from 'react'
import TripClient from '@/components/TripClient'
import {redirect} from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import {getTrips, getPastTrips, getFutureTrips} from '@/lib/queries/trips'

export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log('Session:', JSON.stringify(session, null, 2));
  if(!session?.user){
    redirect('/login')
  }
  const trips = await getTrips(session.user.id);
  const futureTrips = await getFutureTrips(session.user.id);
  const pastTrips = await getPastTrips(session.user.id);
  return (
    <TripClient trips={trips} futureTrips={futureTrips} pastTrips={pastTrips} />
  )
}