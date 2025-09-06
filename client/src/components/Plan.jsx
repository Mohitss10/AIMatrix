import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <section className=" z-20 pt-32 pb-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="bg-gradient-to-r from-gray-300 via-gray-500 to-gray-800 bg-clip-text text-transparent text-4xl sm:text-[42px] font-medium">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-base sm:text-lg">
          Start for free and scale as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>

      <div className="max-w-5xl mx-auto sm:px-3">
        <div className="rounded-2xl  transition-all duration-500 ease-in-out hover:shadow-3xl hover:scale-[1.02]">
          <div className=" rounded-2xl sm:p-4 bg-transparent">
            <PricingTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plan
