import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="py-6 mt-8 sm:py-12 px-4 sm:px-20 xl:px-32 lg:grid lg:grid-cols-5">
            <div className="relative block h-32 lg:col-span-2 lg:h-full">
                <img
                    src="https://nation.ai/wp-content/uploads/2025/04/A-futuristic-digital-workspace-filled-with-holographic-interfaces-and-AI-generated-visuals_-a-person-1400x800.webp"
                    alt=""
                    className="absolute rounded-2xl inset-0 h-full w-full object-cover"
                />
            </div>

            <div className="px-4 py-8 sm:px-6 lg:col-span-3 lg:px-8 justify-end">
                <p className=" text-sm  mt-10">
                    <span className="font-bold text-5xl text-pink-400">Built with brainwaves & caffeine</span>
                    <span> — </span>
                    <span className=" text-3xl "> AIMatrix has your back!</span>
                </p>


                <div className="mt-2 border-t border-gray-white py-3">
                    <div className="sm:flex">
                        <ul className="flex flex-wrap gap-4 text-xs">
                            <li>
                                <a href="#" className=" transition hover:opacity-75"> Terms & Conditions </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75"> Privacy Policy </a>
                            </li>

                            <li>
                                <a href="#" className=" transition hover:opacity-75"> Cookies </a>
                            </li>
                        </ul>

                        <p className="mt-8 text-xs  sm:mt-0">
                            &copy; 2025 | AIMatrix  | All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer



