import mongodb from 'mongodb';

export default class ReviewsDAO {
    static reviews;

    static ObjectId = mongodb.ObjectId;

    static async injectDB(conn) {
        if (ReviewsDAO.reviews) {
            return;
        }
        try {
            ReviewsDAO.reviews = await conn.db(process.envMOVIEREVIEWS_NS).collection('reviews');
        } catch (e) {
            console.error('unable to establish connection handle in reviewDao: ${e}');
        }
    }

    static async addReview(bookId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date,
                review,
                book_id: ReviewsDAO.ObjectId(bookId),
            };
            return await ReviewsDAO.reviews.insertOne(reviewDoc); 
        } catch (e) {
            console.error('unable to post review: ${e}');
            return { error: e };
        }
    }

    static async updateReview(reviewId,userId, review, date) {
        try {
            const updateResponse = await ReviewsDAO.reviews.updateOne(
                { user_id: userId, _id: ReviewsDAO.ObjectId(reviewId) },
                { $set: {review, date } },
            );
            return updateResponse;
        } catch (e) {
            console.error('unable to update review: ${e}');
            return { error: e };
        }
    }

    static async deleteReview(reivewId, userId) {
        try {
            const deleteResponse = await ReviewsDAO.reviews.deleteOne({
                _id: ReviewsDAO.ObjectId(reviewId),
                user_id: userId,
            });
            return deleteResponse;
        } catch (e) {
            console.error('unable to delete review: ${e}');
            return { error: e };
        }
    }

}