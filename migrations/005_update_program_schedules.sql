-- Update program schedules based on 25년 11월 강습시간표 확정안
-- This migration updates the schedule field for each program level

DO $$
DECLARE
    gichoban_id uuid;
    chogeup_id uuid;
    junggeup_id uuid;
    sanggeup_id uuid;
    gogeup_id uuid;
    master_id uuid;
BEGIN
    -- Get program IDs
    SELECT id INTO gichoban_id FROM programs WHERE title = '기초반' AND parent_id IS NULL LIMIT 1;
    SELECT id INTO chogeup_id FROM programs WHERE title = '초급반' AND parent_id IS NULL LIMIT 1;
    SELECT id INTO junggeup_id FROM programs WHERE title = '중급반' AND parent_id IS NULL LIMIT 1;
    SELECT id INTO sanggeup_id FROM programs WHERE title = '상급' AND parent_id IS NULL LIMIT 1;
    SELECT id INTO gogeup_id FROM programs WHERE title = '고급' AND parent_id IS NULL LIMIT 1;
    SELECT id INTO master_id FROM programs WHERE title = '마스터' AND parent_id IS NULL LIMIT 1;

    -- Update 기초반
    IF gichoban_id IS NOT NULL THEN
        UPDATE programs
        SET schedule = ARRAY['월/수/금 07:00-07:50', '화/목 09:00-09:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE id = gichoban_id;
        RAISE NOTICE '기초반 schedule updated';
    END IF;

    -- Update 초급반
    IF chogeup_id IS NOT NULL THEN
        UPDATE programs
        SET schedule = ARRAY['월/수/금 06:00-06:50', '월/수/금 18:00-18:50', '화/목 19:00-19:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE id = chogeup_id;
        RAISE NOTICE '초급반 schedule updated';
    END IF;

    -- Update 중급반
    IF junggeup_id IS NOT NULL THEN
        UPDATE programs
        SET schedule = ARRAY['월/수/금 18:00-18:50', '월/수/금 20:00-20:50', '화/목 10:00-10:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE id = junggeup_id;
        RAISE NOTICE '중급반 schedule updated';
    END IF;

    -- Update 상급 (parent and children)
    IF sanggeup_id IS NOT NULL THEN
        -- Parent 상급
        UPDATE programs
        SET schedule = ARRAY['월/수/금 07:00-07:50', '월/수/금 20:00-20:50', '화 07:00-07:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE id = sanggeup_id;
        RAISE NOTICE '상급 schedule updated';

        -- Child programs (상급1, 상급2, 상급3)
        UPDATE programs
        SET schedule = ARRAY['월/수/금 20:00-20:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE parent_id = sanggeup_id;
        RAISE NOTICE '상급 sub-levels schedule updated';
    END IF;

    -- Update 고급 (parent and children - 연수1, 연수2)
    IF gogeup_id IS NOT NULL THEN
        -- Parent 고급
        UPDATE programs
        SET schedule = ARRAY['월/수/금 20:00-20:50', '화/금 08:00-08:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE id = gogeup_id;
        RAISE NOTICE '고급 schedule updated';

        -- Child programs (연수1, 연수2)
        UPDATE programs
        SET schedule = ARRAY['월/수/금 20:00-20:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE parent_id = gogeup_id;
        RAISE NOTICE '고급 sub-levels schedule updated';
    END IF;

    -- Update 마스터
    IF master_id IS NOT NULL THEN
        UPDATE programs
        SET schedule = ARRAY['월/수/금 20:00-20:50'],
            instructor_name = '',
            updated_at = NOW()
        WHERE id = master_id;
        RAISE NOTICE '마스터 schedule updated';
    END IF;

    RAISE NOTICE 'All program schedules have been updated successfully';
END $$;
