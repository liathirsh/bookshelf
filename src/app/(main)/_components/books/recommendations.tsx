'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useShelves } from '@/hooks/useShelves';
import toast from 'react-hot-toast';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ParsedBook {
    title: string;
    author: string;
    description: string;
}

const parseRecommendations = (content: string): ParsedBook[] => {
    const books: ParsedBook[] = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
        const match = line.match(/\d+\.\s*"([^"]+)"\s+by\s+([^-]+)-\s*(.+)/);
        if (match) {
            books.push({
                title: match[1].trim(),
                author: match[2].trim(),
                description: match[3].trim()
            });
        }
    }
    return books;
};

const Recommendations = () => {
    const { user } = useAuth();
    const { mutate: addBookToShelf } = useShelves();
    const [messages, setMessages] = useState<Message[]>([{
        role: 'assistant',
        content: 'Tell me what you enjoyed reading and let me give you recommendations! For example, you could tell me about your favorite fantasy books, or what kind of stories you like.'
    }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToShelf = async (book: ParsedBook) => {
        if (!user) {
            toast.error("Please sign in to add books to your shelf");
            return;
        }

        const bookData = {
            id: crypto.randomUUID(), 
            title: book.title,
            author: book.author,
            description: book.description,
        };

        addBookToShelf(
            {
                userId: user.uid,
                bookId: bookData.id,
                status: "wantToRead"
            },
            {
                onSuccess: () => {
                    toast.success(`Added "${book.title}" to Want to Read shelf`);
                },
                onError: (error) => {
                    console.error('Error adding to shelf:', error);
                    toast.error("Failed to add book to shelf");
                }
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setIsLoading(true);

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Failed to get recommendations:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I had trouble generating recommendations. Please try again.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (message: Message) => {
        if (message.role === 'assistant') {
            const books = parseRecommendations(message.content);
            if (books.length > 0) {
                return (
                    <div className="space-y-4">
                        <p className="mb-4">{message.content.split('\n')[0]}</p>
                        {books.map((book, index) => (
                            <div 
                                key={index} 
                                className="p-4 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">&ldquo;{book.title}&rdquo;</h3>
                                        <p className="text-sm text-gray-600">by {book.author}</p>
                                        <p className="text-sm mt-1">{book.description}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1 hover:bg-gray-100"
                                        onClick={() => handleAddToShelf(book)}
                                    >
                                        <Plus size={14} />
                                        Add to Shelf
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        }
        return (
            <div className={`p-4 rounded-2xl max-w-[85%] ${
                message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
            }`}>
                {message.content}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">            
            {messages.length > 0 && (
                <Card className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border-none shadow-sm">
                    <ScrollArea className="h-[500px] pr-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 flex ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {renderMessage(message)}
                            </div>
                        ))}
                    </ScrollArea>
                </Card>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tell me about books you've enjoyed reading..."
                    disabled={isLoading}
                    className="shadow-sm bg-white/80 backdrop-blur-sm border-none focus:ring-2 focus:ring-pink-200"
                />
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-6 shadow-sm bg-pink-600 hover:bg-pink-700"
                >
                    {isLoading ? 'Thinking...' : 'Send'}
                </Button>
            </form>
        </div>
    );
};

export default Recommendations;