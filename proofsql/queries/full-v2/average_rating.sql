-- Adapted from trusted backend/analytics/tools/review_tools.py:get_average_rating
SELECT ROUND(AVG(review_score), 2) AS average_rating
    FROM proofsql_full.fact_reviews;
