'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchClass } from '@/utils/db';
import { Class } from '@/utils/types';

const ClassPage = () => {
  const params = useParams();
  const classId = params.classId?.[0] || 'No Class ID';
  const [classData, setClassData] = useState<Class | null>(null);

  useEffect(() => {
    const getClass = async () => {
      const newClassData = await fetchClass(classId);
      setClassData(newClassData);
    };

    getClass();
  }, [classId]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-black">Class Page</h1>
      <p className="mt-2 text-black">Class ID: {classId}</p>
      <p className="mt-2 text-black">Class Name: {classData?.title}</p>
      <p className="mt-2 text-black">Class Code: {classData?.course_code}</p>
      <p className="mt-2 text-black">Class Units: {classData?.units}</p>
      <p className="mt-2 text-black">Class Description: {classData?.description}</p>
    </div>
  );
};

export default ClassPage;