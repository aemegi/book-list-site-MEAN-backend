export default class BooksDAO {
    static books;

    static async injectDB(conn) {
        if (BooksDAO.books) {
            return;
        } 
        try {
            BooksDAO.books = await conn.db(process.env.BOOKREVIEWS_NS)
             .collection('books');
        } catch (e) {
            console.error('unable to connect in BooksDAO: ${e}');
        }
    }

    static async getBooks({
        filters = null,
        page = 0,
        booksPerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            if ('title' in filters) {
                query = { $text: { search: filters.title } };
            } else if ('genre' in filters) {
                query = { genre: { $eq: filters.genre }};
            }
        }
        let cursor;
        try {
            cursor = await BooksDAO.books
                .find(query)
                .limit(booksPerPage)
                .skip(booksPerPage * page);
            const booksList = await cursor.toArray();
            const totalNumBooks = await
        BooksDAO.books.countDocuments(query);
            return { booksList, totalNumBooks };
        } catch (e) {
            console.error('Unable to issue find command, ${e}');
            return { booksList: [], totalNumBooks: 0 };
        }
    }
    
}
