-- Adapted from trusted backend/analytics/tools/review_tools.py:get_rating_distribution
SELECT
        review_score,
        COUNT(*) AS review_count
    FROM proofsql_full.fact_reviews
    GROUP BY
        review_score
    ORDER BY
        review_score ASC;
