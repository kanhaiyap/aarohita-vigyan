import React from 'react'
export default function SectionHeader({title, subtitle}){
return (
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">{title}</h2>
{subtitle && <p className="text-xl text-gray-400 max-w-3xl mx-auto">{subtitle}</p>}
<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full" />
</div>
)
}