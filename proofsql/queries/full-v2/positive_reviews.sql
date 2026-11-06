-- Adapted from trusted backend/analytics/tools/review_tools.py:get_positive_reviews
SELECT COUNT(*) AS positive_reviews
    FROM proofsql_full.fact_reviews
    WHERE review_score >= 4;
