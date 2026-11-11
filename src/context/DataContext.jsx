import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import {
  requestStoragePersistence,
  saveToIndexedDB,
  loadFromIndexedDB,
  saveSnapshot,
  getSnapshots,
  exportDatabaseToFile,
  importDatabaseFromFile
} from '../services/cloudDatabase';
import { validateEnglishOnly } from '../utils/validation';

const DataContext = createContext(null);
const STORAGE_KEY = 'SARYODAY_ACADEMICS_SECURE_V6';

// Helper to merge default items with rich English/Hindi properties while preserving admin additions
const mergeSeedWithUpdatedEnglish = (existingList = [], defaultList = []) => {
  if (!existingList || existingList.length === 0) return defaultList;
  const defaultMap = new Map(defaultList.map(item => [item.id, item]));
  const seenIds = new Set();
  
  const merged = existingList.map(item => {
    seenIds.add(item.id);
    if (defaultMap.has(item.id)) {
      return { ...item, ...defaultMap.get(item.id) };
    }
    return item;
  });

  // Include any new default items if not present
  defaultList.forEach(item => {
    if (!seenIds.has(item.id)) {
      merged.push(item);
    }
  });

  return merged;
};

// Filter out any legacy mock data IDs so they NEVER pollute the live database
const filterOutMockData = (loadedData) => {
  if (!loadedData) return null;
  const mockStudentIds = ['stu-01', 'stu-02', 'stu-03', 'stu-04', 'stu-05'];
  const mockTxnIds = ['TXN-8901', 'TXN-8902', 'TXN-8903', 'TXN-8904'];
  const mockAttIds = ['att-01', 'att-02', 'att-03', 'att-04'];
  const mockResIds = ['res-01', 'res-02'];
  const mockInqIds = ['inq-01', 'inq-02', 'inq-03'];

  const cleanStudents = (loadedData.students || []).filter(
    s => !mockStudentIds.includes(s.id) && s.name !== 'राहुल वर्मा (Rahul Verma)' && s.name !== 'अनामिका गुप्ता (Anamika Gupta)'
  );

  return {
    ...loadedData,
    instituteInfo: {
      ...initialInstituteInfo,
      ...(loadedData.instituteInfo || {}),
      director: {
        ...initialInstituteInfo.director,
        ...(loadedData.instituteInfo?.director || {})
      }
    },
    banners: mergeSeedWithUpdatedEnglish(loadedData.banners, initialBanners),
    courses: mergeSeedWithUpdatedEnglish(loadedData.courses, initialCourses),
    faculty: mergeSeedWithUpdatedEnglish(loadedData.faculty, initialFaculty),
    toppers: mergeSeedWithUpdatedEnglish(loadedData.toppers, initialToppers),
    notices: mergeSeedWithUpdatedEnglish(loadedData.notices, initialNotices),
    testimonials: mergeSeedWithUpdatedEnglish(loadedData.testimonials, initialTestimonials),
    albums: mergeSeedWithUpdatedEnglish(loadedData.albums, initialAlbums),
    gallery: mergeSeedWithUpdatedEnglish(loadedData.gallery, initialGallery),
    students: cleanStudents,
    feeTransactions: (loadedData.feeTransactions || []).filter(t => !mockTxnIds.includes(t.id)),
    attendance: (loadedData.attendance || []).filter(a => !mockAttIds.includes(a.id)),
    examResults: (loadedData.examResults || []).filter(r => !mockResIds.includes(r.id)),
    inquiries: (loadedData.inquiries || []).filter(i => !mockInqIds.includes(i.id)),
    batches: (loadedData.batches && loadedData.batches.length > 0 ? loadedData.batches : initialBatches).map(b => ({
      ...b,
      enrolledCount: cleanStudents.filter(s => s.batch === b.name).length
    }))
  };
};

