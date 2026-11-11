import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialInstituteInfo,
  initialBanners,
  initialNotices,
  initialCourses,
  initialFaculty,
  initialToppers,
  initialAlbums,
  initialGallery,
  initialTestimonials,
  initialStudents,
  initialBatches,
  initialFeeTransactions,
  initialAttendance,
  initialExamResults,
  initialStudyMaterials,
  initialInquiries
} from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEY = 'SARYODAY_ACADEMICS_DB_V2';

export const DataProvider = ({ children }) => {
  // Load state from localStorage or initialize with seed data
  const [data, setData] = useState(() => {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Upgrade from V1 if available
        const oldV1 = localStorage.getItem('SARYODAY_ACADEMICS_DB_V1');
        if (oldV1) {
          const parsedV1 = JSON.parse(oldV1);
          return {
            ...parsedV1,
            instituteInfo: {
              ...initialInstituteInfo,
              ...parsedV1.instituteInfo,
              instagram: initialInstituteInfo.instagram,
              facebook: initialInstituteInfo.facebook,
              director: {
                ...initialInstituteInfo.director,
                ...(parsedV1.instituteInfo?.director || {})
              }
            },
            albums: initialAlbums,
            gallery: initialGallery
          };
        }
      } else {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          albums: parsed.albums || initialAlbums,
          gallery: parsed.gallery || initialGallery,
          instituteInfo: {
            ...initialInstituteInfo,
            ...parsed.instituteInfo
          }
        };
      }
    } catch (e) {
      console.error('Failed to load data from localStorage', e);
    }
    return {
      instituteInfo: initialInstituteInfo,
      banners: initialBanners,
      notices: initialNotices,
      courses: initialCourses,
      faculty: initialFaculty,
      toppers: initialToppers,
      albums: initialAlbums,
      albums: initialAlbums,
      gallery: initialGallery,
      testimonials: initialTestimonials,
      students: initialStudents,
      batches: initialBatches,
      feeTransactions: initialFeeTransactions,
      attendance: initialAttendance,
      examResults: initialExamResults,
      studyMaterials: initialStudyMaterials,
      inquiries: initialInquiries
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist database to localStorage', e);
    }
  }, [data]);

  // Real-time synchronization across browser tabs and windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(parsed);
        } catch (err) {
          console.error('Error syncing storage across tabs', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Institute Info & Director (About & Contact Sections)
  const updateInstituteInfo = (updatedFields) => {
    setData(prev => ({
      ...prev,
      instituteInfo: {
        ...prev.instituteInfo,
        ...updatedFields
      }
    }));
  };

  const updateDirector = (directorFields) => {
    setData(prev => ({
      ...prev,
      instituteInfo: {
        ...prev.instituteInfo,
        director: {
          ...prev.instituteInfo.director,
          ...directorFields
        }
      }
    }));
  };

  // Banner Actions (Home Page Hero Slider)
  const addBanner = (bannerData) => {
    const newBanner = {
      ...bannerData,
      id: `ban-${Date.now()}`,
      bgGradient: bannerData.bgGradient || "from-blue-900 via-indigo-900 to-slate-900",
      image: bannerData.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    };
    setData(prev => ({
      ...prev,
      banners: [...prev.banners, newBanner]
    }));
  };

  const updateBanner = (id, fields) => {
    setData(prev => ({
      ...prev,
      banners: prev.banners.map(b => b.id === id ? { ...b, ...fields } : b)
    }));
  };

  const deleteBanner = (id) => {
    setData(prev => ({
      ...prev,
      banners: prev.banners.filter(b => b.id !== id)
    }));
  };

  // Courses Actions
  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: `c-${Date.now()}`,
      code: courseData.code || `CRS-${Date.now().toString().slice(-4)}`,
      features: Array.isArray(courseData.features) ? courseData.features : courseData.features.split('\n').filter(Boolean)
    };
    setData(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
  };

  const updateCourse = (id, fields) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.map(c => {
        if (c.id === id) {
          const features = typeof fields.features === 'string'
            ? fields.features.split('\n').filter(Boolean)
            : (fields.features || c.features);
          return { ...c, ...fields, features };
        }
        return c;
      })
    }));
  };

  const deleteCourse = (id) => {
    setData(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id)
    }));
  };

  // Faculty Actions
  const addFaculty = (facultyData) => {
    const newFac = {
      ...facultyData,
      id: `f-${Date.now()}`,
      photo: facultyData.photo || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`
    };
    setData(prev => ({
      ...prev,
      faculty: [...prev.faculty, newFac]
    }));
  };

  const updateFaculty = (id, fields) => {
    setData(prev => ({
      ...prev,
      faculty: prev.faculty.map(f => f.id === id ? { ...f, ...fields } : f)
    }));
  };

  const deleteFaculty = (id) => {
    setData(prev => ({
      ...prev,
      faculty: prev.faculty.filter(f => f.id !== id)
    }));
  };

  // Toppers Actions
  const addTopper = (topperData) => {
    const newTopper = {
      ...topperData,
      id: `top-${Date.now()}`,
      photo: topperData.photo || `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80`
    };
    setData(prev => ({
      ...prev,
      toppers: [newTopper, ...prev.toppers]
    }));
  };

  const updateTopper = (id, fields) => {
    setData(prev => ({
      ...prev,
      toppers: prev.toppers.map(t => t.id === id ? { ...t, ...fields } : t)
    }));
  };

  const deleteTopper = (id) => {
    setData(prev => ({
      ...prev,
      toppers: prev.toppers.filter(t => t.id !== id)
    }));
  };

  // Gallery Actions
  const addGalleryItem = (item) => {
    setData(prev => ({
      ...prev,
      gallery: [{ ...item, id: `gal-${Date.now()}` }, ...prev.gallery]
    }));
  };

  const deleteGalleryItem = (id) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  // ALBUM ACTIONS (गैलरी में एलबम प्रबंधन)
  const addAlbum = (albumData) => {
    const newAlbum = {
      ...albumData,
      id: `alb-${Date.now()}`,
      date: albumData.date || 'सत्र 2024-25',
      category: albumData.category || 'सम्मान समारोह',
      coverImage: albumData.coverImage || './galary.jpg',
      photos: albumData.photos || []
    };
    setData(prev => ({
      ...prev,
      albums: [newAlbum, ...(prev.albums || [])]
    }));
    return newAlbum;
  };

  const updateAlbum = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      albums: (prev.albums || []).map(alb => alb.id === id ? { ...alb, ...updatedFields } : alb)
    }));
  };

  const deleteAlbum = (id) => {
    setData(prev => ({
      ...prev,
      albums: (prev.albums || []).filter(alb => alb.id !== id)
    }));
  };

  const addPhotoToAlbum = (albumId, photoData) => {
    const newPhoto = {
      ...photoData,
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      url: photoData.url || './galary.jpg',
      title: photoData.title || 'सर्वोदय फोटो',
      caption: photoData.caption || ''
    };
    setData(prev => ({
      ...prev,
      albums: (prev.albums || []).map(alb => {
        if (alb.id === albumId) {
          const currentPhotos = alb.photos || [];
          return {
            ...alb,
            photos: [...currentPhotos, newPhoto],
            // If album has no cover image or default, use this photo
            coverImage: alb.coverImage || newPhoto.url
          };
        }
        return alb;
      }),
      // Also sync to flat gallery
      gallery: [{ id: newPhoto.id, title: newPhoto.title, category: 'Album Photo', image: newPhoto.url }, ...(prev.gallery || [])]
    }));
    return newPhoto;
  };

  const deletePhotoFromAlbum = (albumId, photoId) => {
    setData(prev => ({
      ...prev,
      albums: (prev.albums || []).map(alb => {
        if (alb.id === albumId) {
          const remainingPhotos = (alb.photos || []).filter(p => p.id !== photoId);
          return {
            ...alb,
            photos: remainingPhotos,
            coverImage: alb.coverImage === photoId ? (remainingPhotos[0]?.url || './galary.jpg') : alb.coverImage
          };
        }
        return alb;
      }),
      gallery: (prev.gallery || []).filter(g => g.id !== photoId)
    }));
  };

  const setAlbumCover = (albumId, photoUrl) => {
    setData(prev => ({
      ...prev,
      albums: (prev.albums || []).map(alb => alb.id === albumId ? { ...alb, coverImage: photoUrl } : alb)
    }));
  };

  // Student Actions
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: `stu-${Date.now()}`,
      rollNo: studentData.rollNo || `SA-2025-0${data.students.length + 101}`,
      paidFee: Number(studentData.paidFee || 0),
      totalFee: Number(studentData.totalFee || 0),
      dueFee: Number(studentData.totalFee || 0) - Number(studentData.paidFee || 0),
      attendanceRate: 100,
      avatar: studentData.avatar || `https://api.dicebear.com/7.x/micah/svg?seed=${studentData.name}`
    };

    setData(prev => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));
    return newStudent;
  };

  const updateStudent = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(s => {
        if (s.id === id) {
          const totalFee = updatedFields.totalFee !== undefined ? Number(updatedFields.totalFee) : s.totalFee;
          const paidFee = updatedFields.paidFee !== undefined ? Number(updatedFields.paidFee) : s.paidFee;
          return {
            ...s,
            ...updatedFields,
            totalFee,
            paidFee,
            dueFee: Math.max(0, totalFee - paidFee)
          };
        }
        return s;
      })
    }));
  };

  const deleteStudent = (id) => {
    setData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id)
    }));
  };

  // Fee Management Actions
  const recordFeePayment = (paymentData) => {
    const txn = {
      ...paymentData,
      id: `TXN-${Date.now().toString().slice(-6)}`,
      receiptNo: `SA-REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: paymentData.date || new Date().toISOString().split('T')[0]
    };

    setData(prev => {
      const updatedStudents = prev.students.map(stu => {
        if (stu.id === paymentData.studentId || stu.rollNo === paymentData.rollNo) {
          const newPaid = Number(stu.paidFee) + Number(paymentData.amount);
          return {
            ...stu,
            paidFee: newPaid,
            dueFee: Math.max(0, Number(stu.totalFee) - newPaid)
          };
        }
        return stu;
      });

      return {
        ...prev,
        students: updatedStudents,
        feeTransactions: [txn, ...prev.feeTransactions]
      };
    });

    return txn;
  };

  // Attendance Actions
  const saveDailyAttendance = (date, batch, records) => {
    setData(prev => {
      const existingIndex = prev.attendance.findIndex(a => a.date === date && a.batch === batch);
      let updatedAttendance;
      if (existingIndex >= 0) {
        updatedAttendance = [...prev.attendance];
        updatedAttendance[existingIndex] = {
          id: prev.attendance[existingIndex].id,
          date,
          batch,
          records
        };
      } else {
        updatedAttendance = [
          {
            id: `att-${Date.now()}`,
            date,
            batch,
            records
          },
          ...prev.attendance
        ];
      }

      const updatedStudents = prev.students.map(student => {
        const studentBatches = updatedAttendance.filter(a => a.batch === student.batch);
        if (studentBatches.length === 0) return student;

        let totalSessions = 0;
        let presentSessions = 0;
        studentBatches.forEach(batchRecord => {
          const rec = batchRecord.records.find(r => r.rollNo === student.rollNo || r.studentId === student.id);
          if (rec) {
            totalSessions++;
            if (rec.status === 'Present') presentSessions++;
          }
        });

        const rate = totalSessions > 0 ? ((presentSessions / totalSessions) * 100).toFixed(1) : student.attendanceRate;
        return {
          ...student,
          attendanceRate: Number(rate)
        };
      });

      return {
        ...prev,
        attendance: updatedAttendance,
        students: updatedStudents
      };
    });
  };

  // Notice Actions
  const addNotice = (noticeData) => {
    const newNotice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      date: noticeData.date || new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      isNew: true
    };
    setData(prev => ({
      ...prev,
      notices: [newNotice, ...prev.notices]
    }));
  };

  const updateNotice = (id, fields) => {
    setData(prev => ({
      ...prev,
      notices: prev.notices.map(n => n.id === id ? { ...n, ...fields } : n)
    }));
  };

  const deleteNotice = (id) => {
    setData(prev => ({
      ...prev,
      notices: prev.notices.filter(n => n.id !== id)
    }));
  };

  // Study Material Actions
  const addStudyMaterial = (materialData) => {
    const newMaterial = {
      ...materialData,
      id: `mat-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      studyMaterials: [newMaterial, ...prev.studyMaterials]
    }));
  };

  const deleteStudyMaterial = (id) => {
    setData(prev => ({
      ...prev,
      studyMaterials: prev.studyMaterials.filter(m => m.id !== id)
    }));
  };

  // Exam Result Actions
  const saveExamResult = (resultData) => {
    const newResult = {
      ...resultData,
      id: `res-${Date.now()}`,
      date: resultData.date || new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      examResults: [newResult, ...prev.examResults]
    }));
  };

  // Inquiries Actions
  const submitInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setData(prev => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));
    return newInquiry;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq)
    }));
  };

  // Batches Actions
  const addBatch = (batchData) => {
    const newBatch = {
      ...batchData,
      id: `bat-${Date.now()}`,
      enrolledCount: 0
    };
    setData(prev => ({
      ...prev,
      batches: [...prev.batches, newBatch]
    }));
  };

  // Database Backup, Restore, and Reset
  const resetToDefault = () => {
    const defaultData = {
      instituteInfo: initialInstituteInfo,
      banners: initialBanners,
      notices: initialNotices,
      courses: initialCourses,
      faculty: initialFaculty,
      toppers: initialToppers,
      albums: initialAlbums,
      gallery: initialGallery,
      testimonials: initialTestimonials,
      students: initialStudents,
      batches: initialBatches,
      feeTransactions: initialFeeTransactions,
      attendance: initialAttendance,
      examResults: initialExamResults,
      studyMaterials: initialStudyMaterials,
      inquiries: initialInquiries
    };
    setData(defaultData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  };

  const exportDatabaseJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saryoday_database_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importDatabaseJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.students && parsed.instituteInfo) {
        setData(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return { success: true };
      }
      return { success: false, message: 'Invalid data format' };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  return (
    <DataContext.Provider
      value={{
        ...data,
        updateInstituteInfo,
        updateDirector,
        addBanner,
        updateBanner,
        deleteBanner,
        addCourse,
        updateCourse,
        deleteCourse,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        addTopper,
        updateTopper,
        deleteTopper,
        addGalleryItem,
        deleteGalleryItem,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        addPhotoToAlbum,
        deletePhotoFromAlbum,
        setAlbumCover,
        addStudent,
        updateStudent,
        deleteStudent,
        recordFeePayment,
        saveDailyAttendance,
        addNotice,
        updateNotice,
        deleteNotice,
        addStudyMaterial,
        deleteStudyMaterial,
        saveExamResult,
        submitInquiry,
        updateInquiryStatus,
        addBatch,
        resetToDefault,
        exportDatabaseJSON,
        importDatabaseJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
