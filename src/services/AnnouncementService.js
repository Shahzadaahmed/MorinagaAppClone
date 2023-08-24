import firestore from '@react-native-firebase/firestore';

// get announcements from database
const getAnnouncements = role => {
  if (!role) return [];

  return firestore()
    .collection('announcements')
    .where('role', '==', role)
    .orderBy('created_at', 'desc')
    .get()
    .then(snap => {
      const announcements = [];

      snap?.forEach(announcement => {
        announcements.push({ ...announcement.data(), id: announcement.id });
      });

      return announcements;
    });
};

const AnnouncementsService = {
  getAnnouncements,
};

export default AnnouncementsService;
