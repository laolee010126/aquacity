-- Migration: Setup Storage RLS Policies for Image Uploads
-- Date: 2025-10-31
-- Description: Configure Row Level Security policies for the aqua-image storage bucket

-- ============================================================
-- IMPORTANT: Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- Policy 1: Allow anyone to upload images to aqua-image bucket
-- This is suitable for development. For production, consider restricting to authenticated users.
CREATE POLICY "Anyone can upload images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'aqua-image');

-- Policy 2: Allow anyone to view/download images from aqua-image bucket
CREATE POLICY "Anyone can view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'aqua-image');

-- Policy 3: Allow anyone to update images (optional)
CREATE POLICY "Anyone can update images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'aqua-image')
WITH CHECK (bucket_id = 'aqua-image');

-- Policy 4: Allow anyone to delete images (optional - be careful with this)
CREATE POLICY "Anyone can delete images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'aqua-image');

-- ============================================================
-- PRODUCTION ALTERNATIVE (Authenticated users only)
-- Comment out the above policies and use these instead:
-- ============================================================

/*
-- Only authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'aqua-image'
  AND auth.role() = 'authenticated'
);

-- Public can still view
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'aqua-image');

-- Only authenticated users can update their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'aqua-image'
  AND auth.role() = 'authenticated'
)
WITH CHECK (bucket_id = 'aqua-image');

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'aqua-image'
  AND auth.role() = 'authenticated'
);
*/

-- Verification query - Check if policies were created successfully
SELECT
  policyname,
  cmd as operation,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
ORDER BY policyname;
