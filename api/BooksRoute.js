import BooksController from "./BooksController.js";

export default class BooksRoute {
  static configRoutes(router) {
      router.route('/').get(BooksController.apiGetBooks);
      return router;
  }

}