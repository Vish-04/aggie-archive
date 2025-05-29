import React from 'react'
import ClassCard from '@/components/ClassCard';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <h1 className="text-xl font-bold mb-2">noteorbit</h1>
      <hr className="border-gray-300 mb-4" />
      <h1 className="text-3xl font-bold mb-2 mt-9">Hi, user</h1>

      <SearchBar />

      <h2 className="text-2xl font-semibold mt-8 mb-4">My Classes</h2>
      <div className="flex flex-row gap-4 mb-6">
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Archived Classes</h2>
      <div className="flex flex-row gap-4 mb-10">
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        <ClassCard courseNumber="ECS162" courseName="Web Programming" />
      </div>
      <Footer></Footer>
    </div>
  )
}

export default page