export const DataProvider = ({ children }) => {
  // Load state from localStorage or initialize with clean seed data
  const [data, setData] = useState(() => {
    try {
      const savedV6 = localStorage.getItem(STORAGE_KEY);
      if (savedV6) {
        return filterOutMockData(JSON.parse(savedV6));
      }

      // Check older storage keys and sanitize
      const oldKeys = ['SARYODAY_ACADEMICS_SECURE_V5', 'SARYODAY_ACADEMICS_DB_V2', 'SARYODAY_ACADEMICS_DB_V1'];
      for (const k of oldKeys) {
        const oldData = localStorage.getItem(k);
        if (oldData) {
          try {
            const parsed = JSON.parse(oldData);
            return filterOutMockData(parsed);
          } catch (e) {
            // continue
          }
        }
      }
    } catch (e) {
      console.error('[Saryoday DB] Failed to load data from storage', e);
    }

    return {
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
  });

  // Request browser storage persistence and initialize IndexedDB recovery
  useEffect(() => {
    requestStoragePersistence();

    // Check IndexedDB if localStorage was empty
    const initIndexedDB = async () => {
      try {
        const idbData = await loadFromIndexedDB();
        if (idbData && (!data.students || data.students.length === 0)) {
          const sanitized = filterOutMockData(idbData);
          if (sanitized && sanitized.students && sanitized.students.length > 0) {
            setData(sanitized);
          }
        }
      } catch (err) {
        console.warn('[Saryoday DB] IndexedDB init check', err);
      }
    };
    initIndexedDB();
  }, []);

  // Multi-tier persistent save: localStorage + IndexedDB + Auto snapshot
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      saveToIndexedDB(data);
    } catch (e) {
      console.error('[Saryoday DB] Failed to persist data', e);
    }
  }, [data]);

  // Real-time synchronization across browser tabs and windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(filterOutMockData(parsed));
        } catch (err) {
          console.error('[Saryoday DB] Error syncing storage across tabs', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Institute Info & Director (About & Contact Sections)
  const updateInstituteInfo = useCallback((updatedFields) => {
    setData(prev => {
      const next = {
        ...prev,
        instituteInfo: {
          ...prev.instituteInfo,
          ...updatedFields
        }
      };
      saveSnapshot(next, 'संस्थान संपर्क विवरण अपडेट');
      return next;
    });
  }, []);

  const updateDirector = useCallback((directorFields) => {
    setData(prev => {
      const next = {
        ...prev,
        instituteInfo: {
          ...prev.instituteInfo,
          director: {
            ...prev.instituteInfo.director,
            ...directorFields
          }
        }
      };
      saveSnapshot(next, 'निदेशक संदेश एवं प्रोफ़ाइल अपडेट');
      return next;
    });
  }, []);

  // Banner Actions
  const addBanner = useCallback((bannerData) => {
    const newBanner = {
      ...bannerData,
      id: `ban-${Date.now()}`,
      bgGradient: bannerData.bgGradient || "from-blue-900 via-indigo-900 to-slate-900",
      image: bannerData.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    };
    setData(prev => {
      const next = { ...prev, banners: [...prev.banners, newBanner] };
      saveSnapshot(next, 'नया होम बैनर जोड़ा गया');
      return next;
    });
  }, []);

  const updateBanner = useCallback((id, fields) => {
    setData(prev => {
      const next = {
        ...prev,
        banners: prev.banners.map(b => b.id === id ? { ...b, ...fields } : b)
      };
      saveSnapshot(next, 'बैनर अपडेट');
      return next;
    });
  }, []);

  const deleteBanner = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        banners: prev.banners.filter(b => b.id !== id)
      };
      saveSnapshot(next, 'बैनर हटाया गया');
      return next;
    });
  }, []);

  // Courses Actions
  const addCourse = useCallback((courseData) => {
    const newCourse = {
      ...courseData,
      id: `c-${Date.now()}`,
      code: courseData.code || `CRS-${Date.now().toString().slice(-4)}`,
      features: Array.isArray(courseData.features) ? courseData.features : courseData.features.split('\n').filter(Boolean)
    };
    setData(prev => {
      const next = { ...prev, courses: [...prev.courses, newCourse] };
      saveSnapshot(next, `नया कोर्स जोड़ा गया: ${courseData.title || ''}`);
      return next;
    });
  }, []);

  const updateCourse = useCallback((id, fields) => {
    setData(prev => {
      const next = {
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
      };
      saveSnapshot(next, 'कोर्स विवरण अपडेट');
      return next;
    });
  }, []);

  const deleteCourse = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        courses: prev.courses.filter(c => c.id !== id)
      };
      saveSnapshot(next, 'कोर्स हटाया गया');
      return next;
    });
  }, []);

  // Faculty Actions
  const addFaculty = useCallback((facultyData) => {
    const newFac = {
      ...facultyData,
      id: `f-${Date.now()}`,
      photo: facultyData.photo || `./director-pic.jpg`
    };
    setData(prev => {
      const next = { ...prev, faculty: [...prev.faculty, newFac] };
      saveSnapshot(next, `नए संकाय सदस्य जोड़े गए: ${facultyData.name || ''}`);
      return next;
    });
  }, []);

  const updateFaculty = useCallback((id, fields) => {
    setData(prev => {
      const next = {
        ...prev,
        faculty: prev.faculty.map(f => f.id === id ? { ...f, ...fields } : f)
      };
      saveSnapshot(next, 'संकाय सदस्य अपडेट');
      return next;
    });
  }, []);

  const deleteFaculty = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        faculty: prev.faculty.filter(f => f.id !== id)
      };
      saveSnapshot(next, 'संकाय सदस्य हटाया गया');
      return next;
    });
  }, []);

  // Toppers Actions
  const addTopper = useCallback((topperData) => {
    const newTopper = {
      ...topperData,
      id: `top-${Date.now()}`,
      photo: topperData.photo || `./galary.jpg`
    };
    setData(prev => {
      const next = { ...prev, toppers: [newTopper, ...prev.toppers] };
      saveSnapshot(next, `नया टॉपर जोड़ा गया: ${topperData.name || ''}`);
      return next;
    });
  }, []);

  const updateTopper = useCallback((id, fields) => {
    setData(prev => {
      const next = {
        ...prev,
        toppers: prev.toppers.map(t => t.id === id ? { ...t, ...fields } : t)
      };
      saveSnapshot(next, 'टॉपर रिकॉर्ड अपडेट');
      return next;
    });
  }, []);

  const deleteTopper = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        toppers: prev.toppers.filter(t => t.id !== id)
      };
      saveSnapshot(next, 'टॉपर रिकॉर्ड हटाया गया');
      return next;
    });
  }, []);

  // Gallery Actions
  const addGalleryItem = useCallback((item) => {
    setData(prev => {
      const next = {
        ...prev,
        gallery: [{ ...item, id: `gal-${Date.now()}` }, ...prev.gallery]
      };
      saveSnapshot(next, 'गैलरी फोटो जोड़ी गई');
      return next;
    });
  }, []);

  const deleteGalleryItem = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        gallery: prev.gallery.filter(g => g.id !== id)
      };
      saveSnapshot(next, 'गैलरी फोटो हटाई गई');
      return next;
    });
  }, []);

  // ALBUM ACTIONS
  const addAlbum = useCallback((albumData) => {
    const newAlbum = {
      ...albumData,
      id: `alb-${Date.now()}`,
      date: albumData.date || 'सत्र 2025-26',
      category: albumData.category || 'सम्मान समारोह',
      coverImage: albumData.coverImage || './galary.jpg',
      photos: albumData.photos || []
    };
    setData(prev => {
      const next = {
        ...prev,
        albums: [newAlbum, ...(prev.albums || [])]
      };
      saveSnapshot(next, `नया एलबम बनाया गया: ${albumData.title || ''}`);
      return next;
    });
    return newAlbum;
  }, []);

  const updateAlbum = useCallback((id, updatedFields) => {
    setData(prev => {
      const next = {
        ...prev,
        albums: (prev.albums || []).map(alb => alb.id === id ? { ...alb, ...updatedFields } : alb)
      };
      saveSnapshot(next, 'एलबम अपडेट');
      return next;
    });
  }, []);

  const deleteAlbum = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        albums: (prev.albums || []).filter(alb => alb.id !== id)
      };
      saveSnapshot(next, 'एलबम हटाया गया');
      return next;
    });
  }, []);

  const addPhotoToAlbum = useCallback((albumId, photoData) => {
    const newPhoto = {
      ...photoData,
      id: `p-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      url: photoData.url || './galary.jpg',
      title: photoData.title || 'सर्वोदय फोटो',
      caption: photoData.caption || ''
    };
    setData(prev => {
      const next = {
        ...prev,
        albums: (prev.albums || []).map(alb => {
          if (alb.id === albumId) {
            const currentPhotos = alb.photos || [];
            return {
              ...alb,
              photos: [...currentPhotos, newPhoto],
              coverImage: alb.coverImage || newPhoto.url
            };
          }
          return alb;
        }),
        gallery: [{ id: newPhoto.id, title: newPhoto.title, category: 'Album Photo', image: newPhoto.url }, ...(prev.gallery || [])]
      };
      saveSnapshot(next, 'एलबम में नई फोटो जोड़ी गई');
      return next;
    });
    return newPhoto;
  }, []);

  const deletePhotoFromAlbum = useCallback((albumId, photoId) => {
    setData(prev => {
      const next = {
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
      };
      saveSnapshot(next, 'एलबम से फोटो हटाई गई');
      return next;
    });
  }, []);

  const setAlbumCover = useCallback((albumId, photoUrl) => {
    setData(prev => ({
      ...prev,
      albums: (prev.albums || []).map(alb => alb.id === albumId ? { ...alb, coverImage: photoUrl } : alb)
    }));
  }, []);

  // Student Actions (100% immune to automatic deletion)
  const addStudent = useCallback((studentData) => {
    // English-only database validation guard
    const checkName = validateEnglishOnly(studentData.name, 'Student Name');
    if (!checkName.isValid) {
      alert(checkName.message);
      return null;
    }
    if (studentData.fatherName) {
      const checkFather = validateEnglishOnly(studentData.fatherName, "Father's Name");
      if (!checkFather.isValid) {
        alert(checkFather.message);
        return null;
      }
    }

    const rollNo = studentData.rollNo || `SA-${new Date().getFullYear()}-${String(data.students.length + 101).padStart(4, '0')}`;
    const totalFee = Number(studentData.totalFee || 0);
    const paidFee = Number(studentData.paidFee || 0);
    const newStudent = {
      ...studentData,
      id: `stu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      rollNo,
      totalFee,
      paidFee,
      dueFee: Math.max(0, totalFee - paidFee),
      attendanceRate: 100,
      admissionDate: studentData.admissionDate || new Date().toISOString().split('T')[0],
      avatar: studentData.avatar || `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(studentData.name || 'Student')}`
    };

    setData(prev => {
      const updatedStudents = [newStudent, ...prev.students];
      // Sync batch count
      const updatedBatches = (prev.batches || []).map(b => ({
        ...b,
        enrolledCount: updatedStudents.filter(s => s.batch === b.name).length
      }));
      const next = {
        ...prev,
        students: updatedStudents,
        batches: updatedBatches
      };
      saveSnapshot(next, `नया छात्र प्रवेश (Admission): ${newStudent.name} (${newStudent.rollNo})`);
      return next;
    });
    return newStudent;
  }, [data.students.length]);

  const updateStudent = useCallback((id, updatedFields) => {
    setData(prev => {
      const next = {
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
      };
      saveSnapshot(next, 'छात्र विवरण अपडेट');
      return next;
    });
  }, []);

  const deleteStudent = useCallback((id) => {
    setData(prev => {
      const updatedStudents = prev.students.filter(s => s.id !== id);
      const updatedBatches = (prev.batches || []).map(b => ({
        ...b,
        enrolledCount: updatedStudents.filter(s => s.batch === b.name).length
      }));
      const next = {
        ...prev,
        students: updatedStudents,
        batches: updatedBatches
      };
      saveSnapshot(next, 'छात्र रिकॉर्ड हटाया गया');
      return next;
    });
  }, []);

  // Fee Management Actions
  const recordFeePayment = useCallback((paymentData) => {
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

      const next = {
        ...prev,
        students: updatedStudents,
        feeTransactions: [txn, ...prev.feeTransactions]
      };
      saveSnapshot(next, `फीस रसीद जारी: ${txn.receiptNo} (₹${txn.amount})`);
      return next;
    });

    return txn;
  }, []);

  // Attendance Actions
  const saveDailyAttendance = useCallback((date, batch, records) => {
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

      const next = {
        ...prev,
        attendance: updatedAttendance,
        students: updatedStudents
      };
      saveSnapshot(next, `दैनिक उपस्थिति दर्ज: ${batch} (${date})`);
      return next;
    });
  }, []);

  // Notice Actions
  const addNotice = useCallback((noticeData) => {
    const newNotice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      date: noticeData.date || new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      isNew: true
    };
    setData(prev => {
      const next = {
        ...prev,
        notices: [newNotice, ...prev.notices]
      };
      saveSnapshot(next, `नई सूचना प्रकाशित: ${noticeData.title || ''}`);
      return next;
    });
  }, []);

  const updateNotice = useCallback((id, fields) => {
    setData(prev => {
      const next = {
        ...prev,
        notices: prev.notices.map(n => n.id === id ? { ...n, ...fields } : n)
      };
      saveSnapshot(next, 'सूचना अपडेट');
      return next;
    });
  }, []);

  const deleteNotice = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        notices: prev.notices.filter(n => n.id !== id)
      };
      saveSnapshot(next, 'सूचना हटाई गई');
      return next;
    });
  }, []);

  // Study Material Actions
  const addStudyMaterial = useCallback((materialData) => {
    const newMaterial = {
      ...materialData,
      id: `mat-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => {
      const next = {
        ...prev,
        studyMaterials: [newMaterial, ...prev.studyMaterials]
      };
      saveSnapshot(next, `नई अध्ययन सामग्री जोड़ी गई: ${materialData.title || ''}`);
      return next;
    });
  }, []);

  const deleteStudyMaterial = useCallback((id) => {
    setData(prev => {
      const next = {
        ...prev,
        studyMaterials: prev.studyMaterials.filter(m => m.id !== id)
      };
      saveSnapshot(next, 'अध्ययन सामग्री हटाई गई');
      return next;
    });
  }, []);

  // Exam Result Actions
  const saveExamResult = useCallback((resultData) => {
    const newResult = {
      ...resultData,
      id: `res-${Date.now()}`,
      date: resultData.date || new Date().toISOString().split('T')[0]
    };
    setData(prev => {
      const next = {
        ...prev,
        examResults: [newResult, ...prev.examResults]
      };
      saveSnapshot(next, `परीक्षा परिणाम दर्ज: ${resultData.examName || ''}`);
      return next;
    });
  }, []);

  // Inquiries Actions
  const submitInquiry = useCallback((inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setData(prev => {
      const next = {
        ...prev,
        inquiries: [newInquiry, ...prev.inquiries]
      };
      saveSnapshot(next, `नई एडमिशन पूछताछ: ${newInquiry.name} (${newInquiry.phone})`);
      return next;
    });
    return newInquiry;
  }, []);

  const updateInquiryStatus = useCallback((id, newStatus) => {
    setData(prev => {
      const next = {
        ...prev,
        inquiries: prev.inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq)
      };
      saveSnapshot(next, `पूछताछ स्थिति अपडेट (${newStatus})`);
      return next;
    });
  }, []);

  // Batches Actions
  const addBatch = useCallback((batchData) => {
    const newBatch = {
      ...batchData,
      id: `bat-${Date.now()}`,
      enrolledCount: 0
    };
    setData(prev => {
      const next = {
        ...prev,
        batches: [...prev.batches, newBatch]
      };
      saveSnapshot(next, `नया बैच बनाया गया: ${batchData.name || ''}`);
      return next;
    });
  }, []);

  // Explicit Clean Mock Data Action (Ensures 100% clean database)
  const cleanDemoData = useCallback(() => {
    setData(prev => {
      const cleaned = filterOutMockData(prev);
      saveSnapshot(cleaned, 'डेमो डेटा पूर्ण सफाई (Clean Database)');
      return cleaned;
    });
  }, []);

  // Database Backup, Restore, and Cloud JSON Export
  const exportDatabaseJSON = useCallback(() => {
    exportDatabaseToFile(data);
  }, [data]);

  const importDatabaseJSON = useCallback(async (fileOrString) => {
    try {
      let importedData;
      if (typeof fileOrString === 'string') {
        const parsed = JSON.parse(fileOrString);
        importedData = parsed.database || parsed;
      } else {
        importedData = await importDatabaseFromFile(fileOrString);
      }
      if (importedData) {
        const cleanImport = filterOutMockData(importedData);
        setData(cleanImport);
        saveSnapshot(cleanImport, 'डेटाबेस बैकअप से सफलतापूर्वक रिस्टोर');
        return { success: true, message: 'डेटाबेस सफलतापूर्वक रिस्टोर किया गया!' };
      }
      return { success: false, message: 'अमान्य डेटाबेस सामग्री।' };
    } catch (e) {
      return { success: false, message: e.message || 'इम्पोर्ट विफल रहा।' };
    }
  }, []);

  const restoreSnapshotById = useCallback((snapshotId) => {
    const snapshots = getSnapshots();
    const snap = snapshots.find(s => s.id === snapshotId);
    if (snap && snap.data) {
      const cleanSnap = filterOutMockData(snap.data);
      setData(cleanSnap);
      saveSnapshot(cleanSnap, `स्नैपशॉट ${snap.formattedTime} से रिस्टोर किया गया`);
      return { success: true };
    }
    return { success: false, message: 'स्नैपशॉट नहीं मिला।' };
  }, []);

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
        cleanDemoData,
        exportDatabaseJSON,
        importDatabaseJSON,
        restoreSnapshotById,
        getSnapshotsList: getSnapshots
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
