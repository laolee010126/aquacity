-- Migration: Clean up duplicate program entries
-- Date: 2025-10-31
-- Description: Remove duplicate programs created by multiple migration runs

DO $$
DECLARE
    keep_sangup_id uuid := 'b00f5847-8b8f-45d6-aab7-737e8fddff5f'; -- 상급 ID that has children
    keep_gogup_id uuid; -- 고급 ID to keep
BEGIN
    -- Step 1: Identify and keep one 고급 record (the one with most children)
    SELECT id INTO keep_gogup_id
    FROM programs
    WHERE title = '고급' AND parent_id IS NULL
    ORDER BY created_at DESC
    LIMIT 1;

    -- Step 2: Update 연수1,2 records to point to the correct 고급 parent
    UPDATE programs
    SET parent_id = keep_gogup_id
    WHERE title IN ('연수1', '연수2')
    AND parent_id != keep_gogup_id;

    -- Step 3: Delete duplicate 기초반 (keep only the first one created)
    DELETE FROM programs
    WHERE title = '기초반'
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '기초반'
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Step 4: Delete duplicate 고급 (keep the one we identified)
    DELETE FROM programs
    WHERE title = '고급'
    AND id != keep_gogup_id;

    -- Step 5: Delete duplicate 마스터
    DELETE FROM programs
    WHERE title = '마스터'
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '마스터'
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Step 6: Delete 상급1,2,3 records without proper parent_id
    DELETE FROM programs
    WHERE title IN ('상급1', '상급2', '상급3')
    AND (parent_id IS NULL OR parent_id != keep_sangup_id);

    -- Step 7: Ensure only one instance of each sub-level exists
    -- Delete duplicate 상급1
    DELETE FROM programs
    WHERE title = '상급1'
    AND parent_id = keep_sangup_id
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '상급1' AND parent_id = keep_sangup_id
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Delete duplicate 상급2
    DELETE FROM programs
    WHERE title = '상급2'
    AND parent_id = keep_sangup_id
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '상급2' AND parent_id = keep_sangup_id
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Delete duplicate 상급3
    DELETE FROM programs
    WHERE title = '상급3'
    AND parent_id = keep_sangup_id
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '상급3' AND parent_id = keep_sangup_id
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Delete duplicate 연수1
    DELETE FROM programs
    WHERE title = '연수1'
    AND parent_id = keep_gogup_id
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '연수1' AND parent_id = keep_gogup_id
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Delete duplicate 연수2
    DELETE FROM programs
    WHERE title = '연수2'
    AND parent_id = keep_gogup_id
    AND id NOT IN (
        SELECT id
        FROM programs
        WHERE title = '연수2' AND parent_id = keep_gogup_id
        ORDER BY created_at ASC
        LIMIT 1
    );

    -- Step 8: Verify the cleanup
    RAISE NOTICE 'Cleanup completed. Remaining programs: %', (SELECT COUNT(*) FROM programs);

END $$;

-- Final verification query
SELECT title, level, parent_id, display_order, COUNT(*) as count
FROM programs
GROUP BY title, level, parent_id, display_order
HAVING COUNT(*) > 1
ORDER BY title;
