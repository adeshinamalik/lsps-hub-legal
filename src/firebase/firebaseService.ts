
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './Firebase';

// Types
export interface Article {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageSrc: string;
  status: 'Published' | 'Draft';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface NewsEvent {
  id?: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  type: 'news' | 'event';
  location?: string;
  eventDate?: string;
  imageSrc: string;
  status: 'Published' | 'Draft';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface User {
  id?: string;
  displayName: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  photoURL?: string;
  createdAt?: Timestamp;
}

export interface GalleryItem {
  id?: string;
  title: string;
  description?: string;
  imageSrc: string;
  category?: string;
  date: string;
  createdAt?: Timestamp;
}

export interface Resource {
  id?: string;
  title: string;
  description: string;
  type: 'document' | 'link' | 'video';
  url: string;
  fileSize?: string;
  category: string;
  date: string;
  status: 'Published' | 'Draft';
  createdAt?: Timestamp;
}

// Helper function to convert Firestore document to typed object
const convertDoc = <T>(doc: QueryDocumentSnapshot<DocumentData>): T => {
  return { id: doc.id, ...doc.data() } as T;
};

// ARTICLES / PUBLICATIONS
// ----------------------

// Get all articles/publications
export const fetchArticles = async (): Promise<Article[]> => {
  const articlesQuery = query(
    collection(db, 'articles'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(articlesQuery);
  return querySnapshot.docs.map(doc => convertDoc<Article>(doc));
};

// Get published articles
export const fetchPublishedArticles = async (): Promise<Article[]> => {
  const articlesQuery = query(
    collection(db, 'articles'),
    where('status', '==', 'Published'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(articlesQuery);
  return querySnapshot.docs.map(doc => convertDoc<Article>(doc));
};

// Get article by ID
export const fetchArticleById = async (id: string): Promise<Article | null> => {
  const docRef = doc(db, 'articles', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Article;
  } else {
    return null;
  }
};

// Create new article
export const createArticle = async (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'articles'), {
    ...article,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

// Update existing article
export const updateArticle = async (id: string, article: Partial<Omit<Article, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, 'articles', id);
  await updateDoc(docRef, {
    ...article,
    updatedAt: serverTimestamp()
  });
};

// Delete article
export const deleteArticle = async (id: string): Promise<void> => {
  const docRef = doc(db, 'articles', id);
  await deleteDoc(docRef);
};

// Search articles
export const searchArticles = async (searchTerm: string, category?: string): Promise<Article[]> => {
  // Note: Firestore doesn't support full-text search natively
  // For a complete solution, you would need to use a service like Algolia
  // This is a basic implementation that will only work for exact matches
  
  let articlesQuery;
  
  if (category && category !== 'All Categories') {
    articlesQuery = query(
      collection(db, 'articles'),
      where('category', '==', category),
      where('status', '==', 'Published')
    );
  } else {
    articlesQuery = query(
      collection(db, 'articles'),
      where('status', '==', 'Published')
    );
  }
  
  const querySnapshot = await getDocs(articlesQuery);
  const articles = querySnapshot.docs.map(doc => convertDoc<Article>(doc));
  
  // Client-side filtering for the search term
  return articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// NEWS & EVENTS
// -------------

// Get all news and events
export const fetchNewsEvents = async (): Promise<NewsEvent[]> => {
  const newsEventsQuery = query(
    collection(db, 'newsEvents'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(newsEventsQuery);
  return querySnapshot.docs.map(doc => convertDoc<NewsEvent>(doc));
};

// Get news only
export const fetchNews = async (): Promise<NewsEvent[]> => {
  const newsQuery = query(
    collection(db, 'newsEvents'),
    where('type', '==', 'news'),
    where('status', '==', 'Published'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(newsQuery);
  return querySnapshot.docs.map(doc => convertDoc<NewsEvent>(doc));
};

// Get events only
export const fetchEvents = async (): Promise<NewsEvent[]> => {
  const eventsQuery = query(
    collection(db, 'newsEvents'),
    where('type', '==', 'event'),
    where('status', '==', 'Published'),
    orderBy('eventDate', 'asc')
  );
  const querySnapshot = await getDocs(eventsQuery);
  return querySnapshot.docs.map(doc => convertDoc<NewsEvent>(doc));
};

// Get news/event by ID
export const fetchNewsEventById = async (id: string): Promise<NewsEvent | null> => {
  const docRef = doc(db, 'newsEvents', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as NewsEvent;
  } else {
    return null;
  }
};

// Create new news/event
export const createNewsEvent = async (newsEvent: Omit<NewsEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'newsEvents'), {
    ...newsEvent,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

// Update existing news/event
export const updateNewsEvent = async (id: string, newsEvent: Partial<Omit<NewsEvent, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, 'newsEvents', id);
  await updateDoc(docRef, {
    ...newsEvent,
    updatedAt: serverTimestamp()
  });
};

// Delete news/event
export const deleteNewsEvent = async (id: string): Promise<void> => {
  const docRef = doc(db, 'newsEvents', id);
  await deleteDoc(docRef);
};

// USERS
// -----

// Get all users
export const fetchUsers = async (): Promise<User[]> => {
  const usersQuery = query(collection(db, 'users'));
  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map(doc => convertDoc<User>(doc));
};

// Get user by ID
export const fetchUserById = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  } else {
    return null;
  }
};

// Create new user
export const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'users'), {
    ...user,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Update existing user
export const updateUser = async (id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, user);
};

// Delete user
export const deleteUser = async (id: string): Promise<void> => {
  const docRef = doc(db, 'users', id);
  await deleteDoc(docRef);
};

// GALLERY
// -------

// Get all gallery items
export const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  const galleryQuery = query(
    collection(db, 'gallery'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(galleryQuery);
  return querySnapshot.docs.map(doc => convertDoc<GalleryItem>(doc));
};

// Get gallery item by ID
export const fetchGalleryItemById = async (id: string): Promise<GalleryItem | null> => {
  const docRef = doc(db, 'gallery', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as GalleryItem;
  } else {
    return null;
  }
};

// Create new gallery item
export const createGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'gallery'), {
    ...item,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Update existing gallery item
export const updateGalleryItem = async (id: string, item: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, 'gallery', id);
  await updateDoc(docRef, item);
};

// Delete gallery item
export const deleteGalleryItem = async (id: string): Promise<void> => {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
};

// RESOURCES
// ---------

// Get all resources
export const fetchResources = async (): Promise<Resource[]> => {
  const resourcesQuery = query(
    collection(db, 'resources'),
    where('status', '==', 'Published'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(resourcesQuery);
  return querySnapshot.docs.map(doc => convertDoc<Resource>(doc));
};

// Get resource by ID
export const fetchResourceById = async (id: string): Promise<Resource | null> => {
  const docRef = doc(db, 'resources', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Resource;
  } else {
    return null;
  }
};

// Create new resource
export const createResource = async (resource: Omit<Resource, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'resources'), {
    ...resource,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Update existing resource
export const updateResource = async (id: string, resource: Partial<Omit<Resource, 'id' | 'createdAt'>>): Promise<void> => {
  const docRef = doc(db, 'resources', id);
  await updateDoc(docRef, resource);
};

// Delete resource
export const deleteResource = async (id: string): Promise<void> => {
  const docRef = doc(db, 'resources', id);
  await deleteDoc(docRef);
};

// MEDIA UPLOAD
// ------------

// Upload image and get URL
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Delete image by URL
export const deleteImage = async (imageUrl: string): Promise<void> => {
  // Extract the path from the URL
  const url = new URL(imageUrl);
  const pathWithToken = url.pathname;
  const path = pathWithToken.split('?')[0]; // Remove token if present
  
  // Storage references have a format like /b/bucket-name/o/path
  const parts = path.split('/o/');
  if (parts.length < 2) {
    throw new Error('Invalid image URL');
  }
  
  const decodedPath = decodeURIComponent(parts[1]);
  const imageRef = ref(storage, decodedPath);
  
  await deleteObject(imageRef);
};

// PAGINATION HELPERS
// -----------------

// Get paginated articles
export const fetchPaginatedArticles = async (
  page: number = 1, 
  itemsPerPage: number = 6,
  category?: string,
  searchQuery?: string
): Promise<{items: Article[], totalItems: number}> => {
  let baseQuery;
  
  if (category && category !== 'All Categories') {
    baseQuery = query(
      collection(db, 'articles'),
      where('status', '==', 'Published'),
      where('category', '==', category)
    );
  } else {
    baseQuery = query(
      collection(db, 'articles'),
      where('status', '==', 'Published')
    );
  }
  
  const querySnapshot = await getDocs(baseQuery);
  let items = querySnapshot.docs.map(doc => convertDoc<Article>(doc));
  
  // Apply search filter if provided
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    items = items.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.excerpt.toLowerCase().includes(lowercaseQuery) ||
      item.author.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  const totalItems = items.length;
  
  // Sort by date (newest first)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Apply pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    items: paginatedItems,
    totalItems
  };
};

// Get paginated news
export const fetchPaginatedNews = async (
  page: number = 1, 
  itemsPerPage: number = 6,
  searchQuery?: string
): Promise<{items: NewsEvent[], totalItems: number}> => {
  const newsQuery = query(
    collection(db, 'newsEvents'),
    where('type', '==', 'news'),
    where('status', '==', 'Published')
  );
  
  const querySnapshot = await getDocs(newsQuery);
  let items = querySnapshot.docs.map(doc => convertDoc<NewsEvent>(doc));
  
  // Apply search filter if provided
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    items = items.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.summary.toLowerCase().includes(lowercaseQuery) ||
      item.author.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  const totalItems = items.length;
  
  // Sort by date (newest first)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Apply pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    items: paginatedItems,
    totalItems
  };
};

// Get paginated events
export const fetchPaginatedEvents = async (
  page: number = 1, 
  itemsPerPage: number = 6,
  searchQuery?: string
): Promise<{items: NewsEvent[], totalItems: number}> => {
  const eventsQuery = query(
    collection(db, 'newsEvents'),
    where('type', '==', 'event'),
    where('status', '==', 'Published')
  );
  
  const querySnapshot = await getDocs(eventsQuery);
  let items = querySnapshot.docs.map(doc => convertDoc<NewsEvent>(doc));
  
  // Apply search filter if provided
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    items = items.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.summary.toLowerCase().includes(lowercaseQuery) ||
      (item.location && item.location.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  const totalItems = items.length;
  
  // Sort by event date (upcoming first)
  items.sort((a, b) => {
    if (a.eventDate && b.eventDate) {
      return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
    }
    return 0;
  });
  
  // Apply pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    items: paginatedItems,
    totalItems
  };
};

// Get paginated resources
export const fetchPaginatedResources = async (
  page: number = 1, 
  itemsPerPage: number = 6,
  category?: string,
  searchQuery?: string
): Promise<{items: Resource[], totalItems: number}> => {
  let baseQuery;
  
  if (category) {
    baseQuery = query(
      collection(db, 'resources'),
      where('status', '==', 'Published'),
      where('category', '==', category)
    );
  } else {
    baseQuery = query(
      collection(db, 'resources'),
      where('status', '==', 'Published')
    );
  }
  
  const querySnapshot = await getDocs(baseQuery);
  let items = querySnapshot.docs.map(doc => convertDoc<Resource>(doc));
  
  // Apply search filter if provided
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    items = items.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  const totalItems = items.length;
  
  // Sort by date (newest first)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Apply pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    items: paginatedItems,
    totalItems
  };
};
