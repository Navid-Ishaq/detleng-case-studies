-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_review_summary
SELECT
        COUNT(DISTINCT review_id) AS total_reviews,
        ROUND(AVG(review_score), 2) AS average_rating,
        SUM(CASE WHEN review_score >= 4 THEN 1 ELSE 0 END) AS positive_reviews,
        SUM(CASE WHEN review_score <= 2 THEN 1 ELSE 0 END) AS negative_reviews,
        ROUND(AVG(comment_length), 2) AS average_comment_length
    FROM proofsql_full.fact_reviews;
