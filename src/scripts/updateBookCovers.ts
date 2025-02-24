import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { firestore } from '../lib/firebaseAdmin';
import * as fs from 'fs';
import * as path from 'path';

interface Book {
    id: string;
    title: string;
    author: string;
    imageUrl?: string;
}

interface DeletedBook {
    id: string;
    title: string;
    author: string;
    reason: string;
}

const deletedBooks: DeletedBook[] = [];

const ITUNES_API_BASE = 'https://itunes.apple.com/search';
const DELAY = 5000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchItunesBookCover(title: string, author: string) {
  const query = `${ITUNES_API_BASE}?term=${encodeURIComponent(`${title} ${author}`)}&entity=ebook&limit=1`;
  
  try {
    const response = await fetch(query, {
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const artworkUrl = data.results[0].artworkUrl100;
      if (artworkUrl) {
        return artworkUrl.replace('100x100', '600x600');
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching iTunes cover for ${title}:`, error);
    return null;
  }
}

async function getAllBooks(): Promise<Book[]> {
    const snapshot = await firestore.collection('books').get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Book[];
}

async function deleteBook(bookId: string) {
    return firestore.collection('books').doc(bookId).delete();
}

async function saveDeletedBooksToCSV() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `deleted-books-${timestamp}.csv`;
    const filepath = path.join(process.cwd(), filename);
    
    const csvContent = [
        ['ID', 'Title', 'Author', 'Reason'],
        ...deletedBooks.map(book => [
            book.id,
            book.title,
            book.author,
            book.reason
        ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    fs.writeFileSync(filepath, csvContent);
    console.log(`Deleted books saved to: ${filename}`);
}

async function updateAllBookCovers() {
    let updated = 0;
    let deleted = 0;
    let skipped = 0;

    try {
        const books = await getAllBooks();
        console.log(`Found ${books.length} books to process`);

        for (const book of books) {
            if (book.imageUrl?.includes('itunes.apple.com') || book.imageUrl?.includes('books.google.com')) {
                console.log(`Skipping ${book.title} - already has iTunes or Google Books URL`);
                skipped++;
                continue;
            }

            try {
                console.log(`Processing: ${book.title} by ${book.author}`);
                const newImageUrl = await fetchItunesBookCover(book.title, book.author);
                
                if (newImageUrl) {
                    await firestore.collection('books').doc(book.id).update({
                        imageUrl: newImageUrl
                    });
                    console.log(`✅ Updated cover for: ${book.title}`);
                    updated++;
                } else {
                    await deleteBook(book.id);
                    deletedBooks.push({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        reason: 'No iTunes cover found'
                    });
                    console.log(`❌ No cover found - Deleted: ${book.title}`);
                    deleted++;
                }

                await delay(DELAY);
            } catch (error) {
                console.error(`Failed to process ${book.title}:`, error);
                deleted++;
            }
        }

        // Save CSV after processing all books
        await saveDeletedBooksToCSV();

        console.log('\nUpdate Complete!');
        console.log(`Updated: ${updated}`);
        console.log(`Deleted: ${deleted}`);
        console.log(`Skipped: ${skipped}`);
        console.log(`Total processed: ${books.length}`);
    } catch (error) {
        console.error('Error:', error);
        // Save CSV even if there's an error
        if (deletedBooks.length > 0) {
            await saveDeletedBooksToCSV();
        }
    }
}

// Run the script
updateAllBookCovers()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });