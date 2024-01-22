"use client"
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { UserButton } from "@clerk/nextjs";
import { LoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
const [source, setSource]= useState([]);
const [destination, setDestination]= useState([]);

  return (
    // makes the source aka pickup location globally accessible
    <SourceContext.Provider value={{source, setSource}}>
    {/*makes the destination aka Dropoff location globally accessible */}
    <DestinationContext.Provider value={{destination,setDestination}}>
    {/* allows us to only need one api key use that is, we dont need to state the api key in other files now */}
    <LoadScript 
      libraries={["places"]}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <SearchSection/>
      </div>
      <div className="col-span-2">
        
        <GoogleMapSection/> 
        </div>
    </div>
    </LoadScript>
    </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
