-- Adapted from trusted backend/analytics/tools/review_tools.py:get_average_comment_length
SELECT ROUND(AVG(comment_length), 2) AS average_comment_length
    FROM proofsql_full.fact_reviews;
