import React from 'react';
import { Book } from '@/types/Book';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, BookOpen, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type BookCardProps = {
  book: Book;
  onIssueBook?: (bookId: string, returnDate: string) => void;
  onDeleteBook?: (bookId: string) => void;
};

const BookCard = ({ book, onIssueBook, onDeleteBook }: BookCardProps) => {
  const { user } = useAuth();

  const handleIssueBook = () => {
    if (onIssueBook) {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14); // 14 days return period
      onIssueBook(book.id, returnDate.toISOString().split('T')[0]);
    }
  };

  const handleDeleteBook = () => {
    if (onDeleteBook) {
      onDeleteBook(book.id);
    }
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <User className="w-3 h-3" />
              {book.author}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge 
              variant={book.available ? "secondary" : "destructive"}
              className="shrink-0"
            >
              {book.available ? 'Available' : 'Issued'}
            </Badge>
            {user?.role === 'admin' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteBook}
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-primary/5 rounded-lg p-3">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <p className="text-sm text-muted-foreground line-clamp-3">
            {book.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Genre:</span>
            <Badge variant="outline" className="text-xs">
              {book.genre}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ISBN:</span>
            <span className="font-mono text-xs">{book.isbn}</span>
          </div>
          {!book.available && book.returnDate && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Return Date:</span>
              <div className="flex items-center gap-1 text-destructive">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{new Date(book.returnDate).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>

        {user?.role === 'user' && book.available && (
          <Button 
            onClick={handleIssueBook}
            className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Issue Book
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;