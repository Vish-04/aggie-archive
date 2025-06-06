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

  // check if class is current
  const checkCurrent = (crsNum: string): boolean => {
    return currClasses.some(crs => crs.course_code == crsNum);
  }

  // add class to archived set
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

  // check if class is archived
  const checkArchived = (crsNum: string): boolean => {
      return archivedClasses.some(crs => crs.course_code == crsNum);
  }



  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <div className="pl-12 pt-2">
        <h1 className="text-3xl font-bold mb-2 mt-9">Hi, user</h1>

        <SearchBar onToggleClass={handleClasses} isCurrent={checkCurrent} />

        <h2 className="text-2xl font-semibold mt-10 mb-6">My Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {currClasses.map(course => (
            <ClassCard key={course.id} course={course} onToggleClass={handleClasses} onToggleArchive={handleArchive} isArchived={checkArchived}/>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Archived Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {archivedClasses.map(course => (
            <ClassCard key={course.id} course={course} onToggleClass={handleClasses} onToggleArchive={handleArchive} isArchived={checkArchived}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page