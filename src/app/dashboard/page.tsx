'use client';

import React, { useEffect, useState } from 'react'
import ClassCard from '@/components/ClassCard';
import SearchBar from '@/components/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchClass, fetchUser, updateUser } from '@/utils/db';
import { Class, User } from '@/utils/types';


export default function Dashboard(){
  // set current classes under 'My Classes'
  const [currClasses, setCurrClasses] = useState<Class[]>([]);
  const [archivedClasses, setArchivedClasses] = useState<Class[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUser(user.email!).then(async (user) => {
        if('message' in user){
          window.location.href = '/api/auth/login';
        } else {
          setUserData(user);
          console.log("User data: ", user);
          
          // Create arrays to store the fetched class data
          const fetchedClasses: Class[] = [];
          const fetchedArchivedClasses: Class[] = [];
          
          // Fetch all current classes
          await Promise.all(user.classes.map(async (crs: string) => {
            const classData = await fetchClass(crs);
            if (!('message' in classData)) {
              fetchedClasses.push(classData);
            }
          }));
          
          // Fetch all archived classes
          await Promise.all(user.archived_classes.map(async (crs: string) => {
            const classData = await fetchClass(crs);
            if (!('message' in classData)) {
              fetchedArchivedClasses.push(classData);
            }
          }));
          
          // Update state with all fetched classes
          setCurrClasses(fetchedClasses);
          setArchivedClasses(fetchedArchivedClasses);
        }
      });
    }
  }, [user]);

  useEffect(()=>{
    console.log("Curr classes: ", currClasses);
    if(userData && currClasses.length > 0){

      const classIds = currClasses.reduce((acc, crs) => {
        acc.push(crs.id);
        return acc;
      }, [] as string[]);
      
      console.log("Class IDs: ", classIds);
      
      const updateCurrentClasses = async (classIds: string[]) =>{
        await updateUser(userData!.email, {classes: classIds});
      }
      
      updateCurrentClasses(classIds);
    }
  }, [currClasses])

  useEffect(()=>{
    console.log("Archived classes: ", archivedClasses);
    if(userData && archivedClasses.length > 0){
      const classIds = archivedClasses.reduce((acc, crs) => {
        acc.push(crs.id);
        return acc;
      }, [] as string[]);
      
      const updateArchivedClasses = async (classIds: string[]) =>{
        await updateUser(userData!.email, {archived_classes: classIds});
      }
      
      updateArchivedClasses(classIds);
      console.log("Class IDs: ", classIds);
    }
  }, [archivedClasses])

  const handleClasses = (course: Class) => {
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

  const handleArchive = (course: Class) => {
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
      <div className="px-2 md:px-12 pt-2">
        <h1 className="text-3xl md:text-4xl font-bold pb-3 md:pb-4 pt-2 md:pt-9 cursor-default">Hi, {user?.name}!</h1>

        <SearchBar onToggleClass={handleClasses} isCurrent={checkCurrent} />

        <h2 className="text-[24px] md:text-[28px] lg:text-3xl font-semibold pt-6 md:pt-12 mb-2 md:mb-6 cursor-default">My Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 pt-3">
          {currClasses.map(course => (
            <ClassCard key={course.id} course={course} onToggleClass={handleClasses} onToggleArchive={handleArchive} isArchived={checkArchived}/>
          ))}
        </div>

        <h2 className="text-[24px] md:text-[28px] lg:text-3xl font-semibold mb-2 md:mb-6 pt-16 pb-3 md:pb-2 cursor-default">Archived Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {archivedClasses.map(course => (
            <ClassCard key={course.id} course={course} onToggleClass={handleClasses} onToggleArchive={handleArchive} isArchived={checkArchived}/>
          ))}
        </div>
      </div>
    </div>
  )
}