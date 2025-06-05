'use client';

import React, { useState } from 'react'
import ClassCard from '@/components/ClassCard';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import Header from '@/components/header';


const page = () => {
  // set current classes under 'My Classes'
  const [currClasses, setCurrClasses] = useState<any[]>([]);

  const handleClasses = (course: any) => {
    setCurrClasses(prev => {
      const inSet = prev.some((crs) => crs.id == course.id)
      if (inSet) {
        return prev.filter((crs) => crs.id !== course.id)
      }
      else {
        return [...prev, course]
      }
    })
  }

  // set classes to archived
  const [archivedClasses, setArchivedClasses] = useState<any[]>([]);

  const handleArchive = (course: any) => {
    setArchivedClasses(prev => {
      const inArchived = prev.some((crs) => crs.id == course.id)
      if (inArchived) {
        return prev.filter((crs) => crs.id !== course.id)
      }
      else {
        return [...prev, course]
      }
    })
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <Header></Header>
      <hr className="border-gray-300 mb-4" />
      <div className='pl-12'>
        <h1 className="text-3xl font-bold mb-2 mt-9">Hi, user</h1>

        <SearchBar onToggleClass={handleClasses} onToggleArchive={handleArchive} />

        <h2 className="text-2xl font-semibold mt-10 mb-6">My Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {currClasses.map(course => (
            <ClassCard key={course.id} courseNumber={course.course_code} courseName={course.title} />
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Archived Classes</h2>
        <div className="flex flex-row gap-4 mb-10">
          {archivedClasses.map(course => (
            <ClassCard key={course.id} courseNumber={course.course_code} courseName={course.title} />
          ))}
          <ClassCard courseNumber="ECS162" courseName="Web Programming" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default page