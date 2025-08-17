import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookCard from './BookCard';
import { Book } from '@/types/Book';
import { sampleBooks } from '@/data/sampleBooks';
import { Search, LogOut, BookOpen, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [issuedBooks, setIssuedBooks] = useState<Book[]>([]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueBook = (bookId: string, returnDate: string) => {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
      const updatedBooks = books.map(b =>
        b.id === bookId
          ? {
              ...b,
              available: false,
              issuedTo: user?.name,
              issuedDate: new Date().toISOString().split('T')[0],
              returnDate
            }
          : b
      );
      setBooks(updatedBooks);
      setIssuedBooks([...issuedBooks, { ...book, available: false, issuedTo: user?.name, issuedDate: new Date().toISOString().split('T')[0], returnDate }]);
      
      toast({
        title: "Book Issued Successfully!",
        description: `"${book.title}" has been issued to you until ${new Date(returnDate).toLocaleDateString()}.`,
      });
    }
  };

  const myIssuedBooks = books.filter(book => !book.available && book.issuedTo === user?.name);
  const availableBooks = filteredBooks.filter(book => book.available);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Library Portal</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <User className="w-3 h-3 mr-1" />
                Student
              </Badge>
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Available Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{availableBooks.length}</div>
              <p className="text-muted-foreground text-sm">Ready to issue</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-foreground" />
                My Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">{myIssuedBooks.length}</div>
              <p className="text-muted-foreground text-sm">Currently issued</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-5 h-5 text-success" />
                Total Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{books.length}</div>
              <p className="text-muted-foreground text-sm">In library</p>
            </CardContent>
          </Card>
        </div>

        {/* My Issued Books */}
        {myIssuedBooks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              My Issued Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myIssuedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search books by title, author, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Available Books */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Available Books
          </h2>
          {availableBooks.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No books found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No books are currently available.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onIssueBook={handleIssueBook}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;