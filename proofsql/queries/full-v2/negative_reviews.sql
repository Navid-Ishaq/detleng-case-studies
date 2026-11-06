-- Adapted from trusted backend/analytics/tools/review_tools.py:get_negative_reviews
SELECT COUNT(*) AS negative_reviews
    FROM proofsql_full.fact_reviews
    WHERE review_score <= 2;
