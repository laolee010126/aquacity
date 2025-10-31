-- Migration: Update existing programs to new curriculum structure
-- Date: 2025-10-31
-- Description: Reorganize programs according to the new curriculum hierarchy
-- Note: This migration is idempotent and can be run multiple times safely

-- Store parent IDs in variables for easier reference
DO $$
DECLARE
    sangup_id uuid;
    gogup_id uuid;
    gichoban_exists boolean;
    sangup1_exists boolean;
    sangup2_exists boolean;
    sangup3_exists boolean;
    gogup_exists boolean;
    yeonsu1_exists boolean;
    yeonsu2_exists boolean;
    master_exists boolean;
BEGIN
    -- 1. Update "초급 수영 교실" to "초급반"
    UPDATE programs
    SET
        title = '초급반',
        level = '초급',
        description = '자유형 반복연습, 배면뜨기, 배면발차기, 손발 연결동작을 배웁니다.',
        curriculum_content = '자유형 반복연습, 배면뜨기, 배면발차기, 손발 연결동작',
        duration = '1개월',
        display_order = 2,
        level_color = 'green'
    WHERE title = '초급 수영 교실';

    -- 2. Update "중급 수영 교실" to "중급반"
    UPDATE programs
    SET
        title = '중급반',
        level = '중급',
        description = '자유형 배영 반복연습, 평영발차기, 평영 팔 돌리기 연결동작을 배웁니다.',
        curriculum_content = '자유형 배영 반복연습, 평영발차기, 평영 팔 돌리기 연결동작',
        duration = '1개월',
        display_order = 3,
        level_color = 'yellow'
    WHERE title = '중급 수영 교실';

    -- 3. Update "고급 수영 교실" to "상급" (메인 프로그램)
    UPDATE programs
    SET
        title = '상급',
        level = '상급',
        description = '자유형, 배영, 평영 반복연습과 접영 기초를 배웁니다. 상급 1·2·3 단계로 세분화하여 체계적으로 학습합니다.',
        curriculum_content = '자유형, 배영, 평영 반복연습, 접영리듬연습, 발차기 팔돌리기',
        duration = '1개월',
        display_order = 4,
        level_color = 'red'
    WHERE title = '고급 수영 교실'
    RETURNING id INTO sangup_id;

    -- 4. Create "기초반" as first program (only if it doesn't exist)
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '기초반') INTO gichoban_exists;

    IF NOT gichoban_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, display_order, level_color)
        VALUES (
            '기초반',
            '기초',
            '수영장 이용안내 및 수칙안내, 호흡법, 자유형 발차기, 팔돌리기를 배웁니다.',
            '수영장 이용안내 및 수칙안내, 호흡법, 자유형 발차기, 팔돌리기',
            '1개월',
            1,
            'green'
        );
    END IF;

    -- 5. Create sub-programs under "상급" (only if they don't exist)
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '상급1' AND parent_id = sangup_id) INTO sangup1_exists;
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '상급2' AND parent_id = sangup_id) INTO sangup2_exists;
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '상급3' AND parent_id = sangup_id) INTO sangup3_exists;

    IF NOT sangup1_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, parent_id, display_order, level_color)
        VALUES (
            '상급1',
            '상급1',
            '자유형, 배영, 평영 반복연습과 접영 연결동작, 턴, 스타트를 연습합니다.',
            '자유형, 배영, 평영 반복연습, 접영연결동작, 턴, 스타트 연습',
            '1개월',
            sangup_id,
            41,
            'red'
        );
    END IF;

    IF NOT sangup2_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, parent_id, display_order, level_color)
        VALUES (
            '상급2',
            '상급2',
            '4가지 영법 반복연습과 자세교정, 오리발 착용 훈련을 진행합니다.',
            '자유형, 배영, 평영 반복연습, 4가지 영법 자세교정, 오리발 착용',
            '1개월',
            sangup_id,
            42,
            'red'
        );
    END IF;

    IF NOT sangup3_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, parent_id, display_order, level_color)
        VALUES (
            '상급3',
            '상급3',
            '4가지 영법 자세교정과 지구력 중점 훈련을 진행합니다. 1000m 이상 수영 가능자 대상입니다.',
            '4가지 영법 자세교정, 지구력 중점 훈련',
            '8개월 이상',
            sangup_id,
            43,
            'red'
        );
    END IF;

    -- 6. Create "고급" main program (only if it doesn't exist)
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '고급' AND parent_id IS NULL) INTO gogup_exists;

    IF NOT gogup_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, requirements, display_order, level_color)
        VALUES (
            '고급',
            '고급',
            '영법교정과 근지구력 훈련을 진행합니다. 연수 1·2 단계를 포함합니다. 1200m 이상 수영 가능자 대상입니다.',
            '영법교정, 근지구력 훈련법',
            '1년 이상',
            '1200m 가능자',
            5,
            'red'
        )
        RETURNING id INTO gogup_id;
    ELSE
        SELECT id INTO gogup_id FROM programs WHERE title = '고급' AND parent_id IS NULL LIMIT 1;
    END IF;

    -- 7. Create sub-programs under "고급" (only if they don't exist)
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '연수1' AND parent_id = gogup_id) INTO yeonsu1_exists;
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '연수2' AND parent_id = gogup_id) INTO yeonsu2_exists;

    IF NOT yeonsu1_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, requirements, parent_id, display_order, level_color)
        VALUES (
            '연수1',
            '연수1',
            '영법교정과 근지구력 훈련을 진행합니다. I.M 가능자 대상, 1500m 이상 수영 가능해야 합니다.',
            '영법교정, 근지구력 훈련법',
            '1년 이상',
            'I.M 가능자, 1500m 이상자',
            gogup_id,
            51,
            'red'
        );
    END IF;

    IF NOT yeonsu2_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, requirements, parent_id, display_order, level_color)
        VALUES (
            '연수2',
            '연수2',
            '영법교정 및 근지구력 반복연습을 진행합니다. 3년 이상 경력자 대상입니다.',
            '영법교정 및 근지구력 반복연습',
            '3년 이상',
            '3년 이상자',
            gogup_id,
            52,
            'red'
        );
    END IF;

    -- 8. Create "마스터" program (only if it doesn't exist)
    SELECT EXISTS(SELECT 1 FROM programs WHERE title = '마스터') INTO master_exists;

    IF NOT master_exists THEN
        INSERT INTO programs (title, level, description, curriculum_content, duration, requirements, display_order, level_color)
        VALUES (
            '마스터',
            '마스터',
            '준선수반으로 대회 출전이나 수영 동호회 수준의 고급 훈련을 진행합니다.',
            '준선수반 대회출전이나 수영 동호회 수준',
            '5년 이상',
            '5년 이상자',
            6,
            'red'
        );
    END IF;

    -- 9. Delete special programs (not needed)
    DELETE FROM programs WHERE title IN ('아쿠아로빅', '어린이 수영교실', '개인 레슨');

END $$;
