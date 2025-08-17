import { Book } from '@/types/Book';
import greatGatsbyImg from '@/assets/book-covers/great-gatsby.jpg';
import mockingbirdImg from '@/assets/book-covers/mockingbird.jpg';
import orwell1984Img from '@/assets/book-covers/1984.jpg';

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    genre: 'Classic Literature',
    available: true,
    description: 'A classic American novel set in the summer of 1922, exploring themes of decadence, idealism, resistance to change, social upheaval, and excess.',
    coverImage: greatGatsbyImg,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    genre: 'Fiction',
    available: true,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.',
    coverImage: mockingbirdImg,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    genre: 'Dystopian Fiction',
    available: false,
    issuedTo: 'John Doe',
    issuedDate: '2024-01-15',
    returnDate: '2024-01-29',
    description: 'A dystopian social science fiction novel about totalitarian control and the struggle for individual freedom in a surveillance state.',
    coverImage: orwell1984Img,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    genre: 'Romance',
    available: true,
    description: 'A romantic novel of manners set in Georgian England, dealing with issues of marriage, money, and social expectations.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0-316-76948-0',
    genre: 'Coming of Age',
    available: true,
    description: 'A controversial novel following teenager Holden Caulfield as he wanders New York City after being expelled from prep school.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'Lord of the Flies',
    author: 'William Golding',
    isbn: '978-0-571-05686-2',
    genre: 'Adventure',
    available: true,
    description: 'A novel about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
  }
];