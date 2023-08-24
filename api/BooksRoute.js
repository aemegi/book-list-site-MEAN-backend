import BooksController from "./BooksController.js";
import ReviewsController from "./ReviewsController.js";

export default class BooksRoute {
  static configRoutes(router) {
      router.route('/').get(BooksController.apiGetBooks);

      router
        .route('/review')
        .post(ReviewsController.apiPostReview)
        .put(ReviewsController.apiUpdateReview)
        .delete(ReviewsController.apiDeleteReview);

      return router;
  }

}