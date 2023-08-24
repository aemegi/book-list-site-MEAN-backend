import BooksDAO from "../dao/BooksDAO.js";

export default class BooksController {
    static async apiGetBooks(req, res, next) {
        const booksPerPage =req.query.booksPerPage ?
    parseInt(req.query.booksPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        const filters = {};
        if (req.query.genre) {
            filters.genre = req.query.genre;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        const { booksList, totalNumBooks } = await BooksDAO.getBooks(
            { filters, page, booksPerPage },
            );
        
        const response = {
            books : booksList,
            page,
            filters,
            entries_per_page: booksPerPage,
            totalresults: totalNumBooks,
        };
        res.json(response);

    }
}