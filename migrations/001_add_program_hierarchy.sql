-- Migration: Add hierarchical structure fields to programs table
-- Date: 2025-10-31
-- Description: Add support for parent-child relationships in programs

-- Add new columns to programs table
ALTER TABLE programs
ADD COLUMN parent_id uuid REFERENCES programs(id) ON DELETE CASCADE,
ADD COLUMN curriculum_content text,
ADD COLUMN requirements text,
ADD COLUMN display_order integer DEFAULT 0;

-- Create indexes for better query performance
CREATE INDEX idx_programs_parent_id ON programs(parent_id);
CREATE INDEX idx_programs_display_order ON programs(display_order);

-- Add comment to explain the structure
COMMENT ON COLUMN programs.parent_id IS 'References parent program for hierarchical structure (e.g., 상급1,2,3 under 상급)';
COMMENT ON COLUMN programs.curriculum_content IS 'Teaching content description (e.g., 호흡법, 자유형 발차기)';
COMMENT ON COLUMN programs.requirements IS 'Requirements for taking this program (e.g., 1000m 이상자)';
COMMENT ON COLUMN programs.display_order IS 'Order for displaying programs';
