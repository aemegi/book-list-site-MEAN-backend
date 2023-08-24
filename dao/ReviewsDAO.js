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
}