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
    const [messages, setMessages] = useState<Message[]>([]);
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
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto p-6">            
            {messages.length > 0 ? (
                <>
                    <Card className="flex-grow mb-6 p-6 bg-white shadow-md">
                        <ScrollArea className="h-full pr-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-6 flex ${
                                        message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    {renderMessage(message)}
                                </div>
                            ))}
                        </ScrollArea>
                    </Card>
                </>
            ) : null}

            <form onSubmit={handleSubmit} className={`flex gap-3 ${!messages.length ? 'h-full items-center' : ''}`}>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tell me about books you've enjoyed reading..."
                    disabled={isLoading}
                    className="shadow-sm bg-white"
                />
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-6 shadow-sm"
                >
                    {isLoading ? 'Thinking...' : 'Send'}
                </Button>
            </form>
        </div>
    );
};

export default Recommendations